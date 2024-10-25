import { app } from "./app.js"
import {dbConnection} from "./db/dbConnection.js"
import { apiError } from "./utils/apiError.js"
import {verifyUser} from "./middlewares/auth.midleware.js"
import { User } from "./models/user.model.js"
import  jwt  from "jsonwebtoken"

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
        const profileUser = await User.findById(req.user._id)
        res.render("profile", {profileUser})
    })
    app.get("/login",(req,res)=>{
        res.render("login")
    })
    app.get("/register",(req,res)=>{
        res.render("register")
    })
    app.get("/admin",(req,res)=>{
        res.render("admin")
    })
    app.listen(port,()=>{
        console.log(`server listening on port:${port}`);
        
    })
})
.catch((err)=>{
    throw new apiError(401, "DB connection failed!")
})