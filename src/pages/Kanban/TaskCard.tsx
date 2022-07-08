import ChangeTaskStatusBtn from "../../components/ChangeTaskStatusBtn/ChangeTaskStatusBtn";
import DeleteTaskBtn from "../../components/DeleteTaskBtn/DeleteTaskBtn";
import ChangeTaskPrioBtn from "../../components/ChangeTaskPrioBtn/ChangeTaskPrioBtn";
import { Task } from "../../interfaces";
import styles from './TaskCard.module.css'
import DraggableContainer from '../../components/DraggableContainer/DraggableContainer'

interface TaskCardProps {
    task: Task
}

const TaskCard = ({ task }: TaskCardProps) => {
    return (
        <DraggableContainer task={task} Parent={"div"} parentStyles={styles.container}>
            <p>{task.text}</p>
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