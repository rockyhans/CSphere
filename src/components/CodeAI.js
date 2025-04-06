import React from "react";
import Login from "../ComponentLogin";
import "./codeAI.css";
import { Helmet } from "react-helmet-async";

function CodeAI() {
  return (
    <>
      <Helmet>
        <title>CodeAI</title>
      </Helmet>
      <div className="codeAi">
        <div className="codeAILogB">
          <div className="codeAILog">
            <Login />
          </div>
        </div>
      </div>
    </>
  );
}

export default CodeAI;
