import React from "react";
import "../CssComponents/header.css";
import userlogo from "../assets/userImg.jpg";
import { Link } from "react-router-dom";

const Header = ({ showLogin, error, msg, errorL }) => {
  return (
    <div>
      <div className="header">
        <div className="headerL display">
          <h1>{showLogin ? "Sign In" : "Sign Up"}</h1>
        </div>
        <div className="gggg">
          {error && !showLogin && !msg && (
            <div className="error_msg fade-in">{error}</div>
          )}
          {msg && !showLogin && (
            <div className="success_msg fade-in">{msg}</div>
          )}
          {errorL && showLogin && (
            <div className="error_msg fade-in">{errorL}</div>
          )}
        </div>

        <div className="headerR display">
          <Link to="/" className="link">
            <button className="home"> Go to Home</button>
          </Link>
          <div className="headerR1">
            <Link to="/inst" className="link">
              <i>Instructions</i>.....
            </Link>
          </div>
          <div className="logoU">
            <img alt="logo" src={userlogo} className="logoImgU" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
