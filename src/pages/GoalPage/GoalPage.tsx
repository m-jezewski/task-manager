import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddStep from "../../components/GoalsComponents/AddStep";
import GoalSteps from "../../components/GoalSteps/GoalSteps";
import Layout from "../../components/Layout/Layout";
import useDataContext from "../../hooks/useDataContext";
import useDb from "../../hooks/useDb";
import { BooleanGoalStep, GoalStep, NumberGoalStep, TaskGoalStep } from "../../interfaces";
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
    const [gs, setGs] = useState<(NumberGoalStep | BooleanGoalStep | TaskGoalStep)[] | null>(null)
    const goal = goals && goals.find(goal => goal.id === goalID)
    const goalProgress = gs && gs.map(gs => gs.progress).reduce((prev, current) => prev + current, 0) / gs.length * 100

    useEffect(() => {
        setGs(goalSteps && goalSteps.filter(gs => gs.goalID === goalID))
    }, [goalSteps])

    const handleClick = (goalID: string) => {
        removeGoal(goalID)
        goalSteps && goalSteps.filter(goalStep => goalStep.goalID === goalID).forEach(goalStep => {
            removeGoalStep(goalStep.id!)
        })
        navigate(-1)
    }

    return (
        <Layout title={'Goals'} spaceSelect={false}>
            {goal && gs && <>
                <div className={styles.subHeader}>
                    <h2 className={styles.goalTitle}>
                        {goal?.title}
                    </h2>
                    <span>
                        Progress:
                        <span className={styles.goalProgress}>{goalProgress?.toFixed()}%</span>
                    </span>
                </div>
                <GoalSteps steps={gs} tasks={tasks} />
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