import { Router } from "express";
import { addAdmin, editProfile, removeUser } from "../controllers/admin.controler.js";
import { verifyUser } from "../middlewares/auth.midleware.js";

const router = Router();


router.post("/addAdmin", verifyUser, addAdmin)
router.post("/editProfile", verifyUser, editProfile)
router.get("/deleteUser/:id",removeUser)

export const adminRouter = router;