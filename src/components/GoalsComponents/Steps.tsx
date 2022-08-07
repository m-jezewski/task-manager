import { GoalStep } from '../../interfaces';
import styles from './Steps.module.scss'

interface StepsProps {
    steps?: GoalStep[]
}

const Steps = ({ steps }: StepsProps) => {

    return (
        <div className={styles.container}>
            Steps: <br />
            {steps && steps.length !== 0 ? <>{steps.map(step => <>{1}</>)}</> : <div>You did not created any steps yet</div>}
        </div>
    );
}

export default Steps;