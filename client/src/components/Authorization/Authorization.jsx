import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser, registerUser } from "../../api/userApi";
import styles from "./Authorization.module.css";
import email from "../../assets/email_icon.png";
import lock from "../../assets/lock_icon.png";
import profile from "../../assets/profile_icon.png";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleData = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!data.email || !data.password) {
      toast.warn("Please fill in all required fields", {
        position: "bottom-right",
        theme: "dark",
      });
      return;
    }

    const result = await loginUser(data);
    if (result) {
      toast.success("Logged in successfully", {
        position: "bottom-right",
        theme: "dark",
      });

      navigate("/board");
    }
  };

  return (
    <div className={styles.login_container}>
      <section className={styles.login_section}>
        <h3 className={styles.login_title}>Login</h3>
        <form onSubmit={handleSubmit}>
          <div className={styles.email_input}>
            <div className={styles.input_box}>
              <label htmlFor="email" className={styles.email_label}>
                <img src={email} alt="email" />
              </label>
              <input
                type="text"
                placeholder="Email"
                name="email"
                onChange={handleData}
              />
            </div>
          </div>
          <div className={styles.password_input}>
            <div className={styles.input_box}>
              <label htmlFor="password" className={styles.email_label}>
                <img src={lock} alt="lock" />
              </label>
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleData}
              />
            </div>
          </div>
          <button className="authBtn" type="submit">
            Log in
          </button>
        </form>
        <p>Have no Account yet?</p>
        <a
          href="/register"
          type="submit"
          className={`${styles.authBtn} ${styles.btn_outline}`}
        >
          Register
        </a>
      </section>
    </div>
  );
};

const Register = () => {
  const navigate = useNavigate();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleData = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!data.email || !data.password || !data.name || !confirmPassword) {
      toast.warn("Please fill in all required fields", {
        position: "bottom-right",
        theme: "dark",
      });
      return;
    }

    if (!data.email.includes("@")) {
      toast.warn("Please enter a valid email", {
        position: "bottom-right",
        theme: "dark",
      });
      return;
    }

    if (data.password !== confirmPassword) {
      toast.warn("Passwords do not match", {
        position: "bottom-right",
        theme: "dark",
      });
      return;
    }

    const result = await registerUser(data);
    if (result) {
      toast.success("Logged in successfully", {
        position: "bottom-right",
        theme: "dark",
      });

      navigate("/board");
    }
  };

  return (
    <div className={styles.login_container}>
      <section className={styles.login_section}>
        <h3 className={styles.login_title}>Register</h3>
        <form onSubmit={handleSubmit}>
          <div className={styles.name_input}>
            <div className={styles.input_box}>
              <label htmlFor="name" className={styles.name_label}>
                <img src={profile} alt="profile_icon" />
              </label>
              <input
                type="text"
                placeholder="Name"
                name="name"
                onChange={handleData}
              />
            </div>
          </div>
          <div className={styles.email_input}>
            <div className={styles.input_box}>
              <label htmlFor="email" className={styles.email_label}>
                <img src={email} alt="email" />
              </label>
              <input
                type="text"
                placeholder="Email"
                name="email"
                onChange={handleData}
              />
            </div>
          </div>
          <div className={styles.confirmPassword_input}>
            <div className={styles.input_box}>
              <label htmlFor="confirmPassword" className={styles.confirmPassword_label}>
                <img src={lock} alt="lock" />
              </label>
              <input
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                onChange={handleConfirmPassword}
              />
            </div>
          </div>
          <div className={styles.password_input}>
            <div className={styles.input_box}>
              <label htmlFor="password" className={styles.email_label}>
                <img src={lock} alt="lock" />
              </label>
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleData}
              />
            </div>
          </div>
          <button className="authBtn" type="submit">
            Register
          </button>
        </form>
        <p>Have an Account?</p>
        <a
          href="/"
          type="submit"
          className={`${styles.authBtn} ${styles.btn_outline}`}
        >
          Log In
        </a>
      </section>
    </div>
  );
};

export {Login, Register};