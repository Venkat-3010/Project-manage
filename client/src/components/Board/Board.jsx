import { useContext, useMemo, useState } from "react";
import styles from "./Board.module.css";
import people_icon from "../../assets/people.png";
import { AppContext } from "../../context/AppContext";
import StateSection from "../StateSection/StateSection";
import Loader from "../Loader/Loader";
import EmailModal from "../Modals/EmailModal/EmailModal";
import { useNavigate } from "react-router-dom";

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
  const year = date.getFullYear();
  const ordinalSuffix = dateSuffix(day);

  return `${day}${ordinalSuffix} ${month}, ${year}`;
};

const Board = () => {
  const { tasks, filter, setFilter } = useContext(AppContext);
  const name = localStorage.getItem("name");
  const navigate = useNavigate();

  const [showAddPeopleModal, setShowAddPeopleModal] = useState(false);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);

  const currentDate = useMemo(() => formatDate(new Date()), []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  if(!localStorage.getItem('token')){
    navigate('/');
  }

  return (
    <div className={styles.board_container}>
      <div className={styles.welcome_date}>
        <b className={styles.welcome_text}>welcome! {name}</b>
        <h2 className={styles.date_text}>{currentDate}</h2>
      </div>
      <div className={styles.title_state}>
        <div className={styles.board_left}>
          <b className={styles.title_text}>Board</b>
          <div className={styles.add_people}>
            <img src={people_icon} alt="people" className={styles.people_img} />
            <p
              className={styles.people_text}
              onClick={() => setShowAddPeopleModal(true)}
            >
              Add People
            </p>
          </div>
        </div>
        <select
          value={filter}
          className={styles.state_text}
          onChange={(event) => handleFilterChange(event)}
        >
          <option value="Today">Today</option>
          <option value="This Week">This Week</option>
          <option value="This Month">This Month</option>
        </select>
      </div>
      {
        <StateSection
          tasks={tasks}
          showAddTaskModal={showAddTaskModal}
          setShowAddTaskModal={setShowAddTaskModal}
        />
      }
      {showAddPeopleModal && (
        <EmailModal
          onClose={() => setShowAddPeopleModal(false)}
        />
      )}
    </div>
  );
};

export default Board;
