import { Router } from "express";
import { loginUser, logOutUser, registerUser, removeDp, uploadDp, addUserPost, deletePost, detailedPost, likePost, updateProfile, changeRole } from "../controllers/user.controler.js";
import { verifyUser } from "../middlewares/auth.midleware.js";
import { upload } from "../middlewares/multer.midleware.js";


const router = Router() 

router.post("/register",registerUser)
router.post("/login",loginUser)
router.get("/logOut",verifyUser, logOutUser)
router.post("/uploadDP",verifyUser,upload.single("dp"),uploadDp)
router.get("/removeDp",verifyUser,removeDp)
router.post("/uploadPost", verifyUser,
    upload.fields([
        { name: "thumbnailUpload", maxCount: 1 },
        { name: "codeUpload", maxCount: 1 },
        { name: "sliderImages", maxCount: 4 }
    ]),addUserPost
)
router.get("/delete/post/:id", verifyUser, deletePost)
router.get("/seeDetailPost/:id", detailedPost)
router.get("/likePost/:id", verifyUser, likePost)
router.post("/updateProfile", verifyUser, updateProfile)
router.post("/changeRole", verifyUser, changeRole)
export const userRouter = router;