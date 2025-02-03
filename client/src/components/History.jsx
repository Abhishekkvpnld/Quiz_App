import { useEffect, useState } from "react";
import quizQuestions from "../../constants/data"
import Card from "./Card"
import toast from "react-hot-toast";
import axios from "axios";
import { api } from "../../constants/api";




const History = () => {

    const [data, setData] = useState([])


    const fetchData = async () => {
        try {
            const res = await axios.get(`${api}/quiz/results`, { withCredentials: true });
            if (res?.data?.success) {
                setData(res?.data?.data); 
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
    }, []);

    return (
        <div className=" px-10 flex flex-col gap-3">
            <h1 className=" font-bold text-slate-500 text-lg my-2">History Quiz Completed! 🏆</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {
                    data?.map((d) => (
                        <Card data={d} key={d.id} />
                    ))
                }
            </div>
        </div>
    )
}

export default History