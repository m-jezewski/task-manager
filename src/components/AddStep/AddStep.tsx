import { FormEvent, Fragment } from 'react';
//styles
import styles from './AddStep.module.scss'
//hooks
import useDb from '../../hooks/useDb';
import useDataContext from '../../hooks/useDataContext';
//components
import { Tab } from '@headlessui/react';
import AddTaskForm from '../forms/AddTaskForm/AddTaskForm';
import AddNumberStepForm from '../forms/GoalStepForms/AddNumberStepForm';
import AddBooleanStepForm from '../forms/GoalStepForms/AddBooleanStepForm';
import { BooleanGoalStep, NumberGoalStep, TaskGoalStep } from '../../interfaces';

interface AddStepProps {
    addStepToNewGoal?: (step: NumberGoalStep | BooleanGoalStep | TaskGoalStep) => void
    goalID?: string
}

const AddStep = ({ addStepToNewGoal, goalID }: AddStepProps) => {
    const { statuses } = useDataContext()
    const { addDocument } = useDb('goalSteps')

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
                            addStepToNewGoal={addStepToNewGoal}
                            goalID={goalID!}
                        />
                    </Tab.Panel>
                    <Tab.Panel as='div'>
                        <AddBooleanStepForm
                            addStepToNewGoal={addStepToNewGoal}
                            goalID={goalID!}
                        />
                    </Tab.Panel>
                    <Tab.Panel as={'div'}>
                        {statuses &&
                            <AddTaskForm
                                direction="column"
                                position="relative"
                                defaultStatus={statuses[0]}
                                addStepToNewGoal={addStepToNewGoal}
                                goalID={goalID!}
                                addGoalStep
                            />}
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>
    );
}

export default AddStep;