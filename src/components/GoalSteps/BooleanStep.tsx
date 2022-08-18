import { BooleanGoalStep, GoalStep } from "../../interfaces";
import GoalStepCheckbox from "../Inputs/GoalStepCheckbox";
import GoalStepSwitch from "../Inputs/GoalStepSwitch";
import DeleteGoalStepBtn from "./DeleteGoalStepBtn";
import styles from './Steps.module.scss';

interface BooleanStepProps {
    step: BooleanGoalStep
}

const BooleanStep = ({ step }: BooleanStepProps) => {
    return (
        <tr>
            <td className={styles.smallCell}>
                <GoalStepCheckbox goalStep={step} />
            </td>
            <td className={styles.booleanStatusCell}>{step.progress === 1 ? "True" : "False"}</td>
            <td className={styles.descriptionCell}>{step.description}</td>
            <td colSpan={2} className={styles.buttonCell}>
                <GoalStepSwitch goalStep={step} />
            </td>
            <td className={styles.smallCell}>
                <DeleteGoalStepBtn goalStep={step} />
            </td>
        </tr>
    );
}

export default BooleanStep;