import { Switch } from "@headlessui/react";
import useDb from "../../../hooks/useDb";
import useNewGoalContext from "../../../hooks/useNewGoalContext";
import { BooleanGoalStep } from "../../../interfaces";
import styles from './GoalStepSwitch.module.scss'

interface GoalStepSwitchProps {
    goalStep: BooleanGoalStep
}

const GoalStepSwitch = ({ goalStep }: GoalStepSwitchProps) => {

    const { updateDocument } = useDb('goalSteps')
    const newGoalCtx = useNewGoalContext()

    const handleChange = () => {
        newGoalCtx ? newGoalCtx.updateStepInNewGoal(goalStep.id!, { progress: goalStep?.progress === 1 ? 0 : 1 }) : updateDocument(goalStep.id!, { progress: goalStep.progress === 1 ? 0 : 1 })
    }

    return (
        <Switch
            className={styles.goalStepSwitch}
            checked={goalStep.progress === 1}
            onChange={handleChange}
        >
            <span className={(goalStep.progress === 1) ? styles.switchInnerEnabled : styles.switchInnerDisabled} />
        </Switch>
    );
}

export default GoalStepSwitch;