import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../CssComponents/home.css";
import Footer from "./Footer";
import SecHeader from "./SecHeader";
import FixHeader from "./Header/FixHeader";
import GradeUp from "../assets/GradeUp.png";
import CodeAI from "../assets/CodeAI.png";
import AcadMe from "../assets/AcadMe.png";
import ConvoX from "../assets/ConvoX.jpg";
import DayLog from "../assets/DayLog.jpg";

function Home() {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 100);
  }, []);

  const showPopup = () => {
    setPopupVisible(true);
  };
  const hidePopup = () => {
    setPopupVisible(false);
  };

  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    const hasSeen = localStorage.getItem("hasSeenInstructions");
    if (!hasSeen) {
      setShowInstructions(true);
    }
  }, []);

  const handleOkay = () => {
    localStorage.setItem("hasSeenInstructions", "true");
    setShowInstructions(false);
  };

  return (
    <>
      {showInstructions && (
        <div className="loginPop">
          <div className="loginPop2nd">
            <h1>Sign In Successful...!</h1>
            <ul className="list-disc ml-6 text-sm text-gray-700">
              <li>Good job! You have successfully signed in.</li>
              <li>
                Now, explore the available components in the application and
                click on the one you want to use.
              </li>
              <li>
                Fill in the required details to proceed with that component.
              </li>
            </ul>
            <button onClick={handleOkay}>Okay</button>
          </div>
        </div>
      )}
      <div className={`home-container ${isLoaded ? "visible" : ""}`}>
        <FixHeader />
        <div className="middlePage">
          <div className="secHeaderM">
            <SecHeader />
          </div>
          <div className="ownPage">
            <div className="googleSearchP">
              <div className="googleSearch">
                <form
                  action="https://www.google.com/search"
                  method="GET"
                  className="google"
                >
                  <input
                    type="text"
                    name="q"
                    placeholder="Google"
                    className="input"
                    style={{ border: "none", color: "snow" }}
                  />
                </form>
              </div>
            </div>
            <div className="ownUpper">
              <div
                className={`divP fade-in`}
                style={{ animationDelay: "0.3s" }}
              >
                <div className="vsCode">
                  <div className="imgDiv">
                    <img src={CodeAI} alt="CodeAI" className="codeAiImg" />
                  </div>
                  <Link to="/codeAi">
                    <button>CodeAI</button>
                  </Link>
                </div>
              </div>
              <div
                className={`divP fade-in`}
                style={{ animationDelay: "0.4s" }}
              >
                {" "}
                <div className="vsCode">
                  <div className="imgDiv">
                    <img src={AcadMe} alt="CodeAI" className="codeAiImg" />
                  </div>
                  <Link to="/acadMe">
                    <button>AcadMe</button>
                  </Link>
                </div>
              </div>
              <div
                className={`divP fade-in`}
                style={{ animationDelay: "0.5s" }}
              >
                {" "}
                <div className="vsCode">
                  <div className="imgDiv">
                    <img src={GradeUp} alt="CodeAI" className="codeAiImg" />
                  </div>
                  <Link to="/gardeUp">
                    <button>GradeUp</button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="ownUpper">
              <div
                className={`divP fade-in`}
                style={{ animationDelay: "0.6s" }}
              >
                {" "}
                <div className="vsCode">
                  <div className="imgDiv">
                    <img src={ConvoX} alt="CodeAI" className="codeAiImg" />
                  </div>
                  <Link to="/conVox">
                    <button>ConvoX</button>
                  </Link>
                </div>
              </div>

              <div
                className={`divP fade-in`}
                style={{ animationDelay: "0.7s" }}
              >
                {" "}
                <div className="vsCode">
                  <div className="imgDiv">
                    <img src={DayLog} alt="CodeAI" className="codeAiImg" />
                  </div>
                  <Link to="/dayLog">
                    <button>DayLog</button>
                  </Link>
                </div>
              </div>
              <div
                className={`divP fade-in`}
                style={{ animationDelay: "0.5s" }}
              >
                <div
                  className="vsCode"
                  style={{ background: "none", animation: "none" }}
                >
                  <div className="plus" onClick={showPopup}>
                    <p>+</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="pageFooter">
            <Footer />
          </div>
        </div>

        {isPopupVisible && (
          <div className="popup" onClick={hidePopup}>
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
              <span className="close" onClick={hidePopup}>
                &times;
              </span>
              <p>Restricted Content...!</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
