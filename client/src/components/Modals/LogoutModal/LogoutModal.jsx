import styles from './LogoutModal.module.css'

const LogoutModal = ({onClose, handleLogOut}) => {

  return (
    <div className={styles.modal_container}>
            <div className={styles.modal_content}>
                <p className={styles.modal_text}>Are you sure you want to Logout?</p>
                <div className={styles.modal_buttons}>
                    <button className={styles.yes_btn} onClick={handleLogOut}>Yes, Logout</button>
                    <button className={styles.no_btn} onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
  )
}

export default LogoutModal