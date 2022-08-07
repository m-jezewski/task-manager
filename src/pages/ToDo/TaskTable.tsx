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
            parentStyles={styles.list_container}
            Parent='table'
            status={status}>
            <tbody>
                <tr>
                    <th
                        className={styles.small_cell}
                        style={{ padding: '0px' }}>
                        <button
                            className='hide_button'
                            onClick={() => { setShowTable(!showTable) }} />
                    </th>
                    <th className={styles.th_status}>
                        <span
                            className={styles.status_text}
                            style={{ backgroundColor: status.color }}>
                            {status.name.toUpperCase()}
                        </span>
                        <AnimatedPopover
                            buttonClass={`${styles.add_task_btn} text-button darken_border_hover`}
                            buttonText='+'>
                            <AddTaskForm
                                position='absolute'
                                direction='row'
                                defaultStatus={status}
                            />
                        </AnimatedPopover>
                    </th>
                    <th />
                    <th className={`${styles.th_dueDate} ${styles.small_cell}`}>
                        Due:
                    </th>
                    <th className={styles.small_cell}>
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
                    <th className={styles.small_cell}>
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
                                className={styles.no_tasks}
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
                            className={styles.hidden_table_cell} />
                    </tr>}
            </tbody>
        </DropToContainer >
    );
}

export default TaskTable;