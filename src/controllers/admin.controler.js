import { User } from "../models/user.model.js";
import { Post } from "../models/post.model.js";
import { asyncHandler } from "../utils/asyncHendler.js";
import { apiError } from "../utils/apiError.js";


// For add new Admin
const addAdmin = asyncHandler(async (req,res)=>{
    const{userName, email, fullName, password} = req.body;

    //check all fields are filled 
    if([userName, email, fullName, password].some((fields)=>fields?.trim() === "")){
        return res.render("admin", { errorMessage: "All fields are required!"});
    }

    //check if admin already exist
    const existedAdmin = await User.findOne({
        $or : [{userName}, {email}]
    })
    if(existedAdmin){
        return res.render("admin", { errorMessage: "allready exist"});
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
        return res.render("admin", { errorMessage: "Something went wrong during registration.", formData: req.body });
    }

    res.redirect("/admin");
})

//For edit Admin profile details
const editProfile = asyncHandler(async (req,res)=>{
    try {
        console.log("edit profile admin");
        console.log(req.user._id);
        const{userName, email, fullName} = req.body;
        if([userName, email, fullName].some((fields)=> fields?.trim() === "")){
            throw new apiError(400,"fields are required")
        }
    
        const existAdmin = await User.findOne({
            $or:[{userName},{email}],
            _id: { $ne: req.user._id } 
        })
        if(existAdmin){
            throw new apiError(400,"already exist")
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
        throw new apiError(500,"server error while updating the profile")
    }
})



export{
    addAdmin,
    editProfile
}