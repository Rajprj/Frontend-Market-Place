import { app } from "./app.js"
import { dbConnection } from "./db/dbConnection.js"
import { apiError } from "./utils/apiError.js"
import { verifyUser } from "./middlewares/auth.midleware.js"
import { User } from "./models/user.model.js"
import jwt from "jsonwebtoken"
import { getDashboard } from "./middlewares/getUsersInfo.midleware.js"
import { getUserPost } from "./middlewares/postDetailedInfoForIndex.midleware.js"


const port = 6500

dbConnection()
    .then(() => {
        app.get("/", getUserPost, async (req, res) => {
            const isLoggedIn = req.cookies?.accessToken ? true : false;
            let profileUser = null;

            if (isLoggedIn) {
                try {
                    const decodedToken = jwt.verify(req.cookies.accessToken, "sadfASFAFsfsf")
                    profileUser = await User.findById(decodedToken._id).populate("comment")
                } catch (error) {
                    console.log(error);

                }
            }

            res.render("index", { isLoggedIn, profileUser, userPosts: req.userPosts });
        });

        app.get("/regex", async (req, res) => {
            const isLoggedIn = req.cookies?.accessToken ? true : false;
            let profileUser = null;

            if (isLoggedIn) {
                try {
                    const decodedToken = jwt.verify(req.cookies.accessToken, "sadfASFAFsfsf")
                    profileUser = await User.findById(decodedToken._id)
                } catch (error) {
                    console.log(error);

                }
            }

            res.render("regex", { isLoggedIn, profileUser });
        })

        app.get("/uicode",getUserPost, async (req, res) => {
            const isLoggedIn = req.cookies?.accessToken ? true : false;
            let profileUser = null;

            if (isLoggedIn) {
                try {
                    const decodedToken = jwt.verify(req.cookies.accessToken, "sadfASFAFsfsf")
                    profileUser = await User.findById(decodedToken._id).populate("comment")
                } catch (error) {
                    console.log(error);

                }
            }

            res.render("uicode", { isLoggedIn, profileUser,userPosts: req.userPosts  });
        })
        app.get("/profile", verifyUser, async (req, res) => {
            const profileUser = await User.findById(req.user._id)
                .populate({
                    path: 'posts',
                    populate: {
                        path: 'comment'
                    }
                });

            // console.log(profileUser);
            const errorMessage = req.session.errorMessage;
            req.session.errorMessage = null;
            const successMsg = req.session.successMsg;
            req.session.successMsg = null;


            if (profileUser.role !== "developer" && profileUser.role !== "viewer") {
                res.redirect("login");
            }
            res.render("profile", { profileUser, errorMessage, successMsg })
        })
        app.get("/visitedProfile/:visitedUserId" ,async (req, res) => {
            
            const errorMessage = req.session.errorMessage;
            req.session.errorMessage = null;
            const successMsg = req.session.successMsg;
            req.session.successMsg = null;
            const profileUser = await User.findById(req.params.visitedUserId).populate('posts');
            const visitorId = req.query.visitorId;
            // console.log(visitorId);
            
            const visitedUser = await User.findById(visitorId).populate('comment')
            // console.log(visitedUser);
            
            res.render("visitedProfile", {profileUser, visitedUser})
        })
        app.get("/login", (req, res) => {
            
            res.render("login")
        })
        app.get('/forgetPassword', (req, res) => {
           
            res.render('forgetPassword', {
              userName: "",      
              success: null,     
              pass: "" ,  
            });
          });
        
        app.get("/contact", (req, res) => {
            res.render("contact")
        })
        app.get("/register", (req, res) => {
            res.render("register")
        })
        app.get("/aboutus",async (req, res) => {
            const isLoggedIn = req.cookies?.accessToken ? true : false;
            let profileUser = null;

            if (isLoggedIn) {
                try {
                    const decodedToken = jwt.verify(req.cookies.accessToken, "sadfASFAFsfsf")
                    profileUser = await User.findById(decodedToken._id)
                } catch (error) {
                    console.log(error);

                }
            }

            res.render("aboutus", { isLoggedIn, profileUser});
        })
        app.get("/admin", verifyUser, getDashboard, async (req, res) => {
            try {
                const admin = await User.findById(req.user._id);

                if (!admin) {
                    console.error("Admin user not found");
                    return res.status(404).send("Admin user not found");
                }

                if (admin.role === "admin") {
                    const errorMessage = req.session.errorMessage;
                    req.session.errorMessage = null;
                    const successMsg = req.session.successMsg;
                    req.session.successMsg = null;

                    res.render("admin", {
                        admin,
                        developerCount: req.developerCount,
                        viewerCount: req.viewerCount,
                        postCount: req.postCount,
                        developers: req.developers,
                        viewers: req.viewers,
                        userPosts: req.userPosts,
                        contacts: req.contacts,
                        errorMessage,
                        successMsg
                    });
                } else {
                    res.render("login"); // Redirect if not an admin
                }
            } catch (error) {
                console.error("Error in /admin route:", error); // Log the specific error
                res.status(500).send("Internal Server Error");
            }
        });

        app.listen(port, () => {
            console.log(`server listening on port:${port}`);

        })
    })
    .catch((err) => {
        throw new apiError(401, "DB connection failed!")
    })