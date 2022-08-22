import { FormEvent, Fragment } from 'react';
//styles
import styles from './AddStep.module.scss'
//hooks
import useDb from '../../hooks/useDb';
import useDataContext from '../../hooks/useDataContext';
//components
import { Tab } from '@headlessui/react';
import AddTaskForm from '../Forms/AddTaskForm';
import AddNumberStepForm from '../Forms/AddNumberStepForm';
import AddBooleanStepForm from '../Forms/AddBooleanStepForm';

interface AddStepProps {
    newGoal?: boolean
    addStep?: any
    goalID?: string
}

const AddStep = ({ newGoal, addStep, goalID }: AddStepProps) => {
    const { statuses } = useDataContext()
    const { addDocument } = useDb('goalSteps')

    const handleSubmit = (type: 'boolean' | 'number' | 'task', e?: FormEvent, taskID?: string) => {
        e && e.preventDefault()
        const step = { type: 'task', progress: 0, taskID: taskID }
        newGoal ? addStep(step) : addDocument({ ...step, goalID: goalID })
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
                    <Tab.Panel as='div'>
                        <AddNumberStepForm
                            newGoal={newGoal!}
                            addStep={addStep}
                            goalID={goalID!}
                        />
                    </Tab.Panel>
                    <Tab.Panel as='div'>
                        <AddBooleanStepForm
                            newGoal={newGoal!}
                            addStep={addStep}
                            goalID={goalID!}
                        />
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