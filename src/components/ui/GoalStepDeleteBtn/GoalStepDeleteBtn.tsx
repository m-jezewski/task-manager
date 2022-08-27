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
        newGoalCtx ? newGoalCtx.removeStepInNewGoal(goalStep.id!) : removeDocument(goalStep.id!)
    }

    return (
        <button
            className={styles.deleteGoalStepBtn}
            onClick={handleClick}
        />
    );
}

export default DeleteGoalStepBtn;