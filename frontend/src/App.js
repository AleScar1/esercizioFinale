import React, { useEffect } from "react";
import NavBar from "./components/navbar/BlogNavbar";
import Footer from "./components/footer/Footer";
import Home from "./views/home/Home";
import Blog from "./views/blog/Blog";
import NewBlogPost from "./views/new/New";
import Upload from "./views/upload/Upload";
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const fetchAuthors = async () => {
    try {
      const res = await fetch(process.env.REACT_APP_APIURL + "/authors", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.error("Errore nel fetch degli autori:", error);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("accessToken");
    if (token) {
      localStorage.setItem("accessToken", token);
      window.history.replaceState({}, document.title, "/");
    }

    fetchAuthors();
  }, []);

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} /> 
        <Route path="/" exact element={<Home />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/new" element={<NewBlogPost />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
