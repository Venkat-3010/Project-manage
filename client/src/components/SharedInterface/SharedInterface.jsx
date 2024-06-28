import { useParams } from "react-router-dom";
import { getTaskById } from "../../api/taskApi";
import { AppContext } from "../../context/AppContext";
import logo from "../../assets/logo.png";
import styles from "./SharedInterface.module.css";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Skeleton } from "react-content-placeholder";

const dateSuffix = (day) => {
  if (day > 3 && day < 21) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

const formatDate = (date) => {
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  const ordinalSuffix = dateSuffix(day);
  return `${month} ${day}${ordinalSuffix}`;
};

const SharedInterface = () => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("low");
  const [dueDate, setDueDate] = useState("");
  const [checklist, setChecklist] = useState([]);
  const { loading, setLoading } = useContext(AppContext);
  const { id } = useParams();

  const fetchTaskById = async () => {
    try {
      setLoading(true);
      const task = await getTaskById(id);
      // console.log(task);
      setTitle(task.title);
      setPriority(task.priority);
      setDueDate(new Date(task.dueDate));
      setChecklist(task.checklist);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.warn("Error fetching task", {
        theme: 'dark',
        position: 'bottom-right'
      });
      setLoading(false);
    }
  };

  const formatPriorityText = (priority) => {
    switch (priority) {
      case "high":
        return "HIGH PRIORITY";
      case "moderate":
        return "MODERATE PRIORITY";
      case "low":
        return "LOW PRIORITY";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "#FF2473";
      case "moderate":
        return "#18B0FF";
      case "low":
        return "#63C05B";
      default:
        return "#000";
    }
  };

  useEffect(() => {
    fetchTaskById();
  }, []);

  return (
    <div className={styles.shared_container}>
      <b className={styles.logo_text}>
        <img src={logo} alt="logo" className={styles.logo} /> Pro Manage
      </b>
      <Skeleton loading={loading}>
        <div className={styles.shared_content}>
          <div className={styles.task_priority}>
            <div
              className={styles.circle}
              style={{ backgroundColor: getPriorityColor(priority) }}
            ></div>
            <p className={styles.priority_text}>
              {formatPriorityText(priority)}
            </p>
          </div>
          <div className={styles.tooltip_title}>
            <h3 className={styles.card_title}>{title}</h3>
            <span className={styles.tooltiptext}>{title}</span>
          </div>
          <div className={styles.checklist}>
            <span className={styles.checklist_title}>
              <label htmlFor="">
                Checklist ({checklist.filter((item) => item.completed).length}/
                {checklist.length})
              </label>
            </span>
            {checklist.map((item, index) => (
              <div key={index} className={styles.checklist_item}>
                <input
                  type="checkbox"
                  checked={item.completed}
                  className={styles.checklist_checkbox}
                  readOnly
                />
                <p>{item.text}</p>
              </div>
            ))}
          </div>
          {dueDate && (
            <div className={styles.date_container}>
              <p className={styles.date_text}>Due Date</p>
              <div className={styles.due_date}>
                {formatDate(new Date(dueDate))}
              </div>
            </div>
          )}
        </div>
      </Skeleton>
    </div>
  );
};

export default SharedInterface;
