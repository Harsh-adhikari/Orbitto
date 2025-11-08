import express from "express";
import { signup, login, logout, updateProfile, checkAuth } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);  

router.post("/login", login);

router.post("/logout", logout);

// using protectRoute to protect route 
router.put("/update-profile",protectRoute,updateProfile); 

//When user refresh protectRoute will verify the token then checkAuth send's the success or error msg 
router.get("/check", protectRoute, checkAuth );
export default router;
