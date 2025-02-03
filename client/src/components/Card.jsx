import { MdOutlineDeleteOutline } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";

const Card = ({ data }) => {
  return (
    <div className="flex flex-col gap-4 bg-slate-200 rounded-lg p-4 hover:shadow-xl transition-all duration-300 ease-in-out">
      {/* Date and Details Icon */}
      <div className="flex items-center justify-between px-3">
        <p className="text-sm font-semibold text-slate-600">{data?.createdAt?.split("T")[0]}</p>
        <TbListDetails
          size={20}
          className="hover:scale-110 transition-all text-blue-600 cursor-pointer"
        />
      </div>

      {/* Score and Delete Icon */}
      <div className="flex items-center justify-between px-3">
        <div className="flex items-center gap-2 font-semibold text-sm text-slate-700">
          <p className="rounded-full bg-white w-10 h-10 font-bold text-center flex items-center justify-center shadow-md">
            {data?.score}
          </p>
          <p>points</p>
        </div>
        <MdOutlineDeleteOutline
          size={20}
          className="hover:scale-110 transition-all hover:text-red-600 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Card;
