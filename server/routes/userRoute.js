import express from "express";
import { getUser, login, logout, register } from "../controller/userController.js";
import { jwtAuth } from "../middleware/auth.js";


const router = express.Router();

router.post("/register",register);
router.post("/login",login);
router.get("/get-user",jwtAuth,getUser)
router.get("/logout",logout); 

 
export default router;