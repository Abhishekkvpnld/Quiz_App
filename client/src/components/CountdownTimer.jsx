import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CountdownTimer = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(5* 60);

  useEffect(() => {
    if (timeLeft === 0) {
      navigate("/finished");
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, navigate]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="text-center p-4">
      <h2 className="text-2xl font-semibold rounded-full flex items-center justify-center text-white bg-blue-700 w-16 h-16">
        {formatTime(timeLeft)}
      </h2>
    </div>
  );
};

export default CountdownTimer;
