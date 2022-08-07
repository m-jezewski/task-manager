import ChangeTaskStatusBtn from "../../components/TaskComponents/ChangeTaskStatusBtn";
import DeleteTaskBtn from "../../components/TaskComponents/DeleteTaskBtn";
import ChangeTaskPrioBtn from "../../components/TaskComponents/ChangeTaskPrioBtn";
import { Task } from "../../interfaces";
import styles from './Kanban.module.scss'
import DraggableContainer from '../../components/DragAndDrop/DraggableContainer'

interface TaskCardProps {
    task: Task
}

const TaskCard = ({ task }: TaskCardProps) => {
    return (
        <DraggableContainer task={task} Parent={"div"} parentStyles={styles.taskCard}>
            <p>{task.description}</p>
            <hr />
            <div className={styles.info_button_row}>
                <ChangeTaskStatusBtn task={task} />
                <ChangeTaskPrioBtn task={task} />
                <DeleteTaskBtn task={task} />
            </div>
        </DraggableContainer>
    );
}

export default TaskCard;