import { useState } from "react";
import Layout from "../../components/Layout/Layout";
import useDb from "../../hooks/useDb";
import styles from './AddGoal.module.scss'
import AddStep from "../../components/GoalsComponents/AddStep";
import Steps from "../../components/GoalsComponents/Steps";
import { GoalStep } from "../../interfaces";

const AddGoal = () => {
    const { addDocument: addGoal } = useDb('goals')
    const { addDocument: addGoalStep } = useDb('goalSteps')

    const [title, setTitle] = useState('New Goal')
    const [description, setDescription] = useState('')
    const steps: GoalStep[] = []

    const addStep = (step: GoalStep) => {
        console.log(step)
        steps.push(step)
        console.log(steps)
    }

    return (
        <Layout title={'Goals'} spaceSelect={false}>
            <form className={styles.addGoalForm}>
                <label>
                    Title:
                    <input
                        className={`text-input ${styles.formInput} ${styles.subTitle}`}
                        type="text"
                        maxLength={25}
                        required
                        value={title}
                        onChange={(e) => { setTitle(e.target.value) }}
                    />
                </label>
                <label>
                    Description: (optional)
                    <input className={`text-input ${styles.formInput}`} type="text" maxLength={200} value={description} onChange={(e) => { setDescription(e.target.value) }} />
                </label>
                <Steps steps={steps} />
            </form>
            <AddStep addStep={addStep} newGoal />
        </Layout>
    );
}

export default AddGoal;