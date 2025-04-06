import React from "react";
import Login from "../ComponentLogin";
import "./codeAI.css";
import { Helmet } from "react-helmet-async";

function AcadME() {
  return (
    <>
      <Helmet>
        <title>AcadME</title>
      </Helmet>
      <div className="acadMe">
        <div className="acadmeLogB">
          <div className="codeAILog">
            <Login />
          </div>
        </div>
      </div>
    </>
  );
}

export default AcadME;
