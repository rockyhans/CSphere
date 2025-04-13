import React from "react";
import { useState } from "react";
import axios from "axios";
import styles from "./styles.module.css";
import Header from "../Header";
import Login from "../Login/index";

const Signup = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleChange = ({ currentTarget: input }) => { 
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "https://my-backend-app-snxz.onrender.com/api/users";
      const { data: res } = await axios.post(url, data);
      setMsg(res.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      } 
    }
  };

  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(true);

  return (
    <>
      <Header
        showLogin={showLogin}
        error={error}
        errorL={loginError}
        msg={msg}
      />

      <div className={styles.signup_container}>
        <div className={styles.components}>
          <div className={styles.ssss}>
            {!showLogin && (
              <button
                onClick={() => {
                  setShowLogin(true);
                  setShowSignup(false);
                }}
                className={styles.green_btn}
                style={{
                  width: "200px",
                  borderRadius: "10px",
                  border: "none",
                  backgroundColor: "#01323e",
                }}
              >
                Sign In
              </button>
            )}

            <div id="login-container">
              {showLogin && <Login setErrorL={setLoginError} />}
            </div>
          </div>

          <div className={styles.signup_form_container}>
            <div className={styles.right}>
              {!showSignup && (
                <button
                  onClick={() => {
                    setShowLogin(false);
                    setShowSignup(true);
                  }}
                  className={styles.green_btn}
                  style={{
                    width: "200px",
                    borderRadius: "10px",
                    border: "none",
                    backgroundColor: "#01323e",
                  }}
                >
                  Sign Up
                </button>
              )}

              <div id="login-container">
                {showSignup && (
                  <form
                    className={`${styles.form_container} ${styles["fade-in"]}`}
                    onSubmit={handleSubmit}
                  >
                    <input
                      type="text"
                      placeholder="First Name"
                      name="firstName"
                      onChange={handleChange}
                      value={data.firstName}
                      required
                      className={`${styles.input} ${styles["fade-on"]}`}
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      name="lastName"
                      onChange={handleChange}
                      value={data.lastName}
                      required
                      className={`${styles.input} ${styles["fade-on"]}`}
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      name="email"
                      onChange={handleChange}
                      value={data.email}
                      required
                      className={`${styles.input} ${styles["fade-on"]}`}
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      name="password"
                      onChange={handleChange}
                      value={data.password}
                      required
                      className={`${styles.input} ${styles["fade-on"]}`}
                    />
                    <button type="submit" className={styles.green_btn}>
                      Sing Up
                    </button>
                  </form>
                )}{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
