import TaskStatusChangeBtn from "../../components/ui/TaskStatusChangeBtn/TaskStatusChangeBtn";
import TaskDeleteBtn from "../../components/ui/TaskDeleteBtn/TaskDeleteBtn";
import TaskPrioChangeBtn from "../../components/ui/TaskPrioChangeBtn/TaskPrioChangeBtn";
import { Task } from "../../interfaces";
import styles from './Kanban.module.scss'
import DraggableContainer from '../../components/DragAndDrop/DraggableContainer/DraggableContainer'
import dayjs from "dayjs";

interface TaskCardProps {
    task: Task
}

const TaskCard = ({ task }: TaskCardProps) => {
    return (
        <DraggableContainer task={task} Parent={"div"} parentStyles={styles.taskCard}>
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
        </DraggableContainer>
    );
}

export default TaskCard;