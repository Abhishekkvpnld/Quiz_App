import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import CountdownTimer from "../components/CountdownTimer";
import quizQuestions from "../../constants/data";
import toast from "react-hot-toast";
import axios from "axios";
import { api } from "../../constants/api";

const Quiz = () => {
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [answersArray, setAnswersArray] = useState([]);
  const [isComplete, setIsComplete] = useState(false);

  const shuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    const shuffledData = shuffleArray(quizQuestions);
    setQuizData(shuffledData);
  }, []);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    if (!selectedOption) {
      return toast.error("Pick one option");
    }

    const isCorrect = selectedOption === quizData[currentQuestionIndex].correctAnswer;
    const updatedScore = isCorrect ? score + 1 : score;

    const newAnswer = {
      question: quizData[currentQuestionIndex].question,
      selectedOption,
      isCorrect,
    };

    const updatedAnswersArray = [...answersArray, newAnswer];

    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedOption(null);
      setScore(updatedScore);
      setAnswersArray(updatedAnswersArray);
    } else {
      setIsComplete(true);
    }
  };

  const handleSubmit = async (finalScore = score, finalAnswersArray = answersArray) => {
    try {
      const quizResult = {
        score: finalScore,
        totalQuestions: quizData.length,
        correctAnswers: finalAnswersArray.filter((ans) => ans.isCorrect).length,
        wrongAnswers: finalAnswersArray.filter((ans) => !ans.isCorrect).length,
        attemptedQuestions: finalAnswersArray.length,
        answers: finalAnswersArray,
      };

      const res = await axios.post(`${api}/quiz/add`, quizResult, { withCredentials: true });

      if (res?.data?.success) {
        toast.success("Quiz submitted successfully!");
        navigate(`/finished/${res?.data?.data?._id}`);
      }
    } catch (error) {
      console.error("Error submitting quiz:", error);
      toast.error("Failed to submit quiz.");
    }
  };

  return (
    <div className="transition-all flex flex-col items-center w-[100vw] min-h-[100vh] bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 animate-gradient-x">
      <Navbar />

      <div className="w-full px-20 flex items-center md:justify-between">
        <button
          onClick={() => navigate("/")}
          className="px-5 py-2 border bg-white rounded-lg font-semibold border-slate-500 hover:bg-slate-800 hover:text-white transition-all"
        >
          Back
        </button>
        <button
          onClick={() => window.location.reload()}
          className="px-5 py-2 border bg-white rounded-lg font-semibold border-slate-500 hover:bg-slate-800 hover:text-white transition-all"
        >
          Refresh
        </button>
        <CountdownTimer onTimeUp={() => handleSubmit()} />
      </div>

      <div className="bg-white p-5 min-w-[50%] min-h-[50%] mt-5 rounded-xl shadow-lg">
        {quizData.length > 0 ? (
          <>
            <div className="flex items-center justify-between my-2">
              <button className="bg-red-500 text-white px-4 py-1 rounded-full my-2">
                {quizData[currentQuestionIndex].subject}
              </button>
              <span className="px-6 py-1 bg-green-600 text-white font-bold rounded-full">
                {currentQuestionIndex + 1}
              </span>
            </div>

            <h1 className="my-4 font-semibold text-lg">
              <span>{currentQuestionIndex + 1}.</span> {quizData[currentQuestionIndex].question}
            </h1>

            <div className="grid grid-cols-2 gap-3">
              {quizData[currentQuestionIndex].options.map((option, i) => (
                <button
                  key={i}
                  className={`border rounded-md p-2 transition-all ${
                    selectedOption === option
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 hover:underline"
                  }`}
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between mt-6">
              <button
                onClick={() => handleSubmit(score, answersArray)}
                className="bg-violet-600 cursor-pointer hover:bg-violet-700 rounded-md text-white py-2 mt-4 px-16 transition-all"
              >
                Submit
              </button>
              {!isComplete && (
                <button
                  onClick={handleNext}
                  className={`bg-blue-600 rounded-md cursor-pointer text-white py-2 mt-4 px-16 transition-all ${
                    !selectedOption ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
                  }`}
                  disabled={!selectedOption}
                >
                  Next
                </button>
              )}
            </div>
          </>
        ) : (
          <p className="text-center text-lg font-semibold">Loading questions...</p>
        )}
      </div>
    </div>
  );
};

export default Quiz;
