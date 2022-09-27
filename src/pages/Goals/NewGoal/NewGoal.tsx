import { createContext, FormEvent, useEffect, useState } from "react";
//interfaces
import { DocumentReference } from "firebase/firestore";
import { BooleanGoalStep, Goal, NumberGoalStep, TaskGoalStep } from "../../../interfaces";
//hooks
import { useNavigate } from "react-router-dom";
import { useDb } from "../../../hooks/useDb";
//styles
import styles from './NewGoal.module.scss'
//components
import { AddStep } from "../AddStep/AddStep";
import { GoalSteps } from "../GoalSteps/GoalSteps";
import { Layout } from "../../../components/layout/Layout/Layout";

export const NewGoalContext = createContext<{
    addStepInNewGoal: (step: NumberGoalStep | BooleanGoalStep | TaskGoalStep) => void;
    updateStepInNewGoal: (stepId: string, changeObj: {}) => void;
    removeStepInNewGoal: (stepId: string) => void
} | null>(null)

export const NewGoal = () => {
    const navigate = useNavigate()
    const { addDocument: addGoal } = useDb('goals')
    const { addDocument: addGoalStep } = useDb('goalSteps')
    const [title, setTitle] = useState('New Goal')
    const [goalRef, setGoalRef] = useState<DocumentReference<any> | null>(null)
    const [description, setDescription] = useState('')
    const [steps, setSteps] = useState<(NumberGoalStep | BooleanGoalStep | TaskGoalStep)[]>([])

    const addStepInNewGoal = (step: NumberGoalStep | BooleanGoalStep | TaskGoalStep) => {
        console.log(Math.random() * 1000)
        setSteps(current => [...current, { ...step, id: (Math.random() * 10000).toString() }])
    }

    const updateStepInNewGoal = (stepId: string, changeObj: {}) => {
        setSteps(current => current.map(step => {
            return step.id === stepId ? { ...step, ...changeObj } : step
        }))
    }

    const removeStepInNewGoal = (stepId: string) => {
        setSteps(current => current.filter(step => step.id !== stepId))
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        const newGoal: Goal = {
            title: title,
            description: description
        }
        addGoal(newGoal).then(ref => ref && setGoalRef(ref))
    }

    useEffect(() => {
        if (goalRef) {
            steps.forEach(step => { delete step.id; addGoalStep({ ...step, goalID: goalRef.id }) })
            navigate(-1)
        }
    }, [goalRef])

    return (
        <Layout title={'Goals'}>
            <NewGoalContext.Provider value={{ addStepInNewGoal, updateStepInNewGoal, removeStepInNewGoal }}>
                <form className={styles.addGoalForm} id='newGoalForm' onSubmit={handleSubmit}>
                    <label>
                        Title:
                        <input
                            className={`${styles.formInput} ${styles.goalTitle}`}
                            type="text"
                            maxLength={25}
                            required
                            value={title}
                            onChange={(e) => { setTitle(e.target.value) }}
                        />
                    </label>
                    <label>
                        Description: (optional)
                        <input
                            className={styles.formInput}
                            type="text"
                            maxLength={200}
                            value={description}
                            onChange={(e) => { setDescription(e.target.value) }} />
                    </label>
                    <GoalSteps steps={steps} />
                </form>
                <AddStep />
                <button
                    className={styles.submitButton}
                    type='submit'
                    form='newGoalForm'>
                    Save new goal
                </button>
            </NewGoalContext.Provider>
        </Layout>
    );
}