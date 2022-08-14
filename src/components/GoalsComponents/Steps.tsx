import useDataContext from '../../hooks/useDataContext';
import { GoalStep, Task } from '../../interfaces';
import BooleanStep from './BooleanStep';
import NumberStep from './NumberStep';
import styles from './Steps.module.scss'
import TaskStep from './TaskStep';

interface StepsProps {
    steps?: GoalStep[]
    tasks?: Task[]
}

const Steps = ({ steps, tasks }: StepsProps) => {
    return (
        <div className={styles.container}>
            Steps: <br />
            {steps && tasks && steps.length !== 0 ?
                <table>
                    <tbody>
                        {steps.map(step =>
                            step.type === 'task' ?
                                <TaskStep key={step.id} step={step} task={tasks.find((task: Task) => task.id === step.taskID)!} /> :
                                step.type === 'number' ?
                                    <NumberStep key={step.id} step={step} /> :
                                    <BooleanStep key={step.id} step={step} />
                        )}
                    </tbody>
                </table>
                : <div>You did not created any steps yet</div>}
        </div>
    );
}

export default Steps;