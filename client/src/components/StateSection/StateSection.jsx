import styles from "./StateSection.module.css";
import collapse from "../../assets/collapse.png";
import plus from "../../assets/plus.png";

const StateSection = () => {
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
            />
          </span>
        </div>
        <div className={styles.task_column}>
          <span className={styles.block_top}>
            <h3>To do</h3>
            <span className={styles.block_top_right}>
              <img src={plus} alt="plus_icon" className={styles.plus_icon} />
              <img
                src={collapse}
                alt="collapse_icon"
                className={styles.collapse_icon}
              />
            </span>
          </span>
        </div>
        <div className={styles.task_column}>
          <span className={styles.block_top}>
            <h3>In progress</h3>
            <img
              src={collapse}
              alt="collapse_icon"
              className={styles.collapse_icon}
            />
          </span>
        </div>
        <div className={styles.task_column}>
          <span className={styles.block_top}>
            <h3>Done</h3>
            <img
              src={collapse}
              alt="collapse_icon"
              className={styles.collapse_icon}
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export default StateSection;
