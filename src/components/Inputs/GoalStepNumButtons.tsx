import useDb from "../../hooks/useDb";
import { GoalStep, NumberGoalStep } from "../../interfaces";
import styles from './InputStyles.module.scss'

interface GoalStepNumButtonsProps {
    goalStep: NumberGoalStep
}

const GoalStepNumButtons = ({ goalStep: { id, value, target, progress } }: GoalStepNumButtonsProps) => {

    const { updateDocument } = useDb('goalSteps')

    const handleIncButtonClick = () => {
        if (value + 1 < target && progress !== 1) {
            updateDocument(id!, { value: value + 1, progress: value / target })
        }
        else if (value + 1 === target && progress !== 1) {
            updateDocument(id!, { value: target, progress: 1 })
        }
    }
    const handleDecButtonClick = () => {
        if (value > 0 && target >= value) {
            updateDocument(id!, { value: value - 1, progress: (value - 1) / target })
        }
    }

    return (
        <div className={styles.goalStepNumButtons}>
            <button onClick={handleIncButtonClick} className={styles.incButton}>+ 1</button>
            <button onClick={handleDecButtonClick} className={styles.decButton}>- 1</button>
        </div>
    );
}

export default GoalStepNumButtons;