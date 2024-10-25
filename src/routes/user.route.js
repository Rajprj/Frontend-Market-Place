import { Router } from "express";
import { loginUser, logOutUser, registerUser, removeDp, uploadDp } from "../controllers/user.controler.js";
import { verifyUser } from "../middlewares/auth.midleware.js";
import { upload } from "../middlewares/multer.midleware.js";


const router = Router() 

router.post("/register",registerUser)
router.post("/login",loginUser)
router.get("/logOut",verifyUser, logOutUser)
router.post("/uploadDP",verifyUser,upload.single("dp"),uploadDp)
router.get("/removeDp",verifyUser,removeDp)
export default router