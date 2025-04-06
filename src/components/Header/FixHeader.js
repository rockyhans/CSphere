import React from "react";
import styles from "./styles.module.css";
import logo from "../../assets/appLogo.jpg";
import userlogo from "../../assets/userImg.jpg";
import { Link } from "react-router-dom";

function FixHeader() {
  return (
    <> 
      <div className={styles.header}>
        <div className={`${styles.headerL} ${styles.display}`}>
          <div className={styles.logo}>
            <img alt="logo" src={logo} className={styles.logoImg} />
          </div>
          <div className={styles.covert}>
            <h1>CSphere</h1>
          </div>
        </div>
        <div className={`${styles.headerR} ${styles.display}`}>
          <div className={styles.headerR1}>
            <Link to="/Ragister" className={styles.link}>
              <i>Create Profile</i>.....
            </Link>
          </div>
          <div className={styles.logoU}>
            <img alt="logo" src={userlogo} className={styles.logoImgU} />
          </div>
        </div>
      </div>
    </>
  );
}

export default FixHeader;
