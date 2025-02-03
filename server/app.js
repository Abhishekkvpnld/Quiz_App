import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import dbConnection from "./utils/dbConnection.js";

//Routes
import userRoute from "./routes/userRoute.js";
import quizRoute from "./routes/quizRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL,"https://quiz-app-ruddy-omega.vercel.app", "http://localhost:5173"],
    credentials: true,
  })
);
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Server running...");
});

app.use("/api/v1/user", userRoute);
app.use("/api/v1/quiz", quizRoute);

dbConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
  });
});
