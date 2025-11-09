import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import AboutPage from "./pages/AboutPage";
import { useAuthStore } from "./store/useAuthStore";
import { Loader } from "lucide-react"
import { Toaster } from "react-hot-toast"; //show toast notification
import { useThemeStore } from "./store/useThemeStore";


const App = () => {

  const OrbitLoader = () => (
  <div className="relative flex justify-center items-center h-screen w-screen">
    <div className="relative w-16 h-16">
      <div className="absolute inset-0 border-4 border-transparent border-t-primary rounded-full animate-spin"></div>
      <div className="absolute inset-2 border-4 border-transparent border-t-secondary rounded-full animate-spin-slow"></div>
      <div className="absolute inset-4 border-4 border-transparent border-t-accent rounded-full animate-spin-reverse"></div>
    </div>
  </div>
);



   const { authUser,checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
   const { theme } = useThemeStore();

   console.log({ onlineUsers });

   useEffect(() => {
    checkAuth();
   }, [checkAuth]);
   
  //  console.log({ authUser }); //It print the current logged in user Note - Remove this after development 
   
  if(isCheckingAuth && !authUser) return <OrbitLoader />;

  return (
    <div data-theme={theme}>
      <Navbar />
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to={"/login"}/>} />
        <Route path="/signup" element={!authUser ? <SignUpPage />: <Navigate to={"/"} />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to={"/"} />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to={"/login"}/>} />
      </Routes>

      <Toaster/>
    </div>
  );
};

export default App;



