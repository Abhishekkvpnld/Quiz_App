import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Status from "./pages/Status";
import Home from "./pages/Home";
import toast from "react-hot-toast";
import axios from "axios";
import { api } from "../constants/api";
import { useUser } from "./context/userContext";
import { useEffect } from "react";

const App = () => {

  // const { setUser, user } = useUser()
  // console.log(user)

  const fetchUser = async () => { 
    try {
      const res = await axios.get(`${api}/user/get-user`, { withCredentials: true });
      if (res?.data?.success) {
        setUser(res?.data?.data) 
      }
    } catch (error) {
      console.log(error)
      toast.error(error?.response.data.message)
    } 
  }

  useEffect(() => {
    fetchUser()
  }, []);


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/status:id" element={<Status />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App;