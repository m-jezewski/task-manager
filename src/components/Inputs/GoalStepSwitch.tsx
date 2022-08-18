import { Switch } from "@headlessui/react";
import useDb from "../../hooks/useDb";
import { BooleanGoalStep } from "../../interfaces";
import styles from './InputStyles.module.scss'

interface GoalStepSwitchProps {
    goalStep?: BooleanGoalStep
    newStepValue?: number
    setNewStepValue?: React.Dispatch<React.SetStateAction<number>>
}

const GoalStepSwitch = ({ goalStep, newStepValue, setNewStepValue }: GoalStepSwitchProps) => {

    const { updateDocument } = useDb('goalSteps')

    const handleChange = () => {
        goalStep ? updateDocument(goalStep.id!, { progress: goalStep.progress === 1 ? 0 : 1 }) : setNewStepValue!(newStepValue === 1 ? 0 : 1)
    }

    return (
        <Switch
            className={styles.goalStepSwitch}
            checked={goalStep ? goalStep.progress === 1 : newStepValue === 1}
            onChange={handleChange}
        >
            <span className={`${(goalStep && goalStep.progress === 1) || newStepValue! ? styles.switchInnerEnabled : styles.switchInnerDisabled}`} />
        </Switch>
    );
}

export default GoalStepSwitch;