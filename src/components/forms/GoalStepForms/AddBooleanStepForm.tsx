import { FormEvent, useState } from 'react';
import useDb from '../../../hooks/useDb';
import useNewGoalContext from '../../../hooks/useNewGoalContext';
import { BooleanGoalStep } from '../../../interfaces';
import styles from './AddGoalStepForm.module.scss'

interface AddBooleanStepFormProps {
    goalID: string | undefined
}

const AddBooleanStepForm = ({ goalID }: AddBooleanStepFormProps) => {
    const { addDocument } = useDb('goalSteps')
    const [description, setDescription] = useState('')
    const newGoalCtx = useNewGoalContext()

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        const step: BooleanGoalStep = {
            type: 'boolean',
            description: description,
            progress: 0
        }
        newGoalCtx ? newGoalCtx.addStepInNewGoal(step) : addDocument({ ...step, goalID: goalID })
        setDescription('')
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
            <button className={styles.submitButton} type='submit'>
                Add step
            </button>
        </form>
    );
}

export default AddBooleanStepForm;