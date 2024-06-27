import { useContext, useState } from "react";
import styles from "./TaskCard.module.css";
import dropdown from "../../assets/drop_down.png";
import downArrow from "../../assets/down-arrow.png";
import upArrow from "../../assets/up_arrow.png";
import { AppContext } from "../../context/AppContext";
import DeleteModal from "../Modals/DeleteModal/DeleteModal";
import CreateTaskModal from "../Modals/CreateTaskModal/CreateTaskModal";
import { updateTaskState } from "../../api/taskApi";
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

const HeroModal = ({ onEdit, onShare, task, fetchTasks }) => {
  const [deleteModal, setDeleteModal] = useState(false);

  return (
    <div className={styles.modal_container}>
      <div className={styles.btn} onClick={onEdit}>
        Edit
      </div>
      <div className={styles.btn} onClick={onShare}>
        Share
      </div>
      <div
        className={styles.btn}
        onClick={() => setDeleteModal(true)}
        style={{ color: "#CF3636" }}
      >
        Delete
      </div>
      {deleteModal && (
        <DeleteModal
          task={task}
          fetchTasks={fetchTasks}
          onClose={() => setDeleteModal(false)}
        />
      )}
    </div>
  );
};

const TaskCard = ({ task, isChecklistVisible, toggleChecklistVisibility }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [taskState, setTaskState] = useState(task.state);
  const states = ["backlog", "todo", "in-progress", "done"];
  const otherStates = states.filter((state) => state !== taskState);
  const { fetchTasks, loading, setLoading, fetchAnalytics } = useContext(AppContext);

  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };

  const handleEdit = () => {
    setShowEditModal(true);
    setDropdownVisible(false);
  };

  const handleShare = () => {
    // console.log("url:", window.location.origin,"id", task._id)
    setDropdownVisible(false);
    const link = `${window.location.origin}/${task._id}`;
    try {
      navigator.clipboard.writeText(link);
      toast.success("Link copied!", {
        position: "top-right",
        theme: "light",
      });
    } catch (error) {
      console.log(error);
      toast.error("Failed to copy link", {
        position: "top-right",
        theme: "light",
      });
    }
  };

  const handleChangeState = async (newState) => {
    setLoading(true);
    await updateTaskState(task._id, newState);
    setTaskState(newState);
    fetchTasks();
    fetchAnalytics()
    toast.success("Task state updated", {
      position: "bottom-right",
      theme: "dark",
    });
    // setLoading(false)
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

  const isPastDueDate = (dueDate) => {
    const today = new Date();
    return new Date(dueDate) < today;
  };

  return (
    <Skeleton loading={loading}>
      <div className={styles.task_card}>
        <div className={styles.card_top}>
          <div className={styles.task_priority}>
            <div
              className={styles.circle}
              style={{ backgroundColor: getPriorityColor(task.priority) }}
            ></div>
            <p className={styles.priority_text}>
              {formatPriorityText(task.priority)}
            </p>
            {task.assignedTo && (
              <div className={styles.tooltip}>
                <span className={styles.tooltiptext}>{task.assignedTo}</span>
                <span className={styles.assign_icon}>
                  {task.assignedTo.substring(0, 2).toUpperCase()}
                </span>
              </div>
            )}
          </div>
          <div className={styles.top_right}>
            <img
              src={dropdown}
              alt="menu icon"
              className={styles.menu_icon}
              onClick={() => setDropdownVisible(true)}
            />
            <div className={styles.hero_modal} onMouseLeave={handleMouseLeave}>
              {dropdownVisible && (
                <HeroModal
                  task={task}
                  fetchTasks={fetchTasks}
                  onEdit={handleEdit}
                  onShare={handleShare}
                />
              )}
            </div>
          </div>
        </div>
        <div className={styles.tooltip_title}>
          <h3 className={styles.card_title}>{task.title}</h3>
          <span className={styles.tooltiptext}>{task.title}</span>
        </div>
        <div className={styles.checklist}>
          <span className={styles.checklist_title}>
            <label htmlFor="">
              Checklist (
              {task.checklist.filter((item) => item.completed).length}/
              {task.checklist.length})
            </label>
            <img
              src={isChecklistVisible ? upArrow : downArrow}
              alt=""
              onClick={() => toggleChecklistVisibility(task._id)}
              className={styles.arrow_img}
            />
          </span>
          {isChecklistVisible &&
            task.checklist.map((item, index) => (
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
        <div className={styles.card_bottom}>
          {task.dueDate && (
            <div
              className={styles.due_date}
              style={{
                color: isPastDueDate(task.dueDate) ? "#ffffff" : "#000",
                backgroundColor: isPastDueDate(task.dueDate)
                  ? "#CF3636"
                  : "#DBDBDB",
              }}
            >
              {formatDate(new Date(task.dueDate))}
            </div>
          )}
          <div className={styles.btn_grp}>
            {otherStates.map((state) => (
              <button
                key={state}
                onClick={() => handleChangeState(state)}
                className={styles.state_btn}
              >
                {state.charAt(0).toUpperCase() + state.slice(1)}
              </button>
            ))}
          </div>
        </div>
        {showEditModal && (
          <CreateTaskModal
            onClose={() => setShowEditModal(false)}
            task={task}
          />
        )}
      </div>
    </Skeleton>
  );
};

export default TaskCard;
