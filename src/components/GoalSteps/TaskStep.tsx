import dayjs from "dayjs";
import { BooleanGoalStep, GoalStep, NumberGoalStep, Task, TaskGoalStep } from "../../interfaces";
import GoalStepCheckbox from "../ui/GoalStepCheckbox/GoalStepCheckbox";
import TaskPrioChangeBtn from "../ui/TaskPrioChangeBtn/TaskPrioChangeBtn";
import TaskStatusChangeBtn from "../ui/TaskStatusChangeBtn/TaskStatusChangeBtn";
import TaskDeleteBtn from "../ui/TaskDeleteBtn/TaskDeleteBtn";
import styles from './Steps.module.scss'

interface TaskStepProps {
    step: NumberGoalStep | BooleanGoalStep | TaskGoalStep
    task: Task
}

const TaskStep = ({ step, task }: TaskStepProps) => {
    return (
        task && <tr>
            <td className={styles.smallCell}>
                <GoalStepCheckbox goalStep={step} />
            </td>
            <td>
                <TaskStatusChangeBtn task={task} />
            </td>
            <td className={styles.descriptionCell}>
                {task.description}
            </td>
            <td>
                {task.dueDate ? dayjs.unix(task.dueDate).format('DD/MM') : '-/-'}
            </td>
            <td className={styles.smallCell}>
                <TaskPrioChangeBtn task={task} />
            </td>
            <td className={styles.smallCell}>
                <TaskDeleteBtn task={task} goalStep={step} />
            </td>
        </tr>
    );
}

export default TaskStep;