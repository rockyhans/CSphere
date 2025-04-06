import React from "react";
import Login from "../ComponentLogin";
import "./codeAI.css";
import { Helmet } from "react-helmet-async";

function DayLog() {
  return (
    <>
      <Helmet>
        <title>DayLog</title>
      </Helmet>
      <div className="daylog">
        <div className="daylogLogB">
          <div className="codeAILog">
            <Login />
          </div>
        </div>
      </div>
    </>
  );
}

export default DayLog;
