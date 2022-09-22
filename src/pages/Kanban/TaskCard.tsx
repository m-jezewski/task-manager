import { forwardRef, ComponentPropsWithoutRef } from "react";
import dayjs from "dayjs";
//interfaces
import { Task } from "../../interfaces";
//styles
import styles from './Kanban.module.scss'
//components
import { TaskStatusChangeBtn } from "../../components/ui/TaskStatusChangeBtn/TaskStatusChangeBtn";
import { TaskDeleteBtn } from "../../components/ui/TaskDeleteBtn/TaskDeleteBtn";
import { TaskPrioChangeBtn } from "../../components/ui/TaskPrioChangeBtn/TaskPrioChangeBtn";
import { withDraggable } from "../../components/DragAndDrop/withDraggable";

interface TaskCardProps {
    task: Task
}

const TaskCard = forwardRef(({ task, ...props }: TaskCardProps & ComponentPropsWithoutRef<'div'>, ref) => {
    return (
        <div className={styles.taskCard} ref={ref as React.LegacyRef<HTMLDivElement>} {...props}>
            <p>{task.description}</p>
            {task.dueDate && task.fromDate && <span className={styles.date}>
                {dayjs.unix(task.fromDate).format('DD/MM HH:mm')}  -  {dayjs.unix(task.dueDate).format('DD/MM HH:mm')}
            </span>}
            <hr />
            <div className={styles.infoButtonRow}>
                <TaskPrioChangeBtn task={task} />
                <div>
                    <TaskStatusChangeBtn task={task} />
                </div>
                <TaskDeleteBtn task={task} />
            </div>
        </div>
    );
})

export const DraggableTaskCard = withDraggable(TaskCard)
