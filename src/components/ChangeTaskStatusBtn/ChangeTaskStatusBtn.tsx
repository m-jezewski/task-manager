import { collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import useDataContext from '../../hooks/useDataContext';
import { Status, Task } from '../../interfaces';
import AnimatedPopover from '../AnimatedPopover/AnimatedPopover'
import styles from './ChangeTaskStatusBtn.module.css'

interface ChangeTaskStatusBtnProps {
    task: Task
}

const ChangeTaskStatusBtn = ({ task }: ChangeTaskStatusBtnProps) => {
    const { statuses } = useDataContext()
    const btnColor = statuses.filter(status => status.status === task.status)[0].color

    const handleStatusChange = (status: string) => {
        if (status !== task.status) {
            updateDoc(doc(collection(db, 'tasks'), task.id), { status: status })
        }
    }

    return (
        <AnimatedPopover buttonClass='icon' buttonColor={btnColor}>
            <div className={styles.popover_panel}>
                {statuses.map(({ status, color, id }) => (
                    <button
                        key={id}
                        onClick={() => { handleStatusChange(status) }}
                        className={`${styles.popover_button} darken_border_hover`}
                        style={{ backgroundColor: color }}>
                        {status}
                    </button>
                ))}
            </div>
        </AnimatedPopover>
    );
}

export default ChangeTaskStatusBtn;