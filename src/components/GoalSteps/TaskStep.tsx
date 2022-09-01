import dayjs from "dayjs";
import { BooleanGoalStep, GoalStep, NumberGoalStep, Task, TaskGoalStep } from "../../interfaces";
import GoalStepCheckbox from "../ui/GoalStepCheckbox/GoalStepCheckbox";
import TaskPrioChangeBtn from "../ui/TaskPrioChangeBtn/TaskPrioChangeBtn";
import TaskStatusChangeBtn from "../ui/TaskStatusChangeBtn/TaskStatusChangeBtn";
import TaskDeleteBtn from "../ui/TaskDeleteBtn/TaskDeleteBtn";
import styles from './Steps.module.scss'
import useDataContext from "../../hooks/useDataContext";

interface TaskStepProps {
    step: TaskGoalStep
}

const TaskStep = ({ step }: TaskStepProps) => {
    const { tasks } = useDataContext()
    const task = tasks?.find(task => task.id === step.taskID)!

    return (
        <tr>
            {task && <>
                <td className={styles.smallCell}>
                    <GoalStepCheckbox goalStep={step} />
                </td>
                <td>
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
}

export default TaskStep;