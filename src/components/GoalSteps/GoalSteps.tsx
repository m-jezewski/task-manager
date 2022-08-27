import useDataContext from '../../hooks/useDataContext';
import { BooleanGoalStep, NumberGoalStep, Task, TaskGoalStep } from '../../interfaces';
import BooleanStep from './BooleanStep';
import NumberStep from './NumberStep';
import styles from './Steps.module.scss'
import TaskStep from './TaskStep';

interface GoalStepsProps {
    steps: (NumberGoalStep | BooleanGoalStep | TaskGoalStep)[] | undefined
}

const GoalSteps = ({ steps }: GoalStepsProps) => {
    return (
        <div className={styles.container}>
            <h3>Current goal steps</h3>
            {steps !== undefined && steps.length !== 0 ?
                <table>
                    <tbody>
                        {steps.map(step =>
                            step.type === 'task' ?
                                <TaskStep
                                    key={step.id!}
                                    step={step}
                                />
                                : step.type === 'number' ?
                                    <NumberStep
                                        key={step.id!}
                                        step={step} />
                                    : <BooleanStep
                                        key={step.id!}
                                        step={step} />
                        )}
                    </tbody>
                </table>
                : <div>You did not created any steps yet</div>}
        </div>
    );
}

export default GoalSteps;