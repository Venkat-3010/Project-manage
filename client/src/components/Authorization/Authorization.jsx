import {  useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser, registerUser } from "../../api/userApi";
import styles from "./Authorization.module.css";
import email from "../../assets/email_icon.png";
import lock from "../../assets/lock_icon.png";
import profile from "../../assets/profile_icon.png";
import eye from "../../assets/eye_icon.png";
import bg from "../../assets/bg_image.png";
import { AppContext } from "../../context/AppContext";

const SideBg = () => {
  return (
    <div className={styles.bg_container}>
      <img src={bg} alt="bg" className={styles.side_img} />
      <div className={styles.bg_text}>
        <p className={styles.p_text}>Welcome aboard my friend </p>
        <span>just a couple of clicks and we start</span>
      </div>
    </div>
  );
};

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const {fetchData} = useContext(AppContext)

  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [error, setError] = useState({});

  const validateForm = () => {
    let errors = {};

    if (!data.email) {
      errors.email = "Email is required";
    } else if (!data.email.includes("@")) {
      errors.email = "Please enter a valid email";
    }

    if (!data.password) {
      errors.password = "Password is required";
    } else if (data.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    return errors;
  };

  const handleData = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handlePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setError(errors);
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
      fetchData();
    }
  };

  return (
    <div className={styles.main_container}>
      <SideBg />
      <div className={styles.login_container}>
        <section className={styles.login_section}>
          <h3 className={styles.login_title}>Login</h3>
          <form onSubmit={handleSubmit} className={styles.login_form}>
            <div className={`${styles.email_input} ${styles.input_shell}`}>
              <div
                className={styles.input_box}
                style={{ border: error?.email && "1.5px solid #D60000" }}
              >
                <label htmlFor="email" className={styles.email_label}>
                  <img src={email} alt="email" />
                </label>
                <input
                  type="text"
                  placeholder="Email"
                  name="email"
                  id="email"
                  onChange={handleData}
                />
              </div>
              {error.email && (
                <small className={styles.errorMessage}>{error.email}</small>
              )}
            </div>
            <div className={`${styles.password_input} ${styles.input_shell}`}>
              <div
                className={styles.input_box}
                style={{ border: error?.password && "1.5px solid #D60000" }}
              >
                <label htmlFor="password" className={styles.email_label}>
                  <img src={lock} alt="lock" />
                </label>
                <input
                  type={passwordVisibility ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  id="password"
                  onChange={handleData}
                />
                <img
                  src={eye}
                  className={`${styles.eye_icon} ${
                    passwordVisibility ? styles.eye_icon_selected : ""
                  }`}
                  alt="eye"
                  onClick={handlePasswordVisibility}
                />
              </div>
              {error.password && (
                <small className={styles.errorMessage}>{error.password}</small>
              )}
            </div>
            <button className={styles.authBtn} type="submit">
              Log in
            </button>
          </form>
          <p className={styles.p_text}>Have no Account yet?</p>
          <Link
            to="/register"
            className={`${styles.authBtn} ${styles.btn_outline}`}
          >
            Register
          </Link>
        </section>
      </div>
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

  const [error, setError] = useState({});

  const validateForm = () => {
    let errors = {};

    if (!data.name) {
      errors.name = "Name is required";
    } else if (data.name.length < 3) {
      errors.name = "Name must be at least 3 characters long";
    }

    if (!data.email) {
      errors.email = "Email is required";
    } else if (!data.email.includes("@")) {
      errors.email = "Please enter a valid email";
    }

    if (!data.password) {
      errors.password = "Password is required";
    } else if (data.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    if (data.password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    return errors;
  };

  const handleData = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] =
    useState(false);

  const handleConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handlePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const handleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisibility(!confirmPasswordVisibility);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setError(errors);
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
      toast.success("Registered successfully", {
        position: "bottom-right",
        theme: "dark",
      });

      navigate("/");
    }
  };

  return (
    <div className={styles.main_container}>
      <SideBg />
      <div className={styles.register_container}>
        <section className={styles.register_section}>
          <h3 className={styles.register_title}>Register</h3>
          <form className={styles.register_form} onSubmit={handleSubmit}>
            <div className={`${styles.name_input} ${styles.input_shell}`}>
              <div className={styles.input_box} style={{ border: error?.name && "1.5px solid #D60000" }}>
                <label htmlFor="name" className={styles.name_label}>
                  <img src={profile} alt="profile_icon" />
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  id="name"
                  onChange={handleData}
                />
              </div>
              {error.name && (
                <small className={styles.errorMessage}>{error.name}</small>
              )}
            </div>
            <div className={`${styles.email_input} ${styles.input_shell}`}>
              <div className={styles.input_box} style={{ border: error?.email && "1.5px solid #D60000" }}>
                <label htmlFor="email" className={styles.email_label}>
                  <img src={email} alt="email" />
                </label>
                <input
                  type="text"
                  placeholder="Email"
                  name="email"
                  id="email"
                  onChange={handleData}
                />
              </div>
              {error.email && (
                <small className={styles.errorMessage}>{error.email}</small>
              )}
            </div>
            <div className={`${styles.password_input} ${styles.input_shell}`}>
              <div className={styles.input_box} style={{ border: error?.password && "1.5px solid #D60000" }}>
                <label htmlFor="password" className={styles.email_label}>
                  <img src={lock} alt="lock" />
                </label>
                <input
                  type={passwordVisibility ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  id="password"
                  onChange={handleData}
                />
                <img
                  src={eye}
                  className={`${styles.eye_icon} ${
                    passwordVisibility ? styles.eye_icon_selected : ""
                  }`}
                  alt="eye"
                  onClick={handlePasswordVisibility}
                />
              </div>
              {error.password && (
                <small className={styles.errorMessage}>{error.password}</small>
              )}
            </div>
            <div
              className={`${styles.confirmPassword_input} ${styles.input_shell}`}
            >
              <div className={styles.input_box} style={{ border: error?.confirmPassword && "1.5px solid #D60000" }}>
                <label
                  htmlFor="confirmPassword"
                  className={styles.confirmPassword_label}
                >
                  <img src={lock} alt="lock" />
                </label>
                <input
                  type={confirmPasswordVisibility ? "text" : "password"}
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  id="confirmPassword"
                  onChange={handleConfirmPassword}
                />
                <img
                  src={eye}
                  className={`${styles.eye_icon} ${
                    confirmPasswordVisibility ? styles.eye_icon_selected : ""
                  }`}
                  alt="eye"
                  onClick={handleConfirmPasswordVisibility}
                />
              </div>
              {error.confirmPassword && (
                <small className={styles.errorMessage}>{error.confirmPassword}</small>
              )}
            </div>
            <button className={styles.authBtn} type="submit">
              Register
            </button>
          </form>
          <p className={styles.p_text}>Have an Account?</p>
          <Link to="/" className={`${styles.authBtn} ${styles.btn_outline}`}>
            Log In
          </Link>
        </section>
      </div>
    </div>
  );
};

export { Login, Register };
