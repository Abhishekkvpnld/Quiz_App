import express from "express";
import { jwtAuth } from "../middleware/auth.js";
import {  deleteResult, getResult, getResults, saveQuizResult } from "../controller/quizController.js";


const router = express.Router();

router.get("/results",jwtAuth,getResults);
router.post("/add",jwtAuth,saveQuizResult);
router.get("/:id",jwtAuth,getResult);
router.get("/delete/:id",jwtAuth,deleteResult);

export default router;