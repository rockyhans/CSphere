import React, { useState } from "react";
import axios from "axios";
import styles from "./styles.module.css";

const Login = ({ setErrorL }) => {
  const [data, setData] = useState({ email: "", password: "" });

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "https://my-backend-app-snxz.onrender.com/api/auth";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.data);
      localStorage.setItem("hasSeenInstructions", "false");
      window.location = "/";
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setErrorL(error.response.data.message);
      }
    }
  };

  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.left}>
          <form
            className={`${styles.form_container} ${styles["fade-in"]}`}
            onSubmit={handleSubmit}
          >
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
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
