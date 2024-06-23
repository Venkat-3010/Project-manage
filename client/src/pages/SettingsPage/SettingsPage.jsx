import NavBar from '../../components/NavBar/NavBar'
import styles from './SettingsPage.module.css'
import Settings from '../../components/Settings/Settings'

const AnalyticsPage = () => {
  return (
    <div className={styles.page_container}>
        <NavBar />
        <Settings />
    </div>
  )
}

export default AnalyticsPage