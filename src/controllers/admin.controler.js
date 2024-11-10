import { User } from "../models/user.model.js";
import { Post } from "../models/post.model.js";
import { asyncHandler } from "../utils/asyncHendler.js";
import { apiError } from "../utils/apiError.js";



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
// const editUserProfile = asyncHandler(async (req,res)=>{
//     try {
//         const{userName,fullName,email,role} = req.body;
//         if([userName,fullName,email,role].some((fields)=> fields?.trim() === "")){
//             req.session.errorMessage = "Pleace fill the All fields"
//             return res.redirect("/admin")
//         }

//         // const existedUser = 

//     } catch (error) {
//         req.session.errorMessage = "Server error while updating the profile, Please wait!"
//         return redirect("/admin")
//     }
// })
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

export{
    addAdmin,
    editProfile,
    removeUser
}