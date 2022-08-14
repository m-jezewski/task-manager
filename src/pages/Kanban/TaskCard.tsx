import ChangeTaskStatusBtn from "../../components/TaskComponents/ChangeTaskStatusBtn";
import DeleteTaskBtn from "../../components/TaskComponents/DeleteTaskBtn";
import ChangeTaskPrioBtn from "../../components/TaskComponents/ChangeTaskPrioBtn";
import { Task } from "../../interfaces";
import styles from './Kanban.module.scss'
import DraggableContainer from '../../components/DragAndDrop/DraggableContainer'
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
                <ChangeTaskStatusBtn task={task} />
                <ChangeTaskPrioBtn task={task} />
                <DeleteTaskBtn task={task} />
            </div>
        </DraggableContainer>
    );
}

export default TaskCard;