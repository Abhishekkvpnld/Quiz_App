import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import CountdownTimer from "../components/CountdownTimer";
import quizQuestions from "../../constants/data";
import toast from "react-hot-toast";
import axios from "axios";
import { api } from "../../constants/api";
import UserContext from "../context/userContext";

const Quiz = () => {
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answersArray, setAnswersArray] = useState([]);
  const [isComplete, setIsComplete] = useState(false);
  const [score, setScore] = useState(0); // FIXED: Converted score to state


  const { user } = useContext(UserContext)

  useEffect(() => {
    if (!user) {
      return navigate("/login")
    }
  }, [user]);

  // Shuffle the quiz data
  useEffect(() => {
    setQuizData([...quizQuestions].sort(() => Math.random() - 0.5));
  }, []);

  const handleOptionClick = (option) => setSelectedOption(option);

  const handleNext = () => {
    if (!selectedOption) return toast.error("Pick one option");

    const isCorrect = selectedOption === quizData[currentQuestionIndex].answer;
    
  
    setScore((prevScore) => prevScore + (isCorrect ? 1 : 0));

    setAnswersArray((prev) => [
      ...prev,
      { question: quizData[currentQuestionIndex].question, selectedOption, isCorrect },
    ]);

    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      setIsComplete(true);
    }
  };

  const handleSubmit = async () => {
    try {
      const quizResult = {
        score,
        totalQuestions: quizData.length,
        correctAnswers: answersArray.filter((ans) => ans.isCorrect).length,
        wrongAnswers: answersArray.filter((ans) => !ans.isCorrect).length,
        attemptedQuestions: answersArray.length,
        answers: answersArray,
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
    <div className="flex flex-col items-center w-full min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 animate-gradient-x">
      <Navbar />

      <div className="w-full px-10 flex items-center justify-between mt-4">
        <button onClick={() => navigate("/")} className="btn">Back</button>
        <button onClick={() => window.location.reload()} className="btn">Refresh</button>
        <CountdownTimer onTimeUp={handleSubmit} />
      </div>

      <div className="bg-white p-5 min-w-[50%] min-h-[50%] mt-5 rounded-xl shadow-lg">
        {quizData.length > 0 ? (
          <>
            {/* Subject & Question Number */}
            <div className="flex items-center justify-between my-2">
              <button className="bg-red-500 text-white px-4 py-1 rounded-full">
                {quizData[currentQuestionIndex].subject}
              </button>
              <span className="px-6 py-1 bg-green-600 text-white font-bold rounded-full">
                {currentQuestionIndex + 1} / {quizData.length}
              </span>
            </div>

            {/* Question */}
            <h1 className="my-4 font-semibold text-lg">
              {currentQuestionIndex + 1}. {quizData[currentQuestionIndex].question}
            </h1>

            {/* Options */}
            <div className="grid grid-cols-2 gap-3">
              {quizData[currentQuestionIndex].options.map((option, i) => (
                <button
                  key={i}
                  className={`border rounded-md p-2 transition-all ${
                    selectedOption === option
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </button>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-between mt-6">
              <button
                onClick={handleSubmit}
                className="bg-violet-600 cursor-pointer hover:bg-violet-700 rounded-md text-white py-2 px-6 transition-all"
              >
                Submit
              </button>
              {!isComplete && (
                <button
                  onClick={handleNext}
                  className={`bg-blue-600 rounded-md cursor-pointer text-white py-2 px-6 transition-all ${
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
