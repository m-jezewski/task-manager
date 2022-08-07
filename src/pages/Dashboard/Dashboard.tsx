import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Layout from '../../components/Layout/Layout'
import styles from './Dashboard.module.scss'

interface DashboardProps {

}

const Dashboard = () => {

    const [date, setDate] = useState(dayjs())

    useEffect(() => {
        setInterval(() => {
            setDate(dayjs())
        }, 1000)
    })

    return (
        <Layout title="Dashboard">
            <h2 className={styles.subtitle}>
                {date.format('HH:mm:ss')}
                <span>
                    {date.format('dddd mm.MM.YYYY')}
                </span>
            </h2>
            <div className={styles.grid}>
                <section className={styles.todaysTasks}>
                    <h3>Today's Tasks:</h3>
                </section>
                <section className={styles.highPriorityTasks}>
                    <h3>Current high priority tasks:</h3>
                </section>
                <section className={styles.goalProgress}>
                    <h3>Goal progress:</h3>
                </section>
                <section className={styles.incomingDeadlines}>
                    <h3>Incoming Deadlines:</h3>
                </section>
            </div>
        </Layout>
    );
}

export default Dashboard;