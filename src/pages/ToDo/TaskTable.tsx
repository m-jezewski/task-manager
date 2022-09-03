import { useState } from 'react'
import { Fragment } from 'react'

//interfaces
import { Space, Status, Task } from '../../interfaces'

//css
import styles from './ToDo.module.scss'

//components
import AnimatedPopover from '../../components/AnimatedPopover/AnimatedPopover'
import AddTaskForm from '../../components/forms/AddTaskForm/AddTaskForm'
import StatusOrderChangeBtn from '../../components/ui/StatusOrderChangeBtn/StatusOrderChangeBtn'
import StatusDeleteBtn from '../../components/ui/StatusDeleteBtn/StatusDeleteBtn'
import DropToContainer from '../../components/DragAndDrop/DropToContainer/DropToContainer'
import StatusHideBtn from '../../components/ui/StatusHideBtn/StatusHideBtn'
import useDataContext from '../../hooks/useDataContext'
import TaskTableItem from '../../components/TaskTableItem/TaskTableItem'
import DraggableContainer from '../../components/DragAndDrop/DraggableContainer/DraggableContainer'

interface TaskTableProps {
    status: Status
}

const TaskTable = ({ status }: TaskTableProps) => {
    const { tasks } = useDataContext()
    const [showTable, setShowTable] = useState(true)
    const statusTasks = tasks?.filter((i: Task) => i.statusId === status.id)

    return (
        <DropToContainer
            key={status.id}
            className={styles.listContainer}
            Parent='table'
            status={status}>
            <caption>
                <StatusHideBtn showStatus={showTable} setShowStatus={setShowTable} />
                <span
                    className={styles.statusText}
                    style={{ backgroundColor: status.color }}>
                    {status.name.toUpperCase()}
                </span>
                <AnimatedPopover
                    buttonClass={styles.addTaskBtn}
                    buttonText='+'>
                    <AddTaskForm
                        formStyles={{ position: 'absolute', transform: '' }}
                        defaultStatus={status}
                    />
                </AnimatedPopover>
            </caption>
            <tbody>
                <tr>
                    <th colSpan={2} />
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
                        <StatusDeleteBtn status={status} />
                    </th>
                </tr>
                {showTable ? <>
                    {!statusTasks || statusTasks.length === 0 ?
                        <tr>
                            <td
                                className={styles.noTasks}
                                colSpan={5}>
                                No tasks
                            </td>
                        </tr>
                        : statusTasks.map((task: Task) => (
                            <TaskTableItem task={task} />
                        ))}</>
                    :
                    <tr>
                        <td
                            colSpan={5}
                            className={styles.hiddenTableCell} />
                    </tr>}
            </tbody>
        </DropToContainer >
    );
}

export default TaskTable;