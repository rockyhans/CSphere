import React from "react";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
import Signup from "./components/Singup";
import Login from "./components/Login";
import EmailVerify from "./components/EmailVerify";
import Home from "./components/Home";
import Ragister from "./components/Ragister";
import About from "./components/About";
import Connections from "./components/Connections";
import Instructions from "./components/Instructions";
import CodeAI from "./components/CodeAI";
import AcadME from "./components/AcadME";
import GradeUp from "./components/GradeUp";
import ConVox from "./components/ConVox";
import DayLog from "./components/DayLog";
import NotFound from "./components/NotFound";
import Compiler from "./codeAi/components/Compilers";
import Inst from "./codeAi/components/Inst";

function App() {
  const [isAllowed, setIsAllowed] = useState(window.innerWidth >= 1000);

  useEffect(() => {
    const handleResize = () => {
      setIsAllowed(window.innerWidth >= 1000);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isAllowed) {
    return (
      <div className="nullScreen">
        <div className="block-screen">
          <h1>Screen Too Small</h1>
          <p>
            Please open this application on a device with a width of at least 11
            inches.
          </p>
          <p className="comp">🖥🖥🖥🖥🖥</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" exact element={<Signup />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/users/:id/verify/:token" element={<EmailVerify />} />
          <Route path="/Ragister" element={<Ragister />} />
          <Route path="/About" element={<About />} />
          <Route path="/Connections" element={<Connections />} />
          <Route path="/Instructions" element={<Instructions />} />
          <Route path="/codeAi" element={<CodeAI />} />
          <Route path="/acadMe" element={<AcadME />} />
          <Route path="/gardeUp" element={<GradeUp />} />
          <Route path="/conVox" element={<ConVox />} />
          <Route path="/dayLog" element={<DayLog />} />
          <Route path="/notFoundPage" element={<NotFound />} />
          <Route path="/Compilers" element={<Compiler />} />
          <Route path="/Inst" element={<Inst />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
