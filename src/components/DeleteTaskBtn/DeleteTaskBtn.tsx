import { doc, collection, deleteDoc } from 'firebase/firestore'
import { db } from '../../firebase/config'
import { Task } from '../../interfaces'

interface DeleteTaskBtnProps {
    task: Task
}

const DeleteTaskBtn = ({ task }: DeleteTaskBtnProps) => {
    const handleClick = () => {
        deleteDoc(doc(collection(db, 'tasks'), task.id))
    }

    return (
        <button className={'trashcan icon circle'} onClick={handleClick} />
    );
}

export default DeleteTaskBtn;