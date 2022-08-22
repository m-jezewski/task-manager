import useDataContext from '../../hooks/useDataContext';
import { BooleanGoalStep, GoalStep, NumberGoalStep, Task, TaskGoalStep } from '../../interfaces';
import BooleanStep from './BooleanStep';
import NumberStep from './NumberStep';
import styles from './Steps.module.scss'
import TaskStep from './TaskStep';

interface GoalStepsProps {
    steps?: (NumberGoalStep | BooleanGoalStep | TaskGoalStep)[]
    tasks?: Task[]
}

const GoalSteps = ({ steps, tasks }: GoalStepsProps) => {
    return (
        <div className={styles.container}>
            <h3>Current goal steps</h3>
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

export default GoalSteps;