import { useState } from 'react'

//interfaces
import { Space, Status, Task } from '../../interfaces'

//css
import styles from './TaskTable.module.css'

//components
import ToDoItem from './ToDoItem'
import AnimatedPopover from '../../components/AnimatedPopover/AnimatedPopover'
import AddTaskForm from '../../components/AddTaskForm/AddTaskForm'
import ChangeStatusOrderBtn from '../../components/ChangeStatusOrderBtn/ChangeStatusOrderBtn'
import DeleteStatusDialog from '../../components/DeleteStatusDialog/DeleteStatusDialog'
import DropToContainer from '../../components/DropToContainer/DropToContainer'

interface TaskTableProps {
    status: Status
    tasks: Task[]
    statuses: Status[]
    selectedSpace: Space
}

const TaskTable = ({ status, tasks }: TaskTableProps) => {
    const [showTable, setShowTable] = useState(true)

    const filteredTasks = tasks.filter((i: Task) => i.status === status.status)

    return (
        <DropToContainer key={status.id} parentStyles={styles.list_container} Parent='table' status={status}>
            <tbody>
                <>
                    <tr>
                        <th className={styles.small_cell} style={{ padding: '0px', textAlign: 'center' }}>
                            <button
                                className='hide_button'
                                onClick={() => { setShowTable(!showTable) }} />
                        </th>
                        <th className={styles.status_th}>
                            <span className={styles.status_text} style={{ backgroundColor: status.color }}>
                                {status.status.toUpperCase()}
                            </span>
                            <AnimatedPopover buttonClass={styles.add_task_button} buttonText='+'>
                                <AddTaskForm
                                    position='absolute'
                                    direction='row'
                                    defaultStatus={status}
                                />
                            </AnimatedPopover>
                        </th>
                        <th />
                        <th className={styles.small_cell}>
                            <ChangeStatusOrderBtn variant='up' elemId={status.id!} current={status} buttonStyles={{ float: 'left' }} />
                            <ChangeStatusOrderBtn variant='down' elemId={status.id!} current={status} />
                        </th>
                        <th className={styles.small_cell}>
                            <DeleteStatusDialog
                                status={status}
                                filteredTasks={filteredTasks}
                            />
                        </th>
                    </tr>
                    {showTable ?
                        <>
                            {filteredTasks.length === 0 ?
                                <tr>
                                    <td />
                                    <td className={styles.no_tasks} colSpan={4}>No tasks</td>
                                </tr>
                                : filteredTasks.map((task: Task) => (
                                    <ToDoItem
                                        key={task.id}
                                        todo={task}
                                    />))}
                        </> :
                        <tr>
                            <td />
                            <td colSpan={4} className={styles.hidden_table_cell} ></td>
                        </tr>}
                </>
            </tbody>
        </DropToContainer >
    );
}

export default TaskTable;