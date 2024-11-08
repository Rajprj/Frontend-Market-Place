import { Router } from "express";
import { addAdmin, editProfile } from "../controllers/admin.controler.js";
import { verifyUser } from "../middlewares/auth.midleware.js";

const router = Router();


router.post("/addAdmin", verifyUser, addAdmin)
router.post("/editProfile", verifyUser, editProfile)


export const adminRouter = router;