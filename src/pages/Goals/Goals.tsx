import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Steps from '../../components/GoalsComponents/Steps';
import Layout from '../../components/Layout/Layout'
import { DataContext } from '../../contexts/DataContext';
import useDataContext from '../../hooks/useDataContext';
import useDb from '../../hooks/useDb';
import styles from './Goals.module.scss'

interface GoalsProps {

}

const Goals = () => {

    const { goals } = useDataContext()

    return (
        <Layout title='Goals' spaceSelect={false}>
            <div className={styles.container}>
                <h2 className={styles.subtitle}>Track the progress of your goals!</h2>
                <section className={styles.goalList} style={{}}>
                    {goals && goals.map(goal =>
                        <Link to={`${goal.id}`} key={goal.id} className={styles.goalListItem}>
                            <h3>{goal.title}</h3>
                            <div className={styles.goalProgressCircle}></div>
                        </Link>)}
                    <Link to='NewGoal' className={styles.goalListItem}>Create new goal</Link>
                </section>
            </div>
        </Layout>
    );
}

export default Goals;