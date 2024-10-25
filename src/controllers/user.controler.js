import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHendler.js";
import { apiError } from "../utils/apiError.js";
import { uploadOnCloudinary } from "../utils/coludinary.js";

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

  const registerUser = asyncHandler(async (req, res) => {
    const { userName, fullName, email, password } = req.body;

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
        password
    });

    if (!user) {
        return res.render("register", { errorMessage: "Something went wrong during registration.", formData: req.body });
    }

    res.redirect("/login");
});


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

const uploadDp = asyncHandler(async (req, res) => {
    try {
        let dpLocalPath = req.file?.path;
        console.log("File path:", dpLocalPath);

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






export {
    registerUser,
    loginUser,
    logOutUser,
    uploadDp,
    removeDp
}