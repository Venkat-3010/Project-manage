import Board from "../../components/Board/Board"
import NavBar from "../../components/NavBar/NavBar"
import styles from "./BoardPage.module.css"

const BoardPage = () => {
  return (
    <div className={styles.page_container}>
        <NavBar />
        <Board />
    </div>
  )
}

export default BoardPage