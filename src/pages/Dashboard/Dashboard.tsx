import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout/Layout'
import styles from './Dashboard.module.scss'

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
                    {date.format('dddd DD/MM/YYYY')}
                </span>
            </h2>
            <div className={styles.grid}>

            </div>
        </Layout>
    );
}

export default Dashboard;