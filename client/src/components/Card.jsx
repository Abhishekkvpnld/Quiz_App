import axios from "axios";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { api } from "../../constants/api";
import toast from "react-hot-toast";

const Card = ({ data, setDeleteQuiz }) => {
  const navigate = useNavigate();
  console.log(data)

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`${api}/quiz/delete/${data?._id}`, { withCredentials: true });
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        setDeleteQuiz(prev => !prev)
      } else {
        toast.error("Failed to delete quiz data");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error deleting quiz data");
    }
  };

  return (
    <div className="flex flex-col gap-4 bg-white rounded-lg p-4 hover:shadow-xl transition-all duration-300 ease-in-out shadow-md border border-gray-200">
      {/* Date and Details Icon */}
      <div className="flex items-center justify-between px-3">
        <p className="text-sm font-semibold text-gray-600">{data?.createdAt?.split("T")[0]}</p>
        <TbListDetails
          onClick={() => navigate(`/status/${data?._id}`)}
          size={22}
          className="hover:scale-110 transition-all text-blue-600 cursor-pointer hover:text-blue-800"
        />
      </div>

      {/* Score and Delete Icon */}
      <div className="flex items-center justify-between px-3">
        <div className="flex items-center gap-2 font-semibold text-sm text-gray-700">
          <p className="rounded-full bg-blue-500 w-12 h-12 text-white font-bold text-center flex items-center justify-center shadow-lg">
            {data?.score ?? "N/A"}
          </p>
          <p className="text-gray-600">points</p>
        </div>
        <MdOutlineDeleteOutline
          onClick={handleDelete}
          size={22}
          className="hover:scale-110 transition-all text-red-500 cursor-pointer hover:text-red-700"
        />
      </div>
    </div>
  );
};

export default Card;
