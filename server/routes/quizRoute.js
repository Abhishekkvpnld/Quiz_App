import express from "express";
import { jwtAuth } from "../middleware/auth.js";
import { addResult, getResults } from "../controller/quizController.js";


const router = express.Router();

router.get("/results",getResults);
router.post("/complete",addResult);


export default router;