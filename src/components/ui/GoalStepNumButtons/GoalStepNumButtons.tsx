import useDb from "../../../hooks/useDb";
import useNewGoalContext from "../../../hooks/useNewGoalContext";
import { NumberGoalStep } from "../../../interfaces";
import styles from './GoalStepNumButtons.module.scss'

interface GoalStepNumButtonsProps {
    goalStep: NumberGoalStep
}

const getIncChangeObj = (value: number, target: number, progress: number) => {
    if (value + 1 < target && progress !== 1) {
        return { value: value + 1, progress: value / target }
    }
    else if (value + 1 === target && progress !== 1) {
        return { value: target, progress: 1 }
    } else {
        return {}
    }
}

const getDecChangeObj = (value: number, target: number, progress: number) => {
    if (value > 0 && target >= value) {
        return { value: value - 1, progress: (value - 1) / target }
    } else {
        return {}
    }
}

const GoalStepNumButtons = ({ goalStep: { id, value, target, progress } }: GoalStepNumButtonsProps) => {

    const { updateDocument } = useDb('goalSteps')
    const newGoalCtx = useNewGoalContext()

    const handleIncButtonClick = () => {
        newGoalCtx ? newGoalCtx.updateStepInNewGoal(id!, getIncChangeObj(value, target, progress)) : updateDocument(id!, getIncChangeObj(value, target, progress))
    }
    const handleDecButtonClick = () => {
        if (value > 0 && target >= value) {
            newGoalCtx ? newGoalCtx.updateStepInNewGoal(id!, getDecChangeObj(value, target, progress)) : updateDocument(id!, getDecChangeObj(value, target, progress))
        }
    }

    return (
        <>
            <button onClick={handleIncButtonClick} className={`${styles.incButton} ${styles.numButton}`}>+</button>
            <button onClick={handleDecButtonClick} className={`${styles.decButton} ${styles.numButton}`}>-</button>
        </>
    );
}

export default GoalStepNumButtons;