import { apiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHendler.js";
import jwt from "jsonwebtoken";

const verifyUser = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
    
        if(!token){
            console.log("token is required");
            return res.render('login', {errorMessage: "Sorry you'r not loggedIn!"});
        }
    
        const decodedToken = jwt.verify(token,"sadfASFAFsfsf")
    
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
        if(!user){
            console.log("user not found in auth");
            return res.render('login',{errorMessage:"Something went wrong"});
        }
    
        req.user = user
        next()
    } catch (error) {
        return res.render("login",{errorMessage:"Invalid token"})
    }
});

export { verifyUser };
