import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout/Layout'
import { DataContext } from '../../contexts/DataContext';
import useDataContext from '../../hooks/useDataContext';
import useDb from '../../hooks/useDb';
import styles from './Goals.module.scss'

interface GoalsProps {

}

const Goals = () => {

    const { goals, goalSteps } = useDataContext()
    console.log(goals, goalSteps)

    return (
        <Layout title='Goals' spaceSelect={false}>
            <div className={styles.container}>
                <h2>Track the progress of your goals by describing them in small steps!</h2>
                <section>
                    No current goals
                    <Link to='AddGoal'>Create new Goal! </Link>
                </section>
                <section>
                    create new goal
                </section>
            </div>
        </Layout>
    );
}

export default Goals;