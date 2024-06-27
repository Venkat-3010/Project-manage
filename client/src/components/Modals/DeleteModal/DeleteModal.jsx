import { useContext } from "react";
import { deleteTask } from "../../../api/taskApi";
import { AppContext } from "../../../context/AppContext";
import styles from "./DeleteModal.module.css";
import Loader from "../../Loader/Loader";

const DeleteModal = ({task, fetchTasks, onClose}) => {
    const { loading, setLoading } = useContext(AppContext);
    const id = localStorage.getItem("id");
    const isReadOnly = task && task.createdBy.toString() !== id;

    const handleDelete = async () => {
        setLoading(true);
        await deleteTask(task._id);
        await fetchTasks();
        setLoading(false);
      };

    if(loading) {
        <Loader />
    }

    return (
        <div className={styles.modal_container}>
            <div className={styles.modal_content}>
                <h1 className={styles.modal_text}>{isReadOnly? "Only Admin can delete a assigned task" : "Are you sure you want to Delete?"}</h1>
                <div className={styles.modal_buttons}>
                    <button className={styles.yes_btn} onClick={handleDelete} disabled={isReadOnly} style={{ backgroundColor: isReadOnly && '#EEF2F5'}}>Yes, Delete</button>
                    <button className={styles.no_btn} onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal;