import useDb from "../../../hooks/useDb";
import useNewGoalContext from "../../../hooks/useNewGoalContext";
import { NumberGoalStep } from "../../../interfaces";
import styles from './GoalStepNumberInputs.module.scss'

interface GoalStepNumberInputsProps {
    goalStep: NumberGoalStep
}

const getValueChangeObj = (input: string, target: number) => {
    const inputValue = parseInt(input)

    if (input === '' || inputValue < 0) {
        return { value: 0 }
    } else if (inputValue < target) {
        return { value: inputValue, progress: inputValue / target }
    } else if (inputValue >= target) {
        return { value: target, progress: 1 }
    } else {
        return {}
    }
}

const getTargetChangeObj = (input: string, value: number, target: number) => {
    const inputValue = parseInt(input)

    if (input === '') {
        return { target: 0, value: 0, progress: 0 }
    } else if (inputValue > value) {
        return { target: inputValue, progress: value / inputValue }
    } else if (inputValue <= value) {
        return { target: inputValue, value: inputValue, progress: 1 }
    } else {
        return {}
    }
}

const GoalStepNumberInputs = ({ goalStep: { value, target, id } }: GoalStepNumberInputsProps) => {
    const { updateDocument } = useDb('goalSteps')
    const newGoalCtx = useNewGoalContext()

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (newGoalCtx) {
            newGoalCtx.updateStepInNewGoal(id!, getValueChangeObj(e.target.value, target))
        } else {
            updateDocument(id!, getValueChangeObj(e.target.value, target))
        }
    }

    const handleTargetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (newGoalCtx) {
            newGoalCtx.updateStepInNewGoal(id!, getTargetChangeObj(e.target.value, value, target))
        } else {
            updateDocument(id!, getTargetChangeObj(e.target.value, value, target))
        }
    }

    return (
        <div className={styles.goalStepNumberInputs}>
            <input
                className={styles.valueInput}
                type="number"
                max={target}
                value={value}
                onChange={handleValueChange} />
            <input
                className={styles.targetInput}
                type="number"
                value={target}
                min={value}
                onChange={handleTargetChange} />
        </div>
    );
}

export default GoalStepNumberInputs;