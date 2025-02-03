import { useContext, useEffect } from "react";
import Navbar from "../components/Navbar";
import StartBtn from "../components/StartBtn";
import UserContext from "../context/userContext";
import { useNavigate } from "react-router-dom";
import History from "../components/History";



const Home = () => {

  const navigate = useNavigate();
  const { user } = useContext(UserContext)

  useEffect(() => {
    if (!user) {
      return navigate("/login")
    }
  }, []);

  return (
    <div className="flex flex-col gap-4 ">
      <Navbar />
      <StartBtn />
      <History/>
    </div>
  )
}

export default Home;