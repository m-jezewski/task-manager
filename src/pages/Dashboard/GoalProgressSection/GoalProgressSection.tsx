import GoalLink from '../../../components/ui/GoalLink/GoalLink';
import useDataContext from '../../../hooks/useDataContext';
import styles from './GoalProgressSection.module.scss'

const GoalProgressSection = () => {
    const { goals } = useDataContext()

    return (
        <section className={styles.goalProgressSection}>
            <span className={styles.goalProgressCaption}>Goal progress</span>
            <div className={styles.goalLinks}>
                {!goals || goals.length === 0 ?
                    <div className={styles.noTasks}>You don't have any goals created</div>
                    :
                    goals.slice(0, 5).map(goal => <GoalLink key={goal.id} goal={goal} />)
                }
            </div>
        </section>
    );
}

export default GoalProgressSection;