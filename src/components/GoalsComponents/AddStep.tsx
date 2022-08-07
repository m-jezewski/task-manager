import { Tab } from '@headlessui/react';
import AddTaskForm from '../Forms/AddTaskForm';
import useDataContext from '../../hooks/useDataContext';
import styles from './AddStep.module.scss'
import { FormEvent, useState } from 'react';
import { GoalStep } from '../../interfaces';
import useDb from '../../hooks/useDb';

interface AddStepProps {
    newGoal?: boolean
    addStep?: any
}

const AddStep = ({ newGoal, addStep }: AddStepProps) => {
    const { statuses } = useDataContext()
    const { addDocument } = useDb('goalSteps')

    const [description, setDescription] = useState('')
    const [startWith, setStartWith] = useState(0)
    const [value, setValue] = useState(false)
    const [target, setTarget] = useState(0)

    const handleSubmit = (type: 'boolean' | 'number' | 'task', e?: FormEvent, taskID?: string) => {
        e && e.preventDefault()
        let step: GoalStep = {
            description: description,
            type: type
        }

        switch (type) {
            case 'boolean':
                step = { ...step, value: value }
                break;
            case 'number':
                step = { ...step, startWith: startWith, target: target, }
                break;
            case 'task':
                if (taskID) {
                    step = { type: type, taskID: taskID }
                }
                break;
        }
        newGoal ? addStep(step) : addDocument(step)
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
                        <Tab className={`text-button darken_hover ${styles.tab} ${selectedIndex === 0 && styles.tab_active}`} >Number</Tab>
                        <Tab className={`text-button darken_hover ${styles.tab} ${selectedIndex === 1 && styles.tab_active}`} >True or False</Tab>
                        <Tab className={`text-button darken_hover ${styles.tab} ${selectedIndex === 2 && styles.tab_active}`} >Task</Tab>
                    </>}
                </Tab.List>
                <Tab.Panels>
                    <Tab.Panel as='form' className={styles.tabPanelsForm}>
                        <label>
                            Description:
                            <input
                                className={`text-input`}
                                type="text"
                                value={description}
                                onChange={(e) => { setDescription(e.target.value) }}
                                placeholder='ex. I have to write 40 pages' />
                        </label>
                        <label>
                            Target:
                            <input
                                type="number"
                                className={`text-input`}
                                value={target}
                                onChange={(e) => { setTarget(parseInt(e.target.value)) }}
                                required
                                placeholder='40' />
                        </label>
                        <label>
                            Begin with:
                            <input
                                type="number"
                                className={`text-input`}
                                value={startWith}
                                onChange={(e) => { setStartWith(parseInt(e.target.value)) }}
                                required />
                        </label>
                        <button className={`text-button ${styles.submitButton}`} type='submit' onClick={(e) => { handleSubmit('number', e) }}>Add step</button>
                    </Tab.Panel>
                    <Tab.Panel as='form' className={styles.tabPanelsForm}>
                        <label>
                            Description:
                            <input
                                className={`text-input`}
                                type="text"
                                placeholder='Is something done or not?'
                                value={description}
                                onChange={(e) => { setDescription(e.target.value) }}
                            />
                        </label>
                        <label>
                            Value:
                            True/False tutaj toggle
                        </label>
                        <button className={`text-button ${styles.submitButton}`} type='submit' onClick={(e) => { handleSubmit('boolean', e) }}>
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