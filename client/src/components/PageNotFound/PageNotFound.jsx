import styles from "./PageNotFound.module.css";
import Image_404 from "../../assets/pageNotFound.jpg";

function PageNotFound() {
  return (
    <div className={styles.container}>
      <h1>Error 404</h1>
      <p>Page Not Found</p>
      <img src={Image_404} alt="" />
    </div>
  );
}

export default PageNotFound;
