import { FormEvent, useState } from 'react'
import useDb from '../../../hooks/useDb'
import useNewGoalContext from '../../../hooks/useNewGoalContext'
import { BooleanGoalStep, NumberGoalStep, TaskGoalStep } from '../../../interfaces'
import styles from './AddGoalStepForm.module.scss'

interface AddNumberStepFormProps {
    goalID: string | undefined
}

const AddNumberStepForm = ({ goalID }: AddNumberStepFormProps) => {

    const { addDocument } = useDb('goalSteps')
    const newGoalCtx = useNewGoalContext()
    const [description, setDescription] = useState('')
    const [target, setTarget] = useState(0)
    const [value, setValue] = useState(0)

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()

        const step: NumberGoalStep = {
            type: 'number',
            description: description,
            value: value,
            target: target,
            progress: target !== 0 ? value / target : 1
        }

        newGoalCtx ? newGoalCtx.addStepInNewGoal(step) : addDocument({ ...step, goalID: goalID })
        setDescription('')
        setValue(0)
        setTarget(0)
    }

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <label>
                Description:
                <input
                    className={styles.textInput}
                    type="text"
                    value={description}
                    onChange={(e) => { setDescription(e.target.value) }}
                    placeholder='ex. I have to write 40 pages'
                    required={true}
                />
            </label>
            <label>
                Target:
                <input
                    type="number"
                    className={styles.textInput}
                    value={target}
                    pattern="^[0-9]*$"
                    min={1}
                    onChange={(e) => { setTarget(parseInt(e.target.value)) }}
                    required={true}
                    placeholder='40' />
            </label>
            <label>
                Begin with:
                <input
                    type="number"
                    className={styles.textInput}
                    value={value}
                    min={0}
                    pattern="^[0-9]*$"
                    onChange={(e) => { setValue(parseInt(e.target.value) > target ? target : parseInt(e.target.value)) }}
                    required={true} />
            </label>
            <button className={styles.submitButton} type='submit'>Add step</button>
        </form>
    );
}

export default AddNumberStepForm;