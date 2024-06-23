import NavBar from '../../components/NavBar/NavBar'
import Analytics from '../../components/Analytics/Analytics'
import styles from './AnalyticsPage.module.css'

const AnalyticsPage = () => {
  return (
    <div className={styles.page_container}>
        <NavBar />
        <Analytics />
    </div>
  )
}

export default AnalyticsPage