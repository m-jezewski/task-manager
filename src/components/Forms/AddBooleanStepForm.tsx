import { FormEvent, useState } from 'react';
import useDb from '../../hooks/useDb';
import { BooleanGoalStep } from '../../interfaces';
import GoalStepSwitch from '../Inputs/GoalStepSwitch';
import styles from './AddGoalStepForm.module.scss'

interface AddBooleanStepFormProps {
    newGoal: boolean
    addStep: any
    goalID: string
}

const AddBooleanStepForm = ({ newGoal, addStep, goalID }: AddBooleanStepFormProps) => {
    const { addDocument } = useDb('goalSteps')
    const [description, setDescription] = useState('')
    const [value, setValue] = useState(0)

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        const step: BooleanGoalStep = {
            type: 'boolean',
            description: description,
            progress: value
        }
        newGoal ? addStep(step) : addDocument({ ...step, goalID: goalID })

        setDescription('')
        setValue(0)
    }

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <label>
                Description:
                <input
                    className={styles.textInput}
                    type="text"
                    placeholder='Is something done or not?'
                    value={description}
                    onChange={(e) => { setDescription(e.target.value) }}
                    required={true}
                />
            </label>
            <label>
                Value:
                <GoalStepSwitch newStepValue={value} setNewStepValue={setValue} />
            </label>
            <button className={styles.submitButton} type='submit'>
                Add step
            </button>
        </form>
    );
}

export default AddBooleanStepForm;