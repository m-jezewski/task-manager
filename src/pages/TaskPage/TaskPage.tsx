import dayjs from "dayjs";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DateInputs from "../../components/ui/DateInputs/DateInputs";
import PriorityChangeInput from "../../components/ui/PriorityChangeButton/PriorityChangeInput";
import SpaceSelect from "../../components/ui/SpaceSelect/SpaceSelect";
import StatusSelectInput from "../../components/ui/StatusSelect/StatusSelectInput";
import Layout from "../../components/Layout/Layout/Layout";
import useDataContext from "../../hooks/useDataContext";
import useDb from "../../hooks/useDb";
import { Space, Status, Task } from "../../interfaces";
import styles from './TaskPage.module.scss'
import TaskDeleteModal from "./TaskDeleteModal/TaskDeleteModal";

const TaskPage = () => {
    const navigate = useNavigate()
    const { tasks, statuses, spaces } = useDataContext()
    const { taskID } = useParams()
    const { updateDocument } = useDb('tasks')
    const task = tasks && tasks.find(i => i.id === taskID)
    const [dueDate, setDueDate] = useState('')
    const [fromDate, setFromDate] = useState('')
    const [priority, setPriority] = useState('low')
    const [status, setStatus] = useState<Status | null>(null)
    const [space, setSpace] = useState<Space | null>(null)
    const [description, setDescription] = useState('')
    const [openSwitch, setOpenSwitch] = useState(false)

    useEffect(() => {
        if (!task || !statuses || !spaces) return

        setDescription(task.description)
        setSpace(spaces.find(space => space.id! === task.spaceId)!)
        setStatus(statuses.find(status => status.id === task.statusId)!)
        setPriority(task.priority)
        if (task.dueDate && task.fromDate) {
            setOpenSwitch(true)
            setDueDate(dayjs.unix(task.dueDate).format('YYYY-MM-DDThh:mm'))
            setFromDate(dayjs.unix(task.fromDate).format('YYYY-MM-DDThh:mm'))
        }
    }, [statuses, task, spaces])

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        const from = dayjs(fromDate, `YYYY-MM-DDThh:mm`)
        const due = dayjs(dueDate, `YYYY-MM-DDThh:mm`)

        let updatedTask: Task = {
            description: description,
            priority: priority,
            spaceId: space ? space.id! : '',
            statusId: status ? status.id! : '',
            fromDate: null,
            dueDate: null,
        }

        if (openSwitch && (from.isBefore(due) || from.isSame(due))) {
            updatedTask = {
                ...updatedTask,
                fromDate: from.unix(),
                dueDate: due.unix()
            }
        }
        task && updateDocument(task.id!, updatedTask)
        navigate(-1)
    }

    return (
        <Layout title='Update task'>
            <form className={styles.taskForm} onSubmit={handleSubmit}>
                <label>
                    Description:
                    <textarea
                        value={description}
                        onChange={(e: any) => { setDescription(e.target.value) }}
                        rows={10}
                        maxLength={550}
                    />
                </label>
                <div className={styles.row}>
                    <label style={{ flexGrow: 1 }}>
                        Status:<br />
                        <StatusSelectInput status={status} setStatus={setStatus} space={space} />
                    </label>
                    <label>
                        Priority:
                        <PriorityChangeInput priority={priority} setPriority={setPriority} />
                    </label>
                </div>
                <div className={styles.dateInputsContainer}>
                    <DateInputs
                        dueDate={dueDate}
                        setDueDate={setDueDate}
                        fromDate={fromDate}
                        setFromDate={setFromDate}
                        openSwitch={openSwitch}
                        setOpenSwitch={setOpenSwitch}
                    />
                </div>
                <label>
                    Space:<br />
                    <SpaceSelect space={space} setSpace={setSpace} className={styles.spaceSelect} />
                </label>
                <div className={styles.buttonRow}>
                    <button
                        type='button'
                        className={styles.returnButton}
                        onClick={() => { navigate(-1) }}>
                        Go back
                    </button>
                    {task && <TaskDeleteModal task={task} />}
                    <button
                        type='submit'
                        className={styles.submitButton}>
                        Save changes
                    </button>
                </div>
            </form>
        </Layout>
    );
}

export default TaskPage;