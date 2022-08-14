import { GoalStep } from "../../interfaces";
import styles from './Steps.module.scss'

interface NumberStepProps {
    step: GoalStep
}

const NumberStep = ({ step }: NumberStepProps) => {
    return (
        <tr>
            <td className={styles.smallCell}>
                <input type='checkbox' />
            </td>
            <td>{step.startWith} / {step.target}</td>
            <td className={styles.descriptionCell}>{step.description}</td>
            <td colSpan={2}>inc/dec</td>
            <td className={styles.smallCell}>X</td>
        </tr>
    );
}

export default NumberStep;