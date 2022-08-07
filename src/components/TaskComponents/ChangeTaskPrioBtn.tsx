import useDb from "../../hooks/useDb";
import { Task } from "../../interfaces";

interface ChangeTaskPrioBtnProps {
    task: Task
}

const ChangeTaskPrioBtn = ({ task }: ChangeTaskPrioBtnProps) => {
    const { updateDocument, res } = useDb('tasks') // handle error res here

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        const newPrio = task.priority === 'low' ? 'medium' : task.priority === 'medium' ? 'high' : 'low'
        updateDocument(task.id!, { priority: newPrio })
    }

    return (
        <button
            className={`icon circle ${task.priority}_prio`}
            onClick={handleClick}
        />
    );
}

export default ChangeTaskPrioBtn;