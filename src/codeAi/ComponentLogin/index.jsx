import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://my-backend-app-snxz.onrender.com/api/auth",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        alert("Login successful");
        navigate("/Compilers");
      } else {
        console.error("No token received");
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error); 
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.left}>
          <form className={styles.form_container} onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              name="email"
              className={`${styles.input} ${styles["fade-on"]}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ fontSize: "16px", width: "70%" }}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              className={`${styles.input} ${styles["fade-on"]}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ fontSize: "16px", width: "70%" }}
            />
            <button type="submit" className={styles.green_btn}>
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
