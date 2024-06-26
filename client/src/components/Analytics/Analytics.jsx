import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Analytics.module.css";
import { AppContext } from "../../context/AppContext";
import Loader from "../Loader/Loader";

const Analytics = () => {
  const navigate = useNavigate();
  const { analytics, loading } = useContext(AppContext);

  if (!localStorage.getItem("token")) {
    navigate("/");
  }

  if (loading) {
    return <Loader />;
  }

  const status = analytics?.status || {
    backlog: 0,
    todo: 0,
    inProgress: 0,
    done: 0,
  };
  const priority = analytics?.priority || { low: 0, medium: 0, high: 0 };
  const dueDate = analytics?.dueDate || 0;

  return (
    <div className={styles.analytics_container}>
      <b className={styles.title_contaier}>Analytics</b>
      <div className={styles.analytics_box}>
        <div className={styles.left_box}>
          <p className={styles.label}>
            <div className={styles.text_space}>
              <div className={styles.circle}></div> Backlog:
            </div>
            <b className={styles.number}>{status.backlog}</b>
          </p>
          <p className={styles.label}>
            <div className={styles.text_space}>
              <div className={styles.circle}></div> To-do Tasks:
            </div>
            <b className={styles.number}>{status.todo}</b>
          </p>
          <p className={styles.label}>
            <div className={styles.text_space}>
              <div className={styles.circle}></div> In-Progress Tasks:
            </div>
            <b className={styles.number}>{status.inProgress}</b>
          </p>
          <p className={styles.label}>
            <div className={styles.text_space}>
              <div className={styles.circle}></div> Completed Tasks:
            </div>
            <b className={styles.number}>{status.done}</b>
          </p>
        </div>
        <div className={styles.right_box}>
          <p className={styles.label}>
            <div className={styles.text_space}>
              <div className={styles.circle}></div> Low:
            </div>
            <b className={styles.number}>{priority.low}</b>
          </p>
          <p className={styles.label}>
            <div className={styles.text_space}>
              <div className={styles.circle}></div> Moderate:
            </div>
            <b className={styles.number}>{priority.medium}</b>
          </p>
          <p className={styles.label}>
            <div className={styles.text_space}>
              <div className={styles.circle}></div> High:
            </div>
            <b className={styles.number}>{priority.high}</b>
          </p>
          <p className={styles.label}>
            <div className={styles.text_space}>
              <div className={styles.circle}></div> Due Date Tasks:
            </div>
            <b className={styles.number}>{dueDate}</b>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
