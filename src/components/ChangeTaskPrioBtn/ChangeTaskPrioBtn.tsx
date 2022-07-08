import { collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { Task } from "../../interfaces";

interface ChangeTaskPrioBtnProps {
    task: Task
}

const ChangeTaskPrioBtn = ({ task }: ChangeTaskPrioBtnProps) => {
    const handleClick = () => {
        const newPrio = task.priority === 'low' ? 'medium' : task.priority === 'medium' ? 'high' : 'low'
        updateDoc(doc(collection(db, 'tasks'), task.id), { priority: newPrio })
    }

    return (
        <button
            className={`icon circle ${task.priority}_prio`}
            onClick={handleClick}
        />
    );
}

export default ChangeTaskPrioBtn;