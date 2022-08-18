import { FormEvent, useState } from 'react';
import { BooleanGoalStep, GoalStep, NumberGoalStep, TaskGoalStep } from '../../interfaces';
//styles
import styles from './AddStep.module.scss'
//hooks
import useDb from '../../hooks/useDb';
import useDataContext from '../../hooks/useDataContext';
//components
import { Tab } from '@headlessui/react';
import AddTaskForm from '../Forms/AddTaskForm';
import GoalStepSwitch from '../Inputs/GoalStepSwitch';

interface AddStepProps {
    newGoal?: boolean
    addStep?: any
    goalID?: string
}

const AddStep = ({ newGoal, addStep, goalID }: AddStepProps) => {
    const { statuses } = useDataContext()
    const { addDocument } = useDb('goalSteps')

    const [description, setDescription] = useState('')
    const [value, setValue] = useState(0)
    const [startWith, setStartWith] = useState(0)
    const [target, setTarget] = useState(0)

    const handleSubmit = (type: 'boolean' | 'number' | 'task', e?: FormEvent, taskID?: string) => {
        e && e.preventDefault()

        let step: GoalStep | BooleanGoalStep | NumberGoalStep | TaskGoalStep = {
            type: type,
            progress: 0,
        }

        switch (step.type) {
            case 'boolean':
                step = { ...step, description: description, progress: value } as BooleanGoalStep
                break;
            case 'number':
                step = { ...step, description: description, value: startWith, target: target } as NumberGoalStep
                break;
            case 'task':
                if (taskID) { step = { ...step, taskID: taskID } as TaskGoalStep }
                break;
        }

        newGoal ? addStep(step) : addDocument({ ...step, goalID: goalID })

        setDescription('')
        setValue(0)
        setStartWith(0)
        setTarget(0)
    }

    return (
        <div className={styles.container}>
            <Tab.Group>
                <h2 className={styles.subTitle}>
                    Describe your target in little steps <br />
                    How would you like to follow the progress of this step?
                </h2>
                <Tab.List className={styles.tabList}>
                    {({ selectedIndex }: any) => <>
                        <Tab className={`${styles.tab} ${selectedIndex === 0 && styles.tabActive}`} >Number</Tab>
                        <Tab className={`${styles.tab} ${selectedIndex === 1 && styles.tabActive}`} >True or False</Tab>
                        <Tab className={`${styles.tab} ${selectedIndex === 2 && styles.tabActive}`} >Task</Tab>
                    </>}
                </Tab.List>
                <Tab.Panels>
                    <Tab.Panel as='form' className={styles.tabPanelsForm}>
                        <label>
                            Description:
                            <input
                                className={styles.textInput}
                                type="text"
                                value={description}
                                onChange={(e) => { setDescription(e.target.value) }}
                                placeholder='ex. I have to write 40 pages' />
                        </label>
                        <label>
                            Target:
                            <input
                                type="number"
                                className={styles.textInput}
                                value={target}
                                pattern="^[0-9]*$"
                                onChange={(e) => { setTarget(parseInt(e.target.value)) }}
                                required
                                placeholder='40' />
                        </label>
                        <label>
                            Begin with:
                            <input
                                type="number"
                                className={styles.textInput}
                                value={startWith}
                                pattern="^[0-9]*$"
                                onChange={(e) => { setStartWith(parseInt(e.target.value)) }}
                                required />
                        </label>
                        <button className={styles.submitButton} type='submit' onClick={(e) => { handleSubmit('number', e) }}>Add step</button>
                    </Tab.Panel>
                    <Tab.Panel as='form' className={styles.tabPanelsForm}>
                        <label>
                            Description:
                            <input
                                className={styles.textInput}
                                type="text"
                                placeholder='Is something done or not?'
                                value={description}
                                onChange={(e) => { setDescription(e.target.value) }}
                            />
                        </label>
                        <label>
                            Value:
                            <GoalStepSwitch newStepValue={value} setNewStepValue={setValue} />
                        </label>
                        <button className={styles.submitButton} type='submit' onClick={(e) => { handleSubmit('boolean', e) }}>
                            Add step
                        </button>
                    </Tab.Panel>
                    <Tab.Panel as={'div'}>
                        {statuses &&
                            <AddTaskForm
                                direction="column"
                                position="relative"
                                defaultStatus={statuses[0]}
                                addGoalStep={handleSubmit}
                            />}
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>
    );
}

export default AddStep;