import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import styles from "./CreateTaskModal.module.css";
import delete_icon from "../../../assets/delete.png";
import plus_icon from "../../../assets/plus.png";
import downArrow_icon from "../../../assets/down-arrow.png";
import { createTask, updateTask } from "../../../api/taskApi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateTaskModal = ({ onClose, task }) => {
  const { people, setLoading, fetchTasks, user } = useContext(AppContext);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("low");
  const [assignedTo, setAssignedTo] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [checklist, setChecklist] = useState([]);
  const [dropdownView, setDropdownView] = useState(false);
  const [errors, setErrors] = useState("");

  const id = localStorage.getItem("id");
  const isReadOnly = task && task.createdBy.toString() !== id;
  // console.log(task.createdBy.toString());

  const handleAddChecklistItem = () => {
    setChecklist([...checklist, { text: "", completed: false }]);
  };

  const handleDropdownToggle = () => {
    setDropdownView(!dropdownView);
  };

  const handleChecklistItemChange = (index, newValue) => {
    const newChecklist = [...checklist];
    newChecklist[index].text = newValue;
    setChecklist(newChecklist);
  };

  const handleChecklistItemDelete = (index) => {
    const newChecklist = [...checklist];
    newChecklist.splice(index, 1);
    setChecklist(newChecklist);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!title) newErrors.title = "Title is required";
    if (!priority) newErrors.priority = "Priority is required";
    if (checklist.length === 0 || checklist.every((item) => !item.text)) {
      newErrors.checklist = "At least one checklist item is required";
    } else {
      checklist.forEach((item, index) => {
        if (!item.text) {
          newErrors[`checklist_${index}`] = "Checklist item cannot be empty";
        }
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    const taskData = {
      title,
      priority,
      assignedTo,
      checklist,
      dueDate,
    };
    setLoading(true);
    if (task) {
      await updateTask(task._id, taskData);
    } else {
      await createTask(taskData);
    }
    fetchTasks();
    setLoading(false);
    onClose();
  };

  const handleAssign = (person) => {
    setDropdownView(false);
    setAssignedTo(person);
  };

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setPriority(task.priority);
      setAssignedTo(task.assignedTo);
      setDueDate(new Date(task.dueDate));
      setChecklist(task.checklist);
    }
  }, [task]);

  return (
    <div className={styles.modal_container}>
      <div className={styles.modal_content}>
        <div className={styles.modal_top}>
          <div className={styles.title}>
            <label htmlFor={title} className={styles.title_content}>
              Title <sup style={{ color: "red" }}>*</sup>
            </label>
            <input
              type="text"
              className={styles.title_input}
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Enter Task Title"
            />
            {errors.title && (
              <small className={styles.error}>{errors.title}</small>
            )}
          </div>
          <div className={styles.priority}>
            <label className={styles.priority_title}>
              Select Priority <sup style={{ color: "red" }}>*</sup>
            </label>
            <div className={styles.priority_options}>
              <span
                className={`${styles.priority_option} ${
                  priority === "high" ? styles.selected : ""
                }`}
                onClick={() => setPriority("high")}
              >
                <div
                  className={styles.circle}
                  style={{ backgroundColor: "#FF2473" }}
                ></div>
                HIGH PRIORITY
              </span>
              <span
                className={`${styles.priority_option} ${
                  priority === "moderate" ? styles.selected : ""
                }`}
                onClick={() => setPriority("moderate")}
              >
                <div
                  className={styles.circle}
                  style={{ backgroundColor: "#18B0FF" }}
                ></div>
                MODERATE PRIORITY
              </span>
              <span
                className={`${styles.priority_option} ${
                  priority === "low" ? styles.selected : ""
                }`}
                onClick={() => setPriority("low")}
              >
                <div
                  className={styles.circle}
                  style={{ backgroundColor: "#63C05B" }}
                ></div>
                LOW PRIORITY
              </span>
            </div>
            {errors.priority && (
              <small className={styles.error}>{errors.priority}</small>
            )}
          </div>
          {people.length > 0 && (
            <div className={styles.assign_to}>
              <label htmlFor="assign">Assign to</label>
              <div className={styles.select_container}>
                <div
                  className={styles.dropdown}
                  onClick={!isReadOnly ? handleDropdownToggle : undefined}
                >
                  <span>{assignedTo ? assignedTo : "Add an assignee"}</span>
                  <img
                    src={downArrow_icon}
                    alt="down arrow"
                    className={styles.down_arrow}
                  />
                </div>
                {dropdownView && (
                  <div className={styles.dropdown_content}>
                    {people.map((person) => (
                      <div key={person} className={styles.person_option}>
                        <b className={styles.person_icon}>
                          {person.substring(0, 2).toUpperCase()}
                        </b>
                        {"  "}
                        {person}
                        <button
                          onClick={() => handleAssign(person)}
                          className={styles.assign_btn}
                        >
                          Assign
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
          <div className={styles.checklist}>
            <label htmlFor="">
              Checklist ({checklist.filter((item) => item.completed).length}/
              {checklist.length})<sup style={{ color: "red" }}>*</sup>
            </label>
            {errors.checklist && (
              <small className={styles.error}>{errors.checklist}</small>
            )}
            <div className={styles.checklist_container}>
              {checklist.map((item, index) => {
                return (
                  <div className={styles.checklist_item} key={index}>
                    <span className={styles.checklist_inputs}>
                      <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={() => {
                          const newChecklist = [...checklist];
                          newChecklist[index].completed =
                            !newChecklist[index].completed;
                          setChecklist(newChecklist);
                        }}
                        style={{ accentColor: "rgb(23, 162, 184)" }}
                      />
                      <input
                        type="text"
                        value={item.text}
                        onChange={(event) =>
                          handleChecklistItemChange(index, event.target.value)
                        }
                        className={`${styles.text_input} ${
                          errors[`checklist_${index}`] ? styles.error_placeholder : ""
                        }`}
                        placeholder={
                          errors[`checklist_${index}`]
                            ? errors[`checklist_${index}`]
                            : "Add a task"
                        }
                      />
                    </span>
                    <img
                      src={delete_icon}
                      alt="delete_icon"
                      className={styles.icon}
                      onClick={() => handleChecklistItemDelete(index)}
                    />
                  </div>
                );
              })}
            </div>
            <button
              onClick={handleAddChecklistItem}
              className={styles.add_item}
            >
              <img
                src={plus_icon}
                alt="plus_icon"
                className={styles.icon}
                style={{ width: "12px", height: "12px" }}
              />
              Add New
            </button>
          </div>
        </div>
        <div className={styles.modal_actions}>
          <div className="duedate-btn">
            <DatePicker
              selected={dueDate}
              onChange={(date) => setDueDate(date)}
              placeholderText="Select Due Date"
              className={styles.date_picker}
            />
          </div>
          <div className={styles.btn_grp}>
            <button className={styles.cancel_btn} onClick={onClose}>
              Cancel
            </button>
            <button className={styles.save_btn} onClick={handleSave}>
              {!task ? "Save" : "Update"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTaskModal;
