import { useState } from 'react'

//interfaces
import { Space, Status, Task } from '../../interfaces'

//css
import styles from './ToDo.module.scss'

//components
import TaskTableItem from './TaskTableItem'
import AnimatedPopover from '../../components/AnimatedPopover/AnimatedPopover'
import AddTaskForm from '../../components/Forms/AddTaskForm'
import ChangeStatusOrderBtn from '../../components/StatusComponents/ChangeStatusOrderBtn'
import DeleteStatusDialog from '../../components/StatusComponents/DeleteStatusDialog'
import DropToContainer from '../../components/DragAndDrop/DropToContainer'
import HideStatusBtn from '../../components/StatusComponents/HideStatusBtn'

interface TaskTableProps {
    status: Status
    tasks: Task[]
    statuses: Status[]
    selectedSpace: Space
}

const TaskTable = ({ status, tasks }: TaskTableProps) => {
    const [showTable, setShowTable] = useState(true)

    const filteredTasks = tasks.filter((i: Task) => i.status === status.name)

    return (
        <DropToContainer
            key={status.id}
            parentStyles={styles.listContainer}
            Parent='table'
            status={status}>
            <tbody>
                <tr>
                    <th
                        className={styles.smallCell}
                        style={{ padding: '0px' }}>
                        <HideStatusBtn showStatus={showTable} setShowStatus={setShowTable} />
                    </th>
                    <th className={styles.thStatus}>
                        <span
                            className={styles.statusText}
                            style={{ backgroundColor: status.color }}>
                            {status.name.toUpperCase()}
                        </span>
                        <AnimatedPopover
                            buttonClass={styles.addTaskBtn}
                            buttonText='+'>
                            <AddTaskForm
                                position='absolute'
                                direction='row'
                                defaultStatus={status}
                            />
                        </AnimatedPopover>
                    </th>
                    <th />
                    <th className={`${styles.thDueDate} ${styles.smallCell}`}>
                        Due:
                    </th>
                    <th className={styles.smallCell}>
                        <ChangeStatusOrderBtn
                            variant='up'
                            elemId={status.id!}
                            current={status}
                            buttonStyles={{ float: 'left' }} />
                        <ChangeStatusOrderBtn
                            variant='down'
                            elemId={status.id!}
                            current={status} />
                    </th>
                    <th className={styles.smallCell}>
                        <DeleteStatusDialog
                            status={status}
                            filteredTasks={filteredTasks} />
                    </th>
                </tr>
                {showTable ? <>
                    {filteredTasks.length === 0 ?
                        <tr>
                            <td />
                            <td
                                className={styles.noTasks}
                                colSpan={5}>
                                No tasks
                            </td>
                        </tr>
                        : filteredTasks.map((task: Task) => (
                            <TaskTableItem
                                key={task.id}
                                todo={task} />
                        ))}</>
                    :
                    <tr>
                        <td />
                        <td
                            colSpan={5}
                            className={styles.hiddenTableCell} />
                    </tr>}
            </tbody>
        </DropToContainer >
    );
}

export default TaskTable;