import React, { useState } from "react";
import "../CssComponents/secHeader.css";
import { Link, useNavigate } from "react-router-dom";
import "../CssComponents/home.css";

function SecHeader() {
  const [bgColor, setBgColor] = useState("");
  const [showText, setShowText] = useState(false);

  const navigate = useNavigate();
  const goToAbout = () => {
    navigate("/");
  };

  const handleClick = () => {
    setShowText(true);
    setBgColor("rgba(62, 246, 237, 0.89)");

    setTimeout(() => {
      setShowText(false);
      setBgColor("");
    }, 3000);
  };

  return (
    <>
      <div className="secHeader" style={{ backgroundColor: bgColor }}>
        <div className="secHeaderL">
          <Link
            to="/Instructions"
            className="link"
            style={{ textDecoration: "none" }}
          >
            <i>Instructions about this Application</i>.....
          </Link>
        </div>
        <div className="diappearText">
          {showText && <p>Restricted Content...Please avoid to click...!</p>}
        </div>

        <div className="secHeaderR">
          <div className="menu" onClick={goToAbout}>
            <i
              className="fa fa-gear hii"
              style={{ fontSize: "", color: "aqua" }}
              onClick={handleClick}
            ></i>
          </div>
        </div>
      </div>
    </>
  );
}

export default SecHeader;
