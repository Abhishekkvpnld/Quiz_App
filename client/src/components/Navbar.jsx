import axios from "axios";
import { useContext, useState } from "react"
import toast from "react-hot-toast";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { api } from "../../constants/api";
import UserContext from "../context/userContext";


const Navbar = () => {

    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const { user } = useContext(UserContext)

    const handleLogout = async () => {

        try {
            let res = await axios.get(`${api}/user/logout`, { withCredentials: true });
            navigate("/login");

            if (res?.data?.success) {
                toast.success(res?.data?.data?.message);
            }

        } catch (error) {
            toast.error(error?.response?.data?.data?.messsage);
        }
    }


    return (
        <div className="navbar w-full h-[60px] flex items-center justify-between bg-[#f4f4f4] px-10">
            <div className="left flex items-center justify-center gap-2  cursor-pointer" onClick={() => navigate("/")}>
                <img src="/quiz.png" className="w-12 h-12 rounded-full" alt="img" />
            </div>

            <div className="right flex items-center justify-center gap-3">
                <div className="search hidden md:flex items-center justify-center bg-slate-200 w-100% rounded-lg px-2 h-8" >
                    <i><FiSearch className="mx-2 hover:scale-125 hover:text-blue-700 hover:font-bold cursor-pointer" /></i>
                    <input placeholder="Search here..." className="bg-slate-200 rounded-lg w-full px-2 h-full" onChange={(e) => setSearch(e.target.value)} value={search} type="text" />
                </div>

                {
                    user ? <button onClick={handleLogout} className="bg-blue-700 px-3 py-1 rounded-lg cursor-pointer text-white hover:bg-blue-800">Logout</button> :
                        <button onClick={() => navigate("/login")} className="bg-purple-700 px-3 py-1 rounded-lg cursor-pointer text-white hover:bg-purple-800">Login</button>
                }



                <div className="flex items-center gap-1">
                    <img className="w-10 h-10 rounded-full" src={"/profile.png"} alt="img" />
                    <p>{"username"}</p>
                </div>

            </div>

        </div>
    )
}

export default Navbar;