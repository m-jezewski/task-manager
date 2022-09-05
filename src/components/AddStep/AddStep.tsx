//styles
import styles from './AddStep.module.scss'
//components
import { Tab } from '@headlessui/react';
import AddTaskForm from '../forms/AddTaskForm/AddTaskForm';
import AddNumberStepForm from '../forms/GoalStepForms/AddNumberStepForm';
import AddBooleanStepForm from '../forms/GoalStepForms/AddBooleanStepForm';

interface AddStepProps {
    goalID?: string
}

const AddStep = ({ goalID }: AddStepProps) => {
    return (
        <div className={styles.container}>
            <Tab.Group>
                <h2 className={styles.subTitle}>
                    Describe your target in little steps <br />
                    How would you like to follow the progress of this step?
                </h2>
                <Tab.List className={styles.tabList}>
                    {({ selectedIndex }) => <>
                        <Tab className={`${styles.tab} ${selectedIndex === 0 && styles.tabActive}`} >Number</Tab>
                        <Tab className={`${styles.tab} ${selectedIndex === 1 && styles.tabActive}`} >True or False</Tab>
                        <Tab className={`${styles.tab} ${selectedIndex === 2 && styles.tabActive}`} >Task</Tab>
                    </>}
                </Tab.List>
                <Tab.Panels>
                    <Tab.Panel as='div'>
                        <AddNumberStepForm
                            goalID={goalID}
                        />
                    </Tab.Panel>
                    <Tab.Panel as='div'>
                        <AddBooleanStepForm goalID={goalID} />
                    </Tab.Panel>
                    <Tab.Panel as={'div'}>
                        <AddTaskForm
                            customStyles={styles.addTaskForm}
                            goalID={goalID!}
                            addGoalStep
                        />
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>
    );
}

export default AddStep;