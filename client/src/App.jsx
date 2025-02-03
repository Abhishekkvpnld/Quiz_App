import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Status from "./pages/Status";
import Home from "./pages/Home";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { api } from "../constants/api";
import { useContext, useEffect, useState } from "react";
import Quiz from "./pages/Quiz";
import Finish from "./pages/Finish";
import UserContext from "./context/userContext";




const App = () => {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${api}/user/get-user`, { withCredentials: true });
      if (res?.data?.success) {
        setUser(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Failed to fetch user data");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (

    <UserContext.Provider value={{setUser,user}}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/status/:id" element={<Status />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/finished/:id" element={<Finish />} />
          <Route path="*" element={<Login />} />
        </Routes>
        <Toaster position="bottom-right"/>
      </Router>
    </UserContext.Provider>

  );
};

export default App;
