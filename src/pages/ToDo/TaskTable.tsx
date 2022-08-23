import { useState } from 'react'

//interfaces
import { Space, Status, Task } from '../../interfaces'

//css
import styles from './ToDo.module.scss'

//components
import TaskTableItem from './TaskTableItem'
import AnimatedPopover from '../../components/AnimatedPopover/AnimatedPopover'
import AddTaskForm from '../../components/forms/AddTaskForm/AddTaskForm'
import StatusOrderChangeBtn from '../../components/ui/StatusOrderChangeBtn/StatusOrderChangeBtn'
import StatusDeleteBtn from '../../components/ui/StatusDeleteBtn/StatusDeleteBtn'
import DropToContainer from '../../components/DragAndDrop/DropToContainer/DropToContainer'
import StatusHideBtn from '../../components/ui/StatusHideBtn/StatusHideBtn'

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
                        <StatusHideBtn showStatus={showTable} setShowStatus={setShowTable} />
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
                        <StatusOrderChangeBtn
                            variant='up'
                            elemId={status.id!}
                            current={status}
                            buttonStyles={{ float: 'left' }} />
                        <StatusOrderChangeBtn
                            variant='down'
                            elemId={status.id!}
                            current={status} />
                    </th>
                    <th className={styles.smallCell}>
                        <StatusDeleteBtn
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