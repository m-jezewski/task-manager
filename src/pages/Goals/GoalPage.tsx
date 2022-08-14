import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddStep from "../../components/GoalsComponents/AddStep";
import Steps from "../../components/GoalsComponents/Steps";
import Layout from "../../components/Layout/Layout";
import useDataContext from "../../hooks/useDataContext";
import useDb from "../../hooks/useDb";
import { GoalStep } from "../../interfaces";
import styles from './GoalPage.module.scss'

interface GoalPageProps {

}

const GoalPage = ({ }: GoalPageProps) => {
    const { goalID } = useParams()
    const navigate = useNavigate()
    const { goals, goalSteps, tasks } = useDataContext()
    const { removeDocument: removeGoal } = useDb('goals')
    const { removeDocument: removeGoalStep } = useDb('goalSteps')
    const [openAddStep, setOpenAddStep] = useState(false)
    const [gs, setGs] = useState<GoalStep[] | null>(null)
    const goal = goals && goals.find(goal => goal.id === goalID)

    useEffect(() => {
        setGs(goalSteps && goalSteps.filter(gs => gs.goalID === goalID))
    }, [goalSteps])

    const handleClick = (goalID: string) => {
        removeGoal(goalID)
        goalSteps.filter(goalStep => goalStep.goalID === goalID).forEach(goalStep => {
            removeGoalStep(goalStep.id!)
        })
        navigate(-1)
    }

    return (
        <Layout title={'Goals'} spaceSelect={false}>
            {goal && gs && <>
                <h2 className={styles.goalTitle}>{goal?.title}</h2>
                {goal.description && <p>{goal.description}</p>}
                <Steps steps={gs} tasks={tasks} />
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