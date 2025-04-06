import React from "react";
import Login from "../ComponentLogin";
import "./codeAI.css";
import { Helmet } from "react-helmet-async";

function GradeUp() {
  return (
    <>
      <Helmet>
        <title>GradeUp</title>
      </Helmet>
      <div className="gradeUp">
        <div className="gradeUpLogB">
          <div className="codeAILog">
            <Login />
          </div>
        </div>
      </div>
    </>
  );
}

export default GradeUp;
