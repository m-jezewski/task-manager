import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddStep from "../../components/AddStep/AddStep";
import GoalSteps from "../../components/GoalSteps/GoalSteps";
import Layout from "../../components/Layout/Layout/Layout";
import useDataContext from "../../hooks/useDataContext";
import useDb from "../../hooks/useDb";
import styles from './GoalPage.module.scss'
import { getGoalStepProgess } from "../../utils/getGoalStepProgress";

const GoalPage = () => {
    const { goalID } = useParams()
    const navigate = useNavigate()
    const { goals, goalSteps } = useDataContext()
    const { removeDocument: removeGoal } = useDb('goals')
    const { removeDocument: removeGoalStep } = useDb('goalSteps')
    const [openAddStep, setOpenAddStep] = useState(false)
    const gs = goalSteps?.filter(gs => gs.goalID === goalID)
    const goal = goals?.find(goal => goal.id === goalID)
    const goalProgress = getGoalStepProgess(gs)

    const handleClick = (goalID: string) => {
        removeGoal(goalID)
        goalSteps && goalSteps.filter(goalStep => goalStep.goalID === goalID).forEach(goalStep => {
            removeGoalStep(goalStep.id!)
        })
        navigate(-1)
    }

    return (
        <Layout title={'Goals'} showSpaceSelect={false}>
            {goal && <>
                <div className={styles.subHeader}>
                    <h2 className={styles.goalTitle}>
                        {goal.title}
                    </h2>
                    <span>
                        Progress:
                        <span className={styles.goalProgress}>{goalProgress.toFixed()}%</span>
                    </span>
                </div>
                <GoalSteps steps={gs} />
                {goal.description && <p className={styles.description}>{goal.description}</p>}
                {openAddStep ?
                    <AddStep goalID={goalID} />
                    : <button
                        className={styles.openAddStepsBtn}
                        onClick={() => { setOpenAddStep(true) }}>
                        Add more steps
                    </button>}
                <button
                    className={styles.deleteButton}
                    onClick={() => handleClick(goal.id!)}>
                    Delete Goal
                </button>
            </>}
        </Layout>
    );
}

export default GoalPage;