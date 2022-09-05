import Layout from '../../components/Layout/Layout/Layout'
import styles from './Dashboard.module.scss'
import Subheader from './Subheader/Subheader';
import GoalProgressSection from './GoalProgressSection/GoalProgressSection';
import SpacesSection from './SpacesSection/SpacesSection';
import HighPrioTaskSection from './HighPrioSection/HighPrioTasksSection';
import TodaySection from './TodaySection/TodaySection';

const Dashboard = () => {
    return (
        <Layout title="Dashboard" showSpaceSelect={false}>
            <Subheader />
            <div className={styles.gridContainer}>
                <TodaySection />
                <HighPrioTaskSection />
                <GoalProgressSection />
                <SpacesSection />
            </div>
        </Layout>
    );
}

export default Dashboard;