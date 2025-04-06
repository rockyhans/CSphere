import React from "react";
import "../CssComponents/footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer">
      <div className="about">
        <Link to="/About" className="link" style={{ textDecoration: "none" }}>
          <i>About The Application</i>.....
        </Link>
      </div>
      <div className="connect">
        <Link
          to="/Connections"
          className="link"
          style={{ textDecoration: "none" }}
        >
          <i>Connect With Us</i>.....
        </Link>
      </div>
    </div>
  );
}

export default Footer;
