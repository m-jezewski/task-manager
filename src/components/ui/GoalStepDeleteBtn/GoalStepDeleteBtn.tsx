import useDb from '../../../hooks/useDb'
import useNewGoalContext from '../../../hooks/useNewGoalContext'
import { GoalStep } from '../../../interfaces'
import styles from './GoalStepDeleteBtn.module.scss'

interface DeleteGoalStepBtnProps {
    goalStep: GoalStep
}

const DeleteGoalStepBtn = ({ goalStep }: DeleteGoalStepBtnProps) => {
    const { removeDocument } = useDb('goalSteps')
    const newGoalCtx = useNewGoalContext()

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (newGoalCtx) {
            newGoalCtx.removeStepInNewGoal(goalStep.id!)
            return
        }

        removeDocument(goalStep.id!)
    }

    return (
        <button
            className={styles.deleteGoalStepBtn}
            aria-label='Delete goal step'
            onClick={handleClick}
        />
    );
}

export default DeleteGoalStepBtn;