import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { updateUserProfile } from "../../api/userApi";
import Loader from "../Loader/Loader";
import email_icon from "../../assets/email_icon.png";
import lock from "../../assets/lock_icon.png";
import profile from "../../assets/profile_icon.png";
import eye from "../../assets/eye_icon.png";
import styles from "./Settings.module.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const { loading, setLoading } = useContext(AppContext);
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [newPasswordVisibility, setNewPasswordVisibility] = useState(false);
  const navigate = useNavigate();

  const handleUpdateProfile = async (event) => {
    event.preventDefault();
    setLoading(true);
    const userData = { name, email, password, oldPassword };
    const response = await updateUserProfile(userData);
    setLoading(false);
    if (response) {
      toast.success("Profile updated successfully", {
        position: "bottom-right",
        theme: "dark",
      });
    } else {
      toast.error("Failed to update profile", {
        position: "bottom-right",
        theme: "dark",
      });
    }
  };

  const handlePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const handleNewPasswordVisibility = () => {
    setNewPasswordVisibility(!newPasswordVisibility);
  };

  if (loading) {
    return <Loader />;
  }

  if(!localStorage.getItem('token')){
    navigate('/');
  }

  return (
    <div className={styles.settings_container}>
      <b className={styles.head_text}>Settings</b>
      <form className={styles.form} onSubmit={handleUpdateProfile}>
        <div className={styles.input_shell}>
          <img src={profile} alt="" className={styles.icon} />
          <input
            className={styles.input}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />
        </div>
        <div className={styles.input_shell}>
          <img src={email_icon} alt="" className={styles.icon} />
          <input
            className={styles.input}
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Update Email"
          />
        </div>
        <div className={styles.input_shell}>
          <img src={lock} alt="" className={styles.icon} />
          <input
            className={styles.input}
            type={passwordVisibility ? "text" : "password"}
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            placeholder="Old Password"
          />
          <img
            src={eye}
            alt=""
            className={`${styles.eye_icon} ${
              passwordVisibility ? styles.eye_icon_selected : ""
            }`}
            onClick={handlePasswordVisibility}
          />
        </div>
        <div className={styles.input_shell}>
          <img src={lock} alt="" className={styles.icon} />
          <input
            className={styles.input}
            type={newPasswordVisibility ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New Password"
          />
          <img
            src={eye}
            alt=""
            className={`${styles.eye_icon} ${
              newPasswordVisibility ? styles.eye_icon_selected : ""
            }`}
            onClick={handleNewPasswordVisibility}
          />
        </div>
        <button className={styles.authBtn} type="submit">
          Update
        </button>
      </form>
    </div>
  );
};

export default Settings;
