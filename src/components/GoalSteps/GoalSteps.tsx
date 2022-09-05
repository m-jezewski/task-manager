import { BooleanGoalStep, NumberGoalStep, TaskGoalStep } from '../../interfaces';
import BooleanStep from './BooleanStep';
import NumberStep from './NumberStep';
import styles from './Steps.module.scss'
import TaskStep from './TaskStep';

interface GoalStepsProps {
    steps: (NumberGoalStep | BooleanGoalStep | TaskGoalStep)[] | undefined
}

const GoalSteps = ({ steps }: GoalStepsProps) => {
    return (
        <table className={styles.gsTable}>
            <caption>Current targets</caption>
            <tbody>
                {steps !== undefined && steps.length !== 0
                    ? steps.map(step =>
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
                    ) :
                    <tr>
                        <td>You did not created any steps yet</td>
                    </tr>}
            </tbody>
        </table>
    );
}

export default GoalSteps;