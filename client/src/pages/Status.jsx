import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";
import axios from "axios";
import { api } from "../../constants/api";
import { useEffect, useState } from "react";

const Status = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams(); 

  const fetchData = async () => {
    try {
      const res = await axios.get(`${api}/quiz/${id}`, { withCredentials: true }); // Correct API endpoint
      if (res?.data?.success) {
        setData(res?.data?.data); // Set the fetched quiz data to state
      } else {
        toast.error("Failed to fetch quiz data");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching quiz data");
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);


  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
        <h2 className="text-2xl font-semibold text-red-500">No Quiz Data Found</h2>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
        >
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="transition-all flex flex-col items-center w-[100vw] min-h-[100vh] bg-gray-100">
      <Navbar />

      <div className="bg-white p-6 min-w-[50%] min-h-[50%] mt-5 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-center text-green-600">Quiz Completed 🎉</h1>

        <div className="mt-4 text-center">
          <p className="text-xl font-semibold">Your Score: <span className="text-blue-500">{data.score}</span></p>
          <p className="text-md text-gray-700">Quiz ID: {data._id}</p>
          <p className="text-md text-gray-700">Total Questions: {data.totalQuestions}</p>
          <p className="text-md text-gray-700">Correct Answers: {data.correctAnswers}</p>
          <p className="text-md text-gray-700">Wrong Answers: {data.wrongAnswers}</p>
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={() => navigate("/")}
            className="px-5 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700"
          >
            Home
          </button>
          <button
            onClick={() => navigate("/quiz")}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
          >
            Retake Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default Status;
