import useDb from "../../../hooks/useDb";
import { NumberGoalStep } from "../../../interfaces";
import styles from './GoalStepNumberInputs.module.scss'

interface GoalStepNumberInputsProps {
    goalStep: NumberGoalStep
}

const GoalStepNumberInputs = ({ goalStep: { value, target, id } }: GoalStepNumberInputsProps) => {
    const { updateDocument } = useDb('goalSteps')

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = parseInt(e.target.value)

        if (e.target.value === '') {
            updateDocument(id!, { value: 0 })
        } else if (inputValue < target) {
            updateDocument(id!, { value: inputValue, progress: inputValue / target })
        } else if (inputValue >= target) {
            updateDocument(id!, { value: target, progress: 1 })
        }
    }

    const handleTargetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = parseInt(e.target.value)

        if (e.target.value === '') {
            updateDocument(id!, { target: 0, value: 0, progress: 0 })
        } else if (inputValue > value) {
            updateDocument(id!, { target: inputValue, progress: value / target })
        } else if (inputValue < value) {
            updateDocument(id!, { target: inputValue, value: inputValue, progress: 1 })
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