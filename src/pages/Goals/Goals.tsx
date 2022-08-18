import { useContext } from 'react';
import { Link } from 'react-router-dom';
import GoalLink from '../../components/GoalsComponents/GoalLink';
import GoalSteps from '../../components/GoalSteps/GoalSteps';
import Layout from '../../components/Layout/Layout'
import { DataContext } from '../../contexts/DataContext';
import useDataContext from '../../hooks/useDataContext';
import useDb from '../../hooks/useDb';
import styles from './Goals.module.scss'

interface GoalsProps {

}

const Goals = () => {

    const { goals, goalSteps } = useDataContext()

    return (
        <Layout title='Goals' spaceSelect={false}>
            <div className={styles.container}>
                <h2 className={styles.subtitle}>Track the progress of your goals!</h2>
                <section className={styles.goalList}>
                    {goals && goalSteps && goals.map(goal =>
                        <GoalLink
                            key={goal.id}
                            goal={goal}
                            steps={goalSteps.filter(gs => gs.goalID === goal.id)}
                        />)}
                    <Link to='NewGoal' className={styles.newGoalLink}>Create new goal</Link>
                </section>
            </div>
        </Layout>
    );
}

export default Goals;