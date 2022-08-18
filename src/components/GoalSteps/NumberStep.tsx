import { useState } from "react";
import { GoalStep, NumberGoalStep } from "../../interfaces";
import GoalNumberInputs from "../Inputs/GoalNumberInputs";
import GoalStepCheckbox from "../Inputs/GoalStepCheckbox";
import GoalStepNumButtons from "../Inputs/GoalStepNumButtons";
import DeleteGoalStepBtn from "./DeleteGoalStepBtn";
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
                <GoalNumberInputs goalStep={step} />
            </td>
            <td className={styles.descriptionCell}>
                {step.description}
            </td>
            <td colSpan={2} className={styles.buttonCell}>
                <GoalStepNumButtons goalStep={step} />
            </td>
            <td className={styles.smallCell}>
                <DeleteGoalStepBtn goalStep={step} />
            </td>
        </tr>
    );
}

export default NumberStep;