import { Router } from "express";
import { loginUser, logOutUser, registerUser, removeDp, uploadDp, addUserPost, deletePost, detailedPost, likePost, updateProfile, changeRole, followingUser, followingList, followersList, addComment, deleteComments, downloadPost,otp,forgotPassword,verify, contact } from "../controllers/user.controler.js";
import { verifyUser } from "../middlewares/auth.midleware.js";
import { upload } from "../middlewares/multer.midleware.js";


const router = Router() 

router.post("/register",registerUser)
router.post("/login",loginUser)
router.post("/otp",otp)
router.post("/verify",verify)
router.post("/forgotPassword",forgotPassword)
router.get("/logOut",verifyUser, logOutUser)
router.post("/uploadDP",verifyUser,upload.single("dp"),uploadDp)
router.get("/followingOrRemove/:id",verifyUser,followingUser)
router.get("/removeDp",verifyUser,removeDp)
router.get("/followingList",verifyUser,followingList)
router.get("/followersList",verifyUser,followersList)
router.get("/deleteComment/:id",verifyUser,deleteComments)
router.get("/download/:id",verifyUser,downloadPost)
router.post("/addComment/:id",verifyUser,addComment)
router.post("/uploadPost", verifyUser,
    upload.fields([
        { name: "thumbnailUpload", maxCount: 1 },
        { name: "codeUpload", maxCount: 1 },
        { name: "sliderImages" }
    ]),addUserPost
)
router.get("/delete/post/:id", verifyUser, deletePost)
router.get("/seeDetailPost/:id", detailedPost)
router.get("/likePost/:id", verifyUser, likePost)
router.post("/updateProfile", verifyUser, updateProfile)
router.post("/changeRole", verifyUser, changeRole)
router.post("/contact", contact)

export const userRouter = router;