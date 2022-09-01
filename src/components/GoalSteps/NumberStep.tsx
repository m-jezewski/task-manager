import { NumberGoalStep } from "../../interfaces";
import GoalStepCheckbox from "../ui/GoalStepCheckbox/GoalStepCheckbox";
import GoalStepNumberInputs from "../ui/GoalStepNumberInputs/GoalStepNumberInputs";
import GoalStepNumButtons from "../ui/GoalStepNumButtons/GoalStepNumButtons";
import GoalStepDeleteBtn from "../ui/GoalStepDeleteBtn/GoalStepDeleteBtn";
import styles from './Steps.module.scss'

interface NumberStepProps {
    step: NumberGoalStep
}

const NumberStep = ({ step }: NumberStepProps) => {
    return (
        <tr>
            <td className={styles.smallCell}>
                <GoalStepCheckbox goalStep={step} />
            </td>
            <td className={styles.numberInputCell}>
                <GoalStepNumberInputs goalStep={step} />
            </td>
            <td className={styles.descriptionCell}>
                {step.description}
            </td>
            <td colSpan={2}>
                <GoalStepNumButtons goalStep={step} />
            </td>
            <td className={styles.smallCell}>
                <GoalStepDeleteBtn goalStep={step} />
            </td>
        </tr>
    );
}

export default NumberStep;