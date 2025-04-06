import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="notFound">
      <div className="not-found-container">
        <h1 className="not-found-title">Page Not Found.....!</h1>
        <p className="not-found-text">
          This page is temporary unavailable, <br />
          Please check back later.{" "}
          <Link to="/" style={{ color: "grey" }}>
            <i>Go to Home</i>.....
          </Link>
        </p>
        <div className="gear-animation">
          <div className="gear"></div>
          <div className="gear"></div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
