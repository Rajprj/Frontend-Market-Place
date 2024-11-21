import { User } from "../models/user.model.js";
import { Post } from "../models/post.model.js";
import { asyncHandler } from "../utils/asyncHendler.js";
import { apiError } from "../utils/apiError.js";
import { uploadOnCloudinary } from "../utils/coludinary.js";
import path from 'path';
import fs from 'fs';
import { Comment } from "../models/comments.model.js";
import { Otp } from "../models/otp.model.js";
import { sendMail } from "../config/sendMail.js";
import session from "express-session";
import { Contact } from "../models/contact.model.js";



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
    if ([userName, fullName, email, password, role].some((fields) => fields?.trim() === "")) {
        return res.render("register", { errorMessage: "All fields are required!"});
    }

    // check if user already exists
    const existedUser = await User.findOne({
        $or: [{ userName }, { email }]
    });

    if (existedUser) {
        return res.render("register", { errorMessage: "User already exists!" });
    }

    // check user role
    if(role !== "developer" && role !== "viewer" ){
        return res.render("register", { errorMessage: "Sorry you'r giving another role!" });
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
          errorMessage: "Username & Password are incorrect",
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

  //check user is admin or not
  if(findUser.role === "admin"){
    return res.redirect("/admin");
  }
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
            req.session.errorMessage = "Something went wrong while uploading Dp";
            return res.redirect("/profile");
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
        console.log(error);
        req.session.errorMessage = "Something went wrong while uploading Dp";
        return res.redirect("/profile");
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
        req.session.successMsg = "Dp remove successfully";
        return res.redirect("/profile");
        
    } catch (error) {
        console.error("Error removing DP:", error); 
        return res.status(500).send("Something went wrong while removing the display picture.");
    }
});

//For Add post
const addUserPost = asyncHandler(async (req, res) => {
    const { postName } = req.body;

    // Check all fields 
    if (!postName || !req.files || !req.files.thumbnailUpload || !req.files.codeUpload || !req.files.sliderImages) {
        req.session.errorMessage = "All fields are required!";
        return res.redirect("/profile");
    }

    // Limit 4 images for slider
    if (req.files.sliderImages.length > 4) {
        req.session.errorMessage = "You can only upload maximum 4 sub images!";
        return res.redirect("/profile");
    }

    // Upload the thumbnail image to Cloudinary
    const thumbnailLocalPath = req.files.thumbnailUpload[0].path;
    const thumbnailImg = await uploadOnCloudinary(thumbnailLocalPath);
    if (!thumbnailImg) {
        req.session.errorMessage = "Something went wrong while uploading thumbnail image!";
        return res.redirect("/profile");
    }

    // Upload slider images to Cloudinary
    const sliderImageUrls = [];
    for (const file of req.files.sliderImages) {
        const imageUrl = await uploadOnCloudinary(file.path);
        if (imageUrl) {
            sliderImageUrls.push({ url: imageUrl.url });  
        } else {
            req.session.errorMessage = "Something went wrong while uploading sub images!";
        return res.redirect("/profile");
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
        postName: postName,
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
    else{
        const postUser = await User.findById(findUser._id);
        // postUser.posts.splice(postUser.posts.indexOf(findPost._id),1);
        postUser.posts = postUser.posts.filter(
            (postId) => !postId.equals(findPost._id)
        );
      
        await Post.deleteOne(findPost._id);
        await postUser.save({validateBeforeSave:true});
    
        req.session.successMsg = "Post successfully delete"
        res.redirect("/profile");
    }
})
 
//For see detail post 
const detailedPost = asyncHandler(async (req, res) => {
    try {
        // console.log("detailed");
        
      const postId = req.params.id;
      const post = await Post.findById(postId).populate('user');
   
    const postComment = await Promise.all(
        post.comment.map(async (commentid) => {
            return await Comment.findById(commentid).populate('user'); 
        })
    );
    
      
      
      res.json({
        postUserId: post.user._id,
        postName: post.postName,
        thumbnail: post.thumbnail,
        userProfilePic: post.user.dp,
        userName: post.user.userName,
        image: post.images,
        likes: post.like,
        followers: post.user.followers,
        following: post.user.followings,
        // comments: post.comment
        postComment: postComment,
        postCommentCount: post.comment.length
      });

      
    } catch (err) {
        req.session.errorMessage = "Something went wrong while fetching details of post!";
        return res.redirect("/profile");
    }
});

//For like post
const likePost = asyncHandler(async (req, res)=>{
    // console.log("liked");
    
    const findUser = await User.findById(req.user._id);
    if(!findUser){
        return res.json({status:false, errMsg:"you are not loggedIN"})
    }
    const post = await Post.findById(req.params.id);

    let liked = false;
    // if post already liked
    if(post.like.indexOf(findUser._id) === -1){
        post.like.push(findUser._id)
        findUser.ownLike.push(post._id)
        liked = true;
    }
    else{
        post.like.splice(post.like.indexOf(findUser._id), 1);
        findUser.ownLike.splice(findUser.ownLike.indexOf(post._id),1)
    }
    await post.save({validateBeforeSave:true})
    await findUser.save({validateBeforeSave:true})

    let countlike = 0;
    post.like.forEach(like=>{
        countlike++
    })

    res.json({countlike, liked})
    
})

//For update the profile
const updateProfile = asyncHandler(async (req, res)=>{
   
        const {userName, fullName, email, role} = req.body;
        const findUser = await User.findById(req.user._id)
        // check if fields are empty
        const updateFields = {};
        if(userName) {
            const existedUser = await User.findOne({
                userName,
                _id: { $ne: req.user._id } 
            })
            if(existedUser){
                req.session.errorMessage = "Username is already exist!";
                return res.redirect("/profile");
            }
            else{
                updateFields.userName = userName
            }
        }
        if(fullName) updateFields.fullName = fullName
        if(email){
            const existedUser = await User.findOne({
                email,
                _id: { $ne: req.user._id } 
            })
            if(existedUser){
                req.session.errorMessage = "Email is already exist!";
                return res.redirect("/profile");
            } else{
                updateFields.email = email
            }
            }
        if(role) {

            if(role == "viewer"){
                if(role !== 'viewer' && role !== 'developer'){
                    req.session.errorMessage = "Sorry you'r giving another role!";
                    return res.redirect("/profile");
                }
                else if(findUser.posts.length >0){
                    req.session.errorMessage = "First delete your post";
                    return res.redirect("/profile");
                }
            }
            updateFields.role = role
        }
        // console.log(updateFields);
        
    await User.updateOne({ _id: findUser._id}, { $set: updateFields })
    .then(result => {
        res.redirect("/profile")
    })
    .catch(error => {
        req.session.errorMessage = "Something went wrong while updating the user"
        res.redirect("/profile")
    });
    
})

//For change role
const changeRole = asyncHandler(async (req, res)=>{
    try {
        const { role} = req.body;
        // check if fields are empty
        if (!role) {
            req.session.errorMessage = "Role filed is required!";
            return res.redirect("/profile");
        }
        if(role !== 'viewer' && role !== 'developer'){
            req.session.errorMessage = "Sorry you'r giving another role!";
            return res.redirect("/profile");
        }
        await User.findByIdAndUpdate(
            req.user._id,
            {
                $set:{
                    role
                }
            }
            ,
            {
                new:true
            }
        );
        return res.redirect("/profile");
    } catch (error) {
        req.session.errorMessage = "Something went wrong while changing the role!";
        return res.redirect("/profile");
    }
})

//For following developer
const followingUser = asyncHandler(async (req,res)=>{
    const followingUser = await User.findById(req.user._id)
    if(!followingUser){
        return res.json({status: false})
    }
    const followedUser = await User.findById(req.params.id)
    if(!followedUser){
        return res.json({status: false, errMsg: "Not found followedUser"})
    }
    let following = false;

    if(followedUser.followers.indexOf(followingUser._id) === -1){
        followedUser.followers.push(followingUser._id);
        followingUser.followings.push(followedUser._id)
        console.log("following");
           
        following = true;
    }
    else{

        followedUser.followers = followedUser.followers.filter(
            (followerId) => !followerId.equals(followingUser._id)
        );
        followingUser.followings = followingUser.followings.filter(
            (followingId) => !followingId.equals(followedUser._id)
        );
        
        console.log(followedUser._id);    
        console.log("unfollow");
        
    }
    followedUser.save({validateBeforeSave:true})
    followingUser.save({validateBeforeSave:true})

    res.json({ following });
})

//for following list
const followingList = asyncHandler(async (req,res)=>{
    try {
        const user = await User.findById(req.user._id);
        console.log(user.followings);
        
        const followingDetails = await Promise.all(
            user.followings.map(async (followingId) => {
                return await User.findById(followingId); // Individual request for each following ID
            })
        );
        
        if(!followingDetails){

            return res.json({status : false, errMsg : "server erro while fetching your following list"})
        }
        else{
            return res.json({status: true, followingDetails})
        }
    } catch (error) {
        return res.json({status : false, errMsg : "server erro while fetching your following list"})
    }
    
})

//for following list
const followersList = asyncHandler(async (req,res)=>{
    try {
        const user = await User.findById(req.user._id);
        // console.log(user.followings);
        
        const followersDetails = await Promise.all(
            user.followers.map(async (followersId) => {
                return await User.findById(followersId); 
            })
        );
        
        if(!followersDetails){

            return res.json({status : false, errMsg : "server erro while fetching your followers list"})
        }
        else{
            return res.json({status: true, followersDetails})
        }
    } catch (error) {
        return res.json({status : false, errMsg : "server erro while fetching your followers list"})
    }
    
}) 
// for post zip file download
const downloadPost = async (req, res) => {
    try {
        const { id: postId } = req.params;

        // Fetch post from database
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ errMsg: 'Post not found' });
        }

        // Log the postCode for debugging
        // console.log("Post code:", post.postCode);

        
        // Remove leading '/public' from postCode if present
        const relativePath = post.postCode.startsWith('/public')
            ? post.postCode.replace('/public', '')
            : post.postCode;

        // Construct file path
        const filePath = path.join(process.cwd(), 'public', relativePath);
        console.log("Resolved file path:", filePath);

        // Check if the file exists
        if (!fs.existsSync(filePath)) {
            console.error("File not found at:", filePath);
            return res.status(404).json({ errMsg: 'File not found' });
        }

        // Serve the file for download
        return res.download(filePath, (err) => {
            if (err) {
                console.error("Error serving file:", err);
                return res.status(500).json({ errMsg: 'Error downloading file' });
            }
        });
    } catch (error) {
        console.error("Error in downloadPost:", error);
        return res.status(500).json({ errMsg: 'Internal server error' });
    }
};

//For user comments on posts
const addComment = asyncHandler(async (req, res) => {
    const whoComment = req.user; 
    const postId = req.params.id;
    const commentText = req.body.comment;

    if (!commentText) {
        return res.status(400).json({ status: false, errMsg: "Comment is required!" });
    }

    const whichPost = await Post.findById(postId);
    if (!whichPost) {
        return res.status(404).json({ status: false, errMsg: "Post not found!" });
    }

    // Create the comment
    const commentOnPost = await Comment.create({
        commentText: commentText,
        user: whoComment._id,
        post: whichPost._id,
    });

    
    const updateUserAndPost = await Promise.all([
        User.findByIdAndUpdate(
            whoComment._id,
            { $push: { comment: commentOnPost._id } },
            { new: true, runValidators: true }
        ),
        Post.findByIdAndUpdate(
            whichPost._id,
            { $push: { comment: commentOnPost._id } },
            { new: true, runValidators: true }
        ),
    ]);

    if (!updateUserAndPost[0] || !updateUserAndPost[1]) {
        return res.status(500).json({ status: false, errMsg: "Error updating user or post!" });
    }

    return res.status(201).json({
        status: true,
        message: "Comment added successfully!",
        comment: commentOnPost,
    });
});

//For user Delete comment
const deleteComments = asyncHandler(async (req,res)=>{
    
    const comment = await Comment.findById(req.params.id).populate("user", "post");
    if (!comment) {
        return res.json({ status: false, errMsg: "Comment not found" });
    }
    
    const user = req.user._id;
    const post = comment.post._id;
    if (!user || !post) {
        return res.json({ status: false, errMsg: "User or post not found" });
    }
    
    const findUser = await User.findById(user);
    findUser.comment = findUser.comment.filter(id => id.toString() !== comment._id.toString());
    
    const findPost = await Post.findById(post);
    findPost.comment = findPost.comment.filter(id => id.toString() !== comment._id.toString());
    
    await Comment.deleteOne({ _id: comment._id });
    
    await findUser.save({ validateBeforeSave: true });
    await findPost.save({ validateBeforeSave: true });
    
    return res.json({ status: true });
    
    
})

//For user password forget
const otp = asyncHandler(async (req,res)=>{
    let userName = req.body.userName;
    if(!userName){
        return res.render('forgetPassword', {
            userName: "", // Initially, email is null
            success: null, // Proceed to password change
            errorMessage : "UserName is required!"
          });
    }
    const user = await User.findOne({userName: userName})
    if(!user){
        return res.render('forgetPassword', {
            userName: "", 
            success: null, // Proceed to password change
            errorMessage : "UserName is not found!"
          });  
    }
    let emailid= user.email;
    console.log(emailid)
    async function generateOtp(email) {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const data = `<p>Your OTP for frontendmarketplace password reset is <b>${otp}</b>. It expires in 1 minute. Do not share it with anyone. [frontendmarketplace Team]"</p>`
      // Remove any existing OTP for the email
      await Otp.deleteMany({ userName });
    
      // Create a new OTP entry
      await Otp.create({ userName, otp });
    
      sendMail(email,data)
      console.log(`OTP for ${email}: ${otp}`);
      res.render('forgetPassword', {
        userName: user.userName,
        success: true,    
      });
    }    
    generateOtp(emailid)

  })
const verify = asyncHandler(async (req,res,next)=>{
    try {
      let {userName,otp}=req.body;
    // console.log(otp)
    // console.log(userName)

    async function verifyOtp(username, inputOtp) {
      const otpRecord = await Otp.findOne({ userName:username, otp: inputOtp });
    
      if (otpRecord) {
        console.log('OTP verified');
        // Remove the OTP document after verification
        await Otp.deleteOne({ _id: otpRecord._id });
        res.render('forgetPassword', {
            userName: userName,
            success: "verify", 
          });
      }
    else{
      console.log('Invalid or expired OTP');
    return  res.render('forgetPassword', {
        userName: userName, // Initially, email is null
        success: true, // Proceed to password change
        errorMessage : "Invalid or expired OTP"
      });
    }
    }
    verifyOtp(userName,otp);
    } catch (error) {
        return  res.render('forgetPassword', {
            userName: "", // Initially, email is null
            success: null, // Proceed to password change
            errorMessage : "something went wronge!"
          });
    }
    
  })
const forgotPassword =asyncHandler(async (req,res)=>{
    let {userName,password}=req.body;
  console.log(userName,password)
    if(!userName ||!password){
        res.render('forgetPassword', {
            userName:" ",
            success: null, // Redirect to home
            pass: "",
            errorMessage : "UserName or password is required!"
          });
    }
    else{
  
    User.findOne({ userName })
    .then(async (user) => {
        if (!user) {
            return res.json({
                success: false,
                message: "Username is incorrect. Please try again.",
            });
        }

        user.password = password; 
        await user.save(); 

        res.redirect("/login");
    })
    .catch((err) => console.error(err));


    }
  })


//For user contact
const contact = asyncHandler(async (req,res)=>{
    const {email,message} = req.body;
    if(!email && !message){
        return res.render("contact", {errorMessage : "Email & Message are required!"})
    }
    const contactUser = await Contact.create({
        email: email,
        message
    })
    console.log(contactUser);
    if(!contactUser){
        return res.render("contact", {errorMessage : "Something went wrong while contact!"})
    }
    res.render("contact")
})
export {
    registerUser,
    loginUser,
    logOutUser,
    uploadDp,
    removeDp,
    addUserPost,
    deletePost,
    detailedPost,
    likePost,
    updateProfile,
    changeRole,
    followingUser,
    followingList,
    followersList,
    addComment,
    deleteComments,
    downloadPost,
    otp,
    verify,
    forgotPassword,
    contact
}