import styles from "./StateSection.module.css";
import collapse from "../../assets/collapse.png";
import plus from "../../assets/plus.png";
import CreateTaskModal from "../Modals/CreateTaskModal/CreateTaskModal";
import TaskCard from "../TaskCard/TaskCard";
import { useState } from "react";

const StateSection = ({
  tasks,
  showAddTaskModal,
  setShowAddTaskModal
}) => {

  const [checklistVisibility, setChecklistVisibility] = useState({});

  const toggleChecklistVisibility = (taskId) => {
    setChecklistVisibility((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
  };

  const collapseAllChecklists = () => {
    setChecklistVisibility({});
  };

  return (
    <div className={styles.section_container}>
      <div className={styles.tasks_container}>
        <div className={styles.task_column}>
          <span className={styles.block_top}>
            <h3>Backlog</h3>
            <img
              src={collapse}
              alt="collapse_icon"
              className={styles.collapse_icon}
              onClick={collapseAllChecklists}
            />
          </span>
          {
            tasks.filter(task => task.state === 'backlog').map(task => (
              <TaskCard
                key={task._id}
                task={task}
                isChecklistVisible={checklistVisibility[task._id]}
                toggleChecklistVisibility={toggleChecklistVisibility}
              />
            ))
          }
        </div>
        <div className={styles.task_column}>
          <span className={styles.block_top}>
            <h3>To do</h3>
            <span className={styles.block_top_right}>
              <img
                src={plus}
                alt="plus_icon"
                className={styles.plus_icon}
                onClick={() => setShowAddTaskModal(true)}
              />
              <img
                src={collapse}
                alt="collapse_icon"
                className={styles.collapse_icon}
                onClick={collapseAllChecklists}
              />
            </span>
          </span>
            {
            tasks.filter(task => task.state === 'todo').map(task => (
              <TaskCard
                key={task._id}
                task={task}
                isChecklistVisible={checklistVisibility[task._id]}
                toggleChecklistVisibility={toggleChecklistVisibility}
              />
            ))
          }
        </div>
        <div className={styles.task_column}>
          <span className={styles.block_top}>
            <h3>In progress</h3>
            <img
              src={collapse}
              alt="collapse_icon"
              className={styles.collapse_icon}
              onClick={collapseAllChecklists}
            />
          </span>
          {
            tasks.filter(task => task.state === 'in-progress').map(task => (
              <TaskCard
                key={task._id}
                task={task}
                isChecklistVisible={checklistVisibility[task._id]}
                toggleChecklistVisibility={toggleChecklistVisibility}
              />
            ))
          }
        </div>
        <div className={styles.task_column}>
          <span className={styles.block_top}>
            <h3>Done</h3>
            <img
              src={collapse}
              alt="collapse_icon"
              className={styles.collapse_icon}
              onClick={collapseAllChecklists}
            />
          </span>
          {
            tasks.filter(task => task.state === 'done').map(task => (
              <TaskCard
                key={task._id}
                task={task}
                isChecklistVisible={checklistVisibility[task._id]}
                toggleChecklistVisibility={toggleChecklistVisibility}
              />
            ))
          }
        </div>
      </div>
      {showAddTaskModal && (
        <CreateTaskModal
          onClose={() => setShowAddTaskModal(false)}
        />
      )}
    </div>
  );
};

export default StateSection;
