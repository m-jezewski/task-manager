import dayjs from "dayjs";
//interfaces
import { Task, TaskGoalStep } from "../../../interfaces";
//styles
import styles from './Steps.module.scss'
//components
import { GoalStepCheckbox } from "../../../components/ui/GoalStepCheckbox/GoalStepCheckbox";
import { TaskPrioChangeBtn } from "../../../components/ui/TaskPrioChangeBtn/TaskPrioChangeBtn";
import { TaskStatusChangeBtn } from "../../../components/ui/TaskStatusChangeBtn/TaskStatusChangeBtn";
import { TaskDeleteBtn } from "../../../components/ui/TaskDeleteBtn/TaskDeleteBtn";
import { withTaskLink } from "../../../components/hoc/withTaskLink";
import { ComponentPropsWithoutRef, forwardRef } from "react";

type TaskStepProps = {
    step: TaskGoalStep
    task: Task
}

const TaskStep = forwardRef<HTMLTableRowElement, TaskStepProps & ComponentPropsWithoutRef<'tr'>>(({ step, task, ...props }, ref) => {
    return (
        <tr ref={ref} {...props}>
            {task && <>
                <td className={styles.smallCell}>
                    <GoalStepCheckbox goalStep={step} />
                </td>
                <td className={styles.numberInputCell}>
                    <div className={styles.icon}>
                        <TaskStatusChangeBtn task={task} />
                    </div>
                </td>
                <td className={styles.descriptionCell}>
                    {task.description}
                </td>
                <td className={styles.dueDate}>
                    {task.dueDate ? dayjs.unix(task.dueDate).format('DD/MM') : ' '}
                </td>
                <td className={styles.smallCell}>
                    <TaskPrioChangeBtn task={task} />
                </td>
                <td className={styles.smallCell}>
                    <TaskDeleteBtn task={task} />
                </td>
            </>}
        </tr>
    );
})

export const TaskStepWithLink = withTaskLink(TaskStep)