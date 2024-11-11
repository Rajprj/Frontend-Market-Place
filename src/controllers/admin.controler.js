import { User } from "../models/user.model.js";
import { Post } from "../models/post.model.js";
import { asyncHandler } from "../utils/asyncHendler.js";
import nodemailer from "nodemailer";
import Mailgen from "mailgen";


// For add new Admin
const addAdmin = asyncHandler(async (req,res)=>{
    const{userName, email, fullName, password} = req.body;

    //check all fields are filled 
    if([userName, email, fullName, password].some((fields)=>fields?.trim() === "")){
        req.session.errorMessage = "All fields are required!"
        return res.redirect("/admin");
    }

    //check if admin already exist
    const existedAdmin = await User.findOne({
        $or : [{userName}, {email}],
    })
    if(existedAdmin){
        // throw new apiError(404," already exist")
        req.session.errorMessage = "Admin already exists";
        return res.redirect("/admin");
        
    }

    // create admin
    const user = await User.create({
        userName: userName.toLowerCase(),
        fullName,
        email,
        password,
        role : "admin"
    });

    if (!user) {
        req.session.errorMessage = "Something went wrong while adding new admin!"
        return res.redirect("/admin")
    }

    res.redirect("/admin");
})

//For edit Admin profile details
const editProfile = asyncHandler(async (req,res)=>{
    try {
        const{userName, email, fullName} = req.body;
        if([userName, email, fullName].some((fields)=> fields?.trim() === "")){
            req.session.errorMessage = "Pleace fill the All fields"
            return res.redirect("/admin")
        }
    
        const existAdmin = await User.findOne({
            $or:[{userName},{email}],
            _id: { $ne: req.user._id } 
        })
        if(existAdmin){
            req.session.errorMessage = "Admin already exist!"
            return res.redirect("/admin")
        }
        
        
        
        await User.findByIdAndUpdate(
            req.user._id,
            {
                $set: {
                    userName: userName.toLowerCase(),
                    email,
                    fullName
                },
            },
            { new: true }
        );
    
        res.redirect("/admin");
    } catch (error) {
        req.session.errorMessage = "Server error while updating the profile, Please wait!"
        return redirect("/admin")
    }
})

//For edit user profile details
const editUserProfile = asyncHandler(async (req,res)=>{
    try {
        const {userId,userName, fullName, email, role} = req.body;
    
        const findUser = await User.findById(userId);
        if(!findUser){
            req.session.errorMessage = "User not found!";
                return res.redirect("/admin");
            
        }
        // check if fields are empty
        const updateFields = {};
        if(userName) {
            const existedUser = await User.findOne({
                userName,
                _id: { $ne: userId } 
            })
            if(existedUser){
                req.session.errorMessage = "Username is already exist!";
                return res.redirect("/admin");
            }
            else{
                updateFields.userName = userName
            }
        }
        if(fullName) updateFields.fullName = fullName
        if(email){
            const existedUser = await User.findOne({
                email,
                _id: { $ne: userId } 
            })
            if(existedUser){
                req.session.errorMessage = "Email is already exist!";
                return res.redirect("/admin");
            } else{
                updateFields.email = email
            }
            }
        if(role) {
            if(role == "viewer"){
                if(findUser.posts.length >0){
                    req.session.errorMessage = "First delete user's posts";
                    return res.redirect("/admin");
                }
            }
            updateFields.role = role
        }
        // console.log(updateFields);
        
    await User.updateOne({ _id: findUser._id}, { $set: updateFields })
    .then(result => {
        req.session.successMsg = "User successfully edited"
        res.redirect("/admin")
    })
    .catch(error => {
        req.session.errorMessage = "Something went wrong while updating the user"
        res.redirect("/admin")
    });
    } catch (error) {
        req.session.errorMessage = "Server error while updating the profile, Please wait!"
        return res.redirect("/admin")
    }
})
//For delete user
const removeUser = asyncHandler(async (req,res)=>{
    try {
        const findUser = await User.findById(req.params.id)
        if(!findUser){
            req.session.errorMessage = "User not found!"
            return res.redirect("/admin")
        }
        else{
            await User.deleteOne(findUser._id);
            req.session.successMsg = "User successfully remove"
            res.redirect("/admin");
        }
    } catch (error) {
        req.session.errorMessage = "Something went wrong while removing the user!"
            return res.redirect("/admin")
    }
})

//For send mail
const sendMail = asyncHandler(async (req,res)=>{
    const {email, msg} = req.body; // Expecting email field in request body
    console.log(email);
    
    // Mail transporter configuration
    let config = {
        service: "gmail",
        auth: {
            user: "frontendmarketplace561@gmail.com",
            pass: "vgkv eepf vzij swij" // Ensure you use App Password or enable Less Secure App Access
        }
    };

    let transporter = nodemailer.createTransport(config);

    // Email message options
    let message = {
        from: "frontendmarketplace561@gmail.com",
        to: email,
        subject: "Frontend Marketplace Notification",
        text: msg
    };

    // Send email
    transporter.sendMail(message).then(() => {
        req.session.successMsg = "Successfully send mail"
        res.redirect("/admin")
    }).catch((error) => {
        console.error("Error sending email:", error);
        req.session.errorMessage = "Failed to send mail!"
        res.redirect("/admin")
    });

})

//For user post delete
const deleteUserpost = asyncHandler(async (req,res)=>{
    const userPost= await Post.findById( req.params.id).populate("user");
    if(!userPost){
        req.session.errorMessage = "Post not found!"
        res.redirect("/admin")
    }

    const user = await User.findById(userPost.user._id);
    console.log(user);
    
    user.posts.splice(userPost._id,1);
    await Post.deleteOne(userPost._Id);
    user.save({validateBeforeSave:true})
    
    req.session.successMsg = "post deleted successfully"
    res.redirect("/admin")
})
export{
    addAdmin,
    editProfile,
    removeUser,
    editUserProfile,
    sendMail,
    deleteUserpost
}