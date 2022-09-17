import Layout from '../../components/Layout/Layout/Layout'
import styles from './Dashboard.module.scss'
import GoalProgressSection from './GoalProgressSection/GoalProgressSection';
import SpacesSection from './SpacesSection/SpacesSection';
import HighPrioTaskSection from './HighPrioSection/HighPrioTasksSection';
import TodaySection from './TodaySection/TodaySection';
import { Outlet } from 'react-router-dom';
import dayjs from 'dayjs';
import DashboardHelp from './DashboardHelp';

const Dashboard = () => {
    return (
        <Layout title="Dashboard">
            <div className={styles.subheader}>
                <span>
                    {dayjs().format('dddd DD/MM/YYYY')}
                </span>
                <DashboardHelp />
            </div>
            <div className={styles.gridContainer}>
                <TodaySection />
                <HighPrioTaskSection />
                <GoalProgressSection />
                <SpacesSection />
            </div>
            <Outlet />
        </Layout>
    );
}

export default Dashboard;