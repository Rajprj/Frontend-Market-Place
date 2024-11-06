import { User } from "../models/user.model.js";
import { Post } from "../models/post.model.js";
import { asyncHandler } from "../utils/asyncHendler.js";
import { apiError } from "../utils/apiError.js";
import { uploadOnCloudinary } from "../utils/coludinary.js";
import path from 'path';
import fs from 'fs';


//generate referash and access token for authentication
const generateRefreshAccessToken = async function (userId) {
    try {
      const user = await User.findById(userId);
      const refreshToken = user.generateRefreshToken();
      const accessToken = user.generateAccessToken();
  
      user.refreshToken = refreshToken;
      await user.save({ validateBeforeSave: true });
  
      return { accessToken, refreshToken };
    } catch (error) {
      throw new apiError(
        500,
        "Somthing went wrong while generating rfresh or access Token"
      );
    }
};

//For registration
  const registerUser = asyncHandler(async (req, res) => {
    const { userName, fullName, email, password, role} = req.body;

    // check if fields are empty
    if ([userName, fullName, email, password].some((fields) => fields?.trim() === "")) {
        return res.render("register", { errorMessage: "All fields are required!"});
    }

    // check if user already exists
    const existedUser = await User.findOne({
        $or: [{ userName }, { email }]
    });

    if (existedUser) {
        return res.render("register", { errorMessage: "User already exists!" });
    }

    // create user
    const user = await User.create({
        userName: userName.toLowerCase(),
        fullName,
        email,
        password,
        role
    });

    if (!user) {
        return res.render("register", { errorMessage: "Something went wrong during registration.", formData: req.body });
    }

    res.redirect("/login");
});

//For login
const loginUser = asyncHandler(async (req, res) => {
  const { userName, password } = req.body;

  // Check if fields are empty
  if (!userName?.trim() || !password?.trim()) {
      return res.status(400).render("login", {
          errorMessage: "Fields cannot be empty",
      });
  }

  // Find user by username
  const findUser = await User.findOne({ $or: [{ userName }] });

  if (!findUser) {
      return res.status(404).render("login", {
          errorMessage: "User not found",
      });
  }

  // Check if password is correct
  const isPassCorrect = await findUser.isPasswordCorrect(password);

  if (!isPassCorrect) {
      return res.status(400).render("login", {
          errorMessage: "Password incorrect",
      });
  }

  // Generate tokens
  const { accessToken, refreshToken } = await generateRefreshAccessToken(findUser._id);

  if (!accessToken || !refreshToken) {
      return res.status(500).render("login", {
          errorMessage: "Something went wrong, tokens are undefined",
      });
  }

  // Send tokens via cookies
  const options = {
      secure: true,
      httpOnly: true,
  };

  res.cookie("accessToken", accessToken, options).cookie("refreshToken", refreshToken, options);

  // Redirect to profile page on success
  return res.redirect("/profile");
});

//For logout
const logOutUser = asyncHandler(async (req,res)=>{
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {refreshToken: undefined},
        },
        {
            new:true
        }
    )

    const options = {
        secure:true,
        httpOnly:true
    }

    res.clearCookie("accessToken", options).clearCookie("refreshToken", options)

    return res.redirect("/login")
})

//For uploadDp
const uploadDp = asyncHandler(async (req, res) => {
    try {
        let dpLocalPath = req.file?.path;
        // console.log("File path:", dpLocalPath);

        const DpImg = await uploadOnCloudinary(dpLocalPath);
        if (!DpImg) {
           throw new apiError(402,"Something went wrong while uploading a dp")
        }

        await User.findByIdAndUpdate(
            req.user._id,
            {
                $set: { dp: DpImg.url }
            },
            {
                new: true
            }
        );

        return res.redirect("/profile");
    } catch (error) {
        throw new apiError(400,"something went wrong!")
    }
});

//For removeDp
const removeDp = asyncHandler(async (req, res) => {
    try {
        await User.findByIdAndUpdate(
            req.user._id,
            { $set: { dp: "" } },
            { new: true }
        );
        // Optionally set a flash message or just redirect
        // alert("successfully removed dp")
        return res.redirect("/profile");
    } catch (error) {
        console.error("Error removing DP:", error); // Log the error for debugging
        return res.status(500).send("Something went wrong while removing the display picture.");
    }
});

//For Add post
const addUserPost = asyncHandler(async (req, res) => {
    const { postName } = req.body;

    // Check all fields 
    if (!postName || !req.files || !req.files.thumbnailUpload || !req.files.codeUpload || !req.files.sliderImages) {
        return res.status(400).json({ message: 'All fields (thumbnail, post code, and slider images) are required.' });
    }

    // Limit 4 images for slider
    if (req.files.sliderImages.length > 4) {
        return res.status(400).json({ message: 'You can only upload a maximum of 4 images.' });
    }

    // Upload the thumbnail image to Cloudinary
    const thumbnailLocalPath = req.files.thumbnailUpload[0].path;
    const thumbnailImg = await uploadOnCloudinary(thumbnailLocalPath);
    if (!thumbnailImg) {
        throw new apiError(402, "Error uploading thumbnail image");
    }

    // Upload slider images to Cloudinary
    const sliderImageUrls = [];
    for (const file of req.files.sliderImages) {
        const imageUrl = await uploadOnCloudinary(file.path);
        if (imageUrl) {
            sliderImageUrls.push({ url: imageUrl.url });  
        } else {
            throw new apiError(402, "Error uploading the slider images");
        }
    }

    // Move the user zip file in codeFile folder
    const codeFile = req.files.codeUpload[0];
    const codeFilesDir = path.join(process.cwd(), 'public', 'codeFiles');
    if (!fs.existsSync(codeFilesDir)) fs.mkdirSync(codeFilesDir, { recursive: true });
    const codeFilePath = path.join(codeFilesDir, codeFile.originalname);
    fs.renameSync(codeFile.path, codeFilePath);

    const findUser = req.user._id;
    const newPost = await Post.create({
        postName: postName.toLowerCase(),
        postCode: `/public/codeFiles/${codeFile.originalname}`, 
        thumbnail: thumbnailImg.url,
        images: sliderImageUrls,
        user: findUser._id, 
    });

    const createdPostUser = await User.findById(findUser._id);
    createdPostUser.posts.push(newPost._id);
    await createdPostUser.save({validateBeforeSave:true});

    res.redirect("/profile");
});

//For Delete post
const deletePost = asyncHandler(async (req, res)=>{
    const findUser = req.user._id;
    const findPost = await Post.findById(req.params.id);
    if(!findPost){
        throw new apiError(402, "post not found");
    }

    const postUser = await User.findById(findUser._id);
    postUser.posts.splice(postUser.posts.indexOf(findPost._id),1);

    await Post.deleteOne(findPost._id);
    await postUser.save({validateBeforeSave:true});

    res.redirect("/profile");
})

export {
    registerUser,
    loginUser,
    logOutUser,
    uploadDp,
    removeDp,
    addUserPost,
    deletePost
}