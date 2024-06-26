import { useContext, useState } from "react";
import styles from "./EmailModal.module.css";
import { AppContext } from "../../../context/AppContext";

const ConfirmAddPerson = ({ onClose, email }) => {
  return (
    <div className={styles.modal_container}>
      <div className={styles.confimrModal_content}>
        <p
          className={styles.email}
          style={{
            color: "#000000",
          }}
        >
          {email}
        </p>
        <button
          className={styles.btn}
          onClick={onClose}
          style={{ backgroundColor: "#17A2B8", color: "#ffffff" }}
        >
          Okay, got it
        </button>
      </div>
    </div>
  );
};

const EmailModal = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [error, setError] = useState("");
  const { addPerson } = useContext(AppContext);

  const handleAddPerson = async () => {
    // console.log("Adding person with email:", email);
    if (!email) {
      setError("Email is required");
      return;
    }

    
    if (!email.includes('@')) {
      setError("Please enter a valid email");
      return;
    }

    setError("");
    await addPerson(email);
    setShowConfirmation(true);
  };

  return (
    <>
      {showConfirmation ? (
        <ConfirmAddPerson onClose={onClose} email={email} />
      ) : (
        <div className={styles.modal_container}>
          <div className={styles.modal_content}>
            <p className={styles.modal_text}>Add people to the board</p>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter Email"
              className={styles.input}
            />
            {error && <p className={styles.error_text}>{error}</p>}
            <div className={styles.btn_grp}>
              <button
                onClick={onClose}
                className={styles.btn}
                style={{
                  border: "1px solid #CF3636",
                  color: "#CF3636",
                  backgroundColor: "transparent",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleAddPerson}
                className={styles.btn}
                style={{ backgroundColor: "#17A2B8", color: "#ffffff" }}
              >
                Add Email
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EmailModal;
