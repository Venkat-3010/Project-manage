import styles from "./NavBar.module.css";
import logo from "../../assets/logo.png";
import board from "../../assets/board.png";
import analytics from "../../assets/analytics.png";
import settings from "../../assets/settings.png";
import logout from "../../assets/logout.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("token");
    toast.info("Logged out", {
      position: "bottom-right",
      theme: "dark",
    });
    navigate("/");
  };

  return (
    <aside className={styles.navBar_container}>
      <div className={styles.top}>
        <div className={styles.logo}>
          <img src={logo} alt="logo" className={styles.img} />
          <h1 className={styles.logo_text}>Pro Manage</h1>
        </div>
        <div className={styles.navBar_items}>
          <Link to="/board" className={`${styles.item} ${location.pathname === '/board' ? styles.selected : ''}`}>
            <img src={board} alt="" className={styles.img} />
            <h3 className={styles.text}>Board</h3>
          </Link>
          <Link to="/analytics" className={`${styles.item} ${location.pathname === '/analytics' ? styles.selected : ''}`}>
            <img src={analytics} alt="" className={styles.img} />
            <h3 className={styles.text}>Analytics</h3>
          </Link>
          <Link to="/settings" className={`${styles.item} ${location.pathname === '/settings' ? styles.selected : ''}`}>
            <img src={settings} alt="" className={styles.img} />
            <h3 className={styles.text}>Settings</h3>
          </Link>
        </div>
      </div>
      <div className={styles.logout}>
        <img src={logout} alt="logout" className={styles.img} />
        <h3 onClick={handleLogOut} className={styles.text}>Logout</h3>
      </div>
    </aside>
  );
};

export default NavBar;
