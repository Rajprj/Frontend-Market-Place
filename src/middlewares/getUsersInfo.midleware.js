import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHendler.js";
import { Contact } from "../models/contact.model.js"

const getDashboard = asyncHandler(async (req, res, next) => {
    try {
        // Fetch counts for developers, viewers, and posts
        const [developerCount, viewerCount, postCount] = await Promise.all([
            User.countDocuments({ role: "developer" }),
            User.countDocuments({ role: "viewer" }),
            Post.countDocuments()
        ]);
        // console.log(postCount);
        
        //for developer
        const developers = await User.find({ role: "developer" })
        .select("userName email fullName role dp")
        .populate({
          path: "posts", // Populate the 'post' field
          populate: {
            path: "comment",
            populate:{
                path:"user"
            } 
          },
        });
        await Promise.all(
            developers.map(async (developer) => {
                const posts = await Post.find({ user: developer._id });
                developer.developerPostCount = posts.length; 
            })
        );
        // developers.forEach((dev)=>{
            // console.log(dev.followers);
        // })
        //post
        const userPosts = await Post.find().select("_id postName user").populate('user');
        // userPosts.forEach((post)=>{
        //     console.log(post);
        // })
        // console.log(postCount);

        // viewer
        const viewers = await User.find({ role: "viewer" }).select("userName email fullName");
        const contacts = await Contact.find().select("email message");

       
        req.viewerCount = viewerCount;
        req.postCount = postCount;
        req.developerCount = developerCount;
        req.developers = developers;
        req.viewers = viewers;
        req.userPosts = userPosts;
        req.contacts = contacts;

        // Continue to the next middleware or route handler
        
        next();
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        res.status(500).render("admin", { msg: "Error fetching data for the dashboard" });
    }
});

export { getDashboard };
