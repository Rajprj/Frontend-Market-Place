import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHendler.js";

const getUserPost = asyncHandler(async (req, res, next) => {
    try {
        
        const userPosts = await Post.find().populate('user');
        // console.log(userPosts);
        const randomPosts = userPosts
        .sort(() => 0.5 - Math.random())  
        .slice(0, 6);
        // userPosts.forEach((post)=>{
        //     // console.log(post.user.followers.length);
            
        // })
        req.userPosts = randomPosts   
        next();
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        res.status(500).render("admin", { msg: "Error fetching data for the dashboard" });
    }
});

export { getUserPost };
