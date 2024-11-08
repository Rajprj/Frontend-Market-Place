import { app } from "./app.js"
import {dbConnection} from "./db/dbConnection.js"
import { apiError } from "./utils/apiError.js"
import {verifyUser} from "./middlewares/auth.midleware.js"
import { User } from "./models/user.model.js"
import  jwt  from "jsonwebtoken"
import { getDashboard } from "./middlewares/getUsersInfo.midleware.js"


const port = 6500

dbConnection()
.then(()=>{
    app.get("/",async (req, res) => {
        const isLoggedIn = req.cookies?.accessToken ? true : false;
        let profileUser = null;

        if(isLoggedIn){
            try {
                const decodedToken = jwt.verify(req.cookies.accessToken, "sadfASFAFsfsf")
                profileUser = await User.findById(decodedToken._id)
            } catch (error) {
                console.log(error);
                
            }
        }

        res.render("index", { isLoggedIn, profileUser });
    });

    app.get("/regex",async (req,res)=>{
        const isLoggedIn = req.cookies?.accessToken ? true : false;
        let profileUser = null;

        if(isLoggedIn){
            try {
                const decodedToken = jwt.verify(req.cookies.accessToken, "sadfASFAFsfsf")
                profileUser = await User.findById(decodedToken._id)
            } catch (error) {
                console.log(error);
                
            }
        }

        res.render("regex", { isLoggedIn, profileUser });
    })

    app.get("/uicode",async (req,res)=>{
        const isLoggedIn = req.cookies?.accessToken ? true : false;
        let profileUser = null;

        if(isLoggedIn){
            try {
                const decodedToken = jwt.verify(req.cookies.accessToken, "sadfASFAFsfsf")
                profileUser = await User.findById(decodedToken._id)
            } catch (error) {
                console.log(error);
                
            }
        }

        res.render("uicode", { isLoggedIn, profileUser });
    })
    app.get("/profile",verifyUser,async (req,res)=>{
        const profileUser = await User.findById(req.user._id).populate('posts')
        // console.log(profileUser);
        if(profileUser.role !== "developer" && profileUser.role !== "viewer"){
            res.redirect("login");
        }
        res.render("profile", {profileUser})
    })
    app.get("/login",(req,res)=>{
        res.render("login")
    })
    app.get("/register",(req,res)=>{
        res.render("register")
    })
    app.get("/admin",verifyUser,getDashboard, async (req,res)=>{
        const admin = await User.findById(req.user._id);
        // console.log(admin);
        
        if(admin.role === "admin"){
        res.render("admin", {admin, developerCount:req.developerCount, viewerCount: req.viewerCount, postCount : req.postCount,developers: req.developers, viewers: req.viewers, userPosts : req.userPosts, } )
        }
        else{
            res.render("login")
        }
    })
    app.listen(port,()=>{
        console.log(`server listening on port:${port}`);
        
    })
})
.catch((err)=>{
    throw new apiError(401, "DB connection failed!")
})