import React, { useEffect, useState } from "react";
import JavaCompiler from "./JavaCompiler"; // Java Compiler component
import CCompiler from "./CCompiler"; // C Compiler component
import PythonCompiler from "./PythonCompiler"; // Python Compiler component
import logo from "../../assets/CodeAI.png";
import UserImg from "./userImg.jpg";
import "./Compiler.css";
import { Link } from "react-router-dom";
import CppCompiler from "./CppCompiler";

function Compilers() {
  const [selectedCompiler, setSelectedCompiler] = useState("java");
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch(
          "https://my-backend-app-snxz.onrender.com/api/auth/getUser",
          {
            headers: {
              Authorization: token,
            },
          }
        );
        const data = await res.json();
        setUserName(`${data.firstName} ${data.lastName}`);
      } catch (err) {
        console.error("Error fetching user", err);
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      <div className="compilers">
        <div className="headerComp">
          <div className="partL">
            <img alt="CodeAi Logo" src={logo} />
            <h1>CodeAI</h1>
          </div>
          <div className="partR">
            <Link to="/" className="link">
              <button className="home"> Go to Home</button>
            </Link>
            <div>
              <i> {userName || "User"}</i>.....
            </div>
            <img alt="User Logo" src={UserImg} />
          </div>
        </div>
        <div className="compilerPage">
          <div className="ndNav">
            <div className="tab-buttons">
              <button
                className={selectedCompiler === "java" ? "active" : ""}
                onClick={() => setSelectedCompiler("java")}
              >
                <b>Java Compiler</b>
              </button>
              <button
                className={selectedCompiler === "c" ? "active" : ""}
                onClick={() => setSelectedCompiler("c")}
              >
                <b>C Compiler</b>
              </button>
              <button
                className={selectedCompiler === "cpp" ? "active" : ""}
                onClick={() => setSelectedCompiler("cpp")}
              >
                <b>C++ Compiler</b>
              </button>
              <button
                className={selectedCompiler === "python" ? "active" : ""}
                onClick={() => setSelectedCompiler("python")}
              >
                <b>Python Compiler</b>
              </button>
            </div>

            <div className="useH">
              <a href="/Inst">
                <h3>Compiler Instructions</h3>
              </a>
            </div>
          </div>

          <div className="compiler-container">
            <div
              className={
                selectedCompiler === "java" ? "compiler active" : "compiler"
              }
            >
              <JavaCompiler />
            </div>
            <div
              className={
                selectedCompiler === "c" ? "compiler active" : "compiler"
              }
            >
              <CCompiler />
            </div>
            <div
              className={
                selectedCompiler === "cpp" ? "compiler active" : "compiler"
              }
            >
              <CppCompiler />
            </div>

            <div
              className={
                selectedCompiler === "python" ? "compiler active" : "compiler"
              }
            >
              <PythonCompiler />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Compilers;
