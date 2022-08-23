import { FormEvent, useState } from 'react';
import useDb from '../../../hooks/useDb';
import { BooleanGoalStep, NumberGoalStep, TaskGoalStep } from '../../../interfaces';
import GoalStepSwitch from '../../ui/GoalStepSwitch/GoalStepSwitch';
import styles from './AddGoalStepForm.module.scss'

interface AddBooleanStepFormProps {
    addStepToNewGoal?: (step: NumberGoalStep | BooleanGoalStep | TaskGoalStep) => void
    goalID: string
}

const AddBooleanStepForm = ({ addStepToNewGoal, goalID }: AddBooleanStepFormProps) => {
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
        addStepToNewGoal ? addStepToNewGoal(step) : addDocument({ ...step, goalID: goalID })
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