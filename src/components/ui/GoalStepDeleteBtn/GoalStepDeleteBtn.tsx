import useDb from '../../../hooks/useDb'
import { GoalStep } from '../../../interfaces'
import styles from './GoalStepDeleteBtn.module.scss'

interface DeleteGoalStepBtnProps {
    goalStep: GoalStep
}

const DeleteGoalStepBtn = ({ goalStep }: DeleteGoalStepBtnProps) => {

    const { removeDocument } = useDb('goalSteps')

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        removeDocument(goalStep.id!)
    }

    return (
        <button
            className={styles.deleteGoalStepBtn}
            onClick={handleClick}
        />
    );
}

export default DeleteGoalStepBtn;