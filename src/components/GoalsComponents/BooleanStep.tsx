import { GoalStep } from "../../interfaces";
import styles from './Steps.module.scss';

interface BooleanStepProps {
    step: GoalStep
}

const BooleanStep = ({ step }: BooleanStepProps) => {
    return (
        <tr>
            <td className={styles.smallCell}><input type='checkbox' /></td>
            <td>true/false</td>
            <td className={styles.descriptionCell}>{step.description}</td>
            <td colSpan={2}>jakis switch</td>
            <td className={styles.smallCell}>X</td>
        </tr>
    );
}

export default BooleanStep;