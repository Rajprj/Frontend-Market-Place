import { Router } from "express";
import { addAdmin, deleteUserpost, editProfile, editUserProfile, removeUser, sendMail } from "../controllers/admin.controler.js";
import { verifyUser } from "../middlewares/auth.midleware.js";

const router = Router();


router.post("/addAdmin", verifyUser, addAdmin)
router.post("/editProfile", verifyUser, editProfile)
router.get("/deleteUser/:id",removeUser)
router.post("/updateUserProfile",editUserProfile)
router.post("/sendMailUser",sendMail)
router.get("/userPostDelete/:id",deleteUserpost)
export const adminRouter = router;