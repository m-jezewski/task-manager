import { useState } from 'react'

//interfaces
import { Space, Status, Task } from '../../interfaces'

//css
import styles from './TaskTable.module.css'

//components
import ToDoItem from './ToDoItem'
import AnimatedPopover from '../../components/AnimatedPopover/AnimatedPopover'
import AddTaskForm from '../../components/AddTaskForm/AddTaskForm'
import ChangeStatusOrder from '../../components/ChangeStatusOrder/ChangeStatusOrder'
import DeleteStatusDialog from '../../components/DeleteStatusDialog/DeleteStatusDialog'

interface TaskTableProps {
    status: Status
    tasks: Task[]
    statuses: Status[]
    selectedSpace: Space
}

const TaskTable = ({ status, tasks, statuses, selectedSpace }: TaskTableProps) => {
    const [showTable, setShowTable] = useState(true)

    const filteredTasks = tasks.filter((i: Task) => i.status === status.status)

    return (
        <table key={status.id} className={styles.list_container}>
            <tbody>
                <>
                    <tr>
                        <th className={styles.small_cell} style={{ padding: '0px', textAlign: 'center' }}>
                            <button
                                className={`${styles.hideButton}`}
                                onClick={() => { setShowTable(!showTable) }} />
                        </th>
                        <th className={styles.status_th}>
                            <span className={styles.status_text} style={{ backgroundColor: status.color }}>
                                {status.status.toUpperCase()}
                            </span>
                            <AnimatedPopover buttonStyles={styles.add_task_button} buttonText='+'>
                                <AddTaskForm
                                    tasks={tasks}
                                    currentSpace={selectedSpace}
                                    statuses={statuses}
                                    defaultStatus={status}
                                />
                            </AnimatedPopover>
                        </th>
                        <th />
                        <th className={styles.small_cell}>
                            <ChangeStatusOrder variant='up' elemId={status.id!} current={status} buttonStyles={{ float: 'left' }} />
                            <ChangeStatusOrder variant='down' elemId={status.id!} current={status} />
                        </th>
                        <th className={styles.small_cell}>
                            <DeleteStatusDialog
                                status={status}
                                statuses={statuses}
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
                                        statuses={statuses}
                                        color={status.color}
                                    />))}
                        </> :
                        <tr>
                            <td />
                            <td colSpan={4} className={styles.hidden_table_cell} ></td>
                        </tr>}
                </>
            </tbody>
        </table >
    );
}

export default TaskTable;