import useDb from "../../../hooks/useDb";
import useNewGoalContext from "../../../hooks/useNewGoalContext";
import { BooleanGoalStep, NumberGoalStep, TaskGoalStep } from "../../../interfaces";

interface GoalStepCheckboxProps {
    goalStep: NumberGoalStep | BooleanGoalStep | TaskGoalStep
}

const getChangesObj = (goalStep: NumberGoalStep | BooleanGoalStep | TaskGoalStep) => {
    return goalStep.type === 'number' ?
        { progress: goalStep.progress === 1 ? 0 : 1, value: goalStep.target } :
        { progress: goalStep.progress === 1 ? 0 : 1 }
}

const GoalStepCheckbox = ({ goalStep }: GoalStepCheckboxProps) => {
    const { updateDocument } = useDb('goalSteps')
    const newGoalCtx = useNewGoalContext()

    const handleChange = () => {
        newGoalCtx ? newGoalCtx.updateStepInNewGoal(goalStep.id!, getChangesObj(goalStep)) : updateDocument(goalStep.id!, getChangesObj(goalStep))
    }

    return (
        <input type='checkbox' checked={goalStep.progress === 1} onChange={handleChange} value={'true'} />
    );
}

export default GoalStepCheckbox;