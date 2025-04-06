import React from "react";
import Login from "../ComponentLogin";
import "./codeAI.css";
import { Helmet } from "react-helmet-async";

function ConVox() {
  return (
    <>
      <Helmet>
        <title>ConVox</title>
      </Helmet>
      <div className="convox">
        <div className="convoxLogB">
          <div className="codeAILog">
            <Login />
          </div>
        </div>
      </div>
    </>
  );
}

export default ConVox;
