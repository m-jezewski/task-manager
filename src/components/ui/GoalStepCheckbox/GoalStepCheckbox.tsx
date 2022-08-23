import useDb from "../../../hooks/useDb";
import { BooleanGoalStep, NumberGoalStep, TaskGoalStep } from "../../../interfaces";

interface GoalStepCheckboxProps {
    goalStep: NumberGoalStep | BooleanGoalStep | TaskGoalStep
}

const GoalStepCheckbox = ({ goalStep }: GoalStepCheckboxProps) => {
    const { updateDocument } = useDb('goalSteps')

    const handleChange = () => {
        updateDocument(goalStep.id!, goalStep.type === 'number' ? { progress: goalStep.progress === 1 ? 0 : 1, value: goalStep.target } : { progress: goalStep.progress === 1 ? 0 : 1 })
    }

    return (
        <input type='checkbox' checked={goalStep.progress === 1} onChange={handleChange} value={'true'} />
    );
}

export default GoalStepCheckbox;