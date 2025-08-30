import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import { Context } from "./main";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import Home from "./components/Home/Home";
import Jobs from "./components/Job/Jobs";
import JobDetails from "./components/Job/JobDetails";
import Application from "./components/Application/Application";
import MyApplications from "./components/Application/MyApplications";
import PostJob from "./components/Job/PostJob";
import NotFound from "./components/NotFound/NotFound";
import MyJobs from "./components/Job/MyJobs";

const App = () => {
  const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);
  const [loading, setLoading] = useState(true); 
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/v1/user/getuser`, {
          withCredentials: true,
        });
        setUser(response.data.user);
        setIsAuthorized(true);
      } catch (error) {
        setIsAuthorized(false);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          
          {!isAuthorized && (
            <>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </>
          )}

          
          {isAuthorized && (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/job/getall" element={<Jobs />} />
              <Route path="/job/:id" element={<JobDetails />} />
              <Route path="/application/:id" element={<Application />} />
              <Route path="/applications/me" element={<MyApplications />} />
              <Route path="/job/post" element={<PostJob />} />
              <Route path="/job/me" element={<MyJobs />} />
            </>
          )}

          
          <Route
            path="*"
            element={
              isAuthorized ? <NotFound /> : <Navigate to="/login" replace />
            }
          />
        </Routes>
        <Footer />
        <Toaster />
      </BrowserRouter>
    </>
  );
};

export default App;
