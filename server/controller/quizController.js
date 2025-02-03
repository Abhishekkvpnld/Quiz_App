import QuizResult from "../models/quizModel.js";
import User from "../models/userModel.js";

export const getResult = async (req, res) => {
  try {
    const docId = req.params.id;
    const userId = req.id;

    const userExists = await User.findById(userId);
    if (!userExists) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const doc = await QuizResult.findById(docId);
    if (!doc) {
      return res
        .status(404)
        .json({ success: false, message: "Quiz data not found" });
    }

    return res.status(200).json({
      success: true,
      error: false,
      data: doc,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: true,
      message: error.message,
    });
  }
};

export const saveQuizResult = async (req, res) => {
  const userId = req.id;

  try {
    const {
      score,
      totalQuestions,
      correctAnswers,
      wrongAnswers,
      attemptedQuestions,
      answers,
    } = req.body;

    if (
      !score == undefined ||
      !totalQuestions ||
      !correctAnswers == undefined ||
      !wrongAnswers == undefined ||
      !answers
    ) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided",
      });
    }

    const userExists = await User.findById(userId);
    if (!userExists) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const newQuizResult = new QuizResult({
      user: userId,
      score,
      totalQuestions,
      correctAnswers,
      wrongAnswers,
      attemptedQuestions: attemptedQuestions || correctAnswers + wrongAnswers,
      answers,
    });

    await newQuizResult.save();

    res.status(201).json({
      success: true,
      message: "Quiz result saved successfully",
      data: newQuizResult,
    });
  } catch (error) {
    console.error("Error saving quiz result:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getResults = async (req, res) => {
  try {
    const userId = req.id;

    const userExists = await User.findById(userId);
    if (!userExists) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const docs = await QuizResult.find();

    return res.status(200).json({
      success: true,
      error: false,
      data: docs,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: true,
      message: error.message,
    });
  }
};

export const deleteResult = async (req, res) => {
  try {
    const docId = req.params.id;
    const userId = req.id;

    const userExists = await User.findById(userId);
    if (!userExists) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const doc = await QuizResult.findByIdAndDelete(docId);
    if (!doc) {
      return res
        .status(404)
        .json({ success: false, message: "Quiz data not found" });
    }

    return res.status(200).json({
      success: true,
      error: false,
      data: doc,
      message: "Result deleted successfully...✅",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: true,
      message: error.message,
    });
  }
};
