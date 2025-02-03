import { useNavigate } from 'react-router-dom';

const StartBtn = () => {
    const navigate = useNavigate();

    return (
        <div className='flex items-center justify-center flex-col gap-6 my-10 px-6 sm:px-10'>
            {/* Title and Description */}
            <div className='mx-4 sm:mx-20 text-center'>
                <h1 className='font-semibold text-3xl text-blue-700 mb-3'>
                    QuizMate
                </h1>
                <p className='text-md text-gray-700'>
                    Test your knowledge with our fun and interactive quiz! Choose the best answers and challenge your friends.
                </p>
            </div>

            {/* Start Quiz Button */}
            <button
                onClick={() => navigate("/quiz")}
                className='transition-all duration-300 ease-in-out transform bg-gradient-to-r from-green-600 to-green-800 text-white font-bold py-3 px-10 rounded-xl shadow-lg hover:scale-105 hover:from-green-700 hover:to-green-900'
            >
                Start Quiz
            </button>
        </div>
    );
};

export default StartBtn;
