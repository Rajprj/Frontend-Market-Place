import { apiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHendler.js";
import jwt from "jsonwebtoken";

const verifyUser = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
    
        if(!token){
            return res.redirect('/login');
        }
    
        const decodedToken = jwt.verify(token,"sadfASFAFsfsf")
    
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
        if(!user){
            return res.redirect('/login');
        }
    
        req.user = user
        next()
    } catch (error) {
        throw new apiError(401, error.message || "Invalid tokens try again")
    }
});

export { verifyUser };
