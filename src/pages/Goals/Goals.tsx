import { Link } from 'react-router-dom';
import GoalLink from '../../components/ui/GoalLink/GoalLink';
import Layout from '../../components/Layout/Layout/Layout'
import useDataContext from '../../hooks/useDataContext';
import styles from './Goals.module.scss'

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