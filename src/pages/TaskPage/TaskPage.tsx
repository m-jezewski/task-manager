import dayjs from "dayjs";
import { updateDoc } from "firebase/firestore";
import React, { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DateInputs from "../../components/Inputs/DateInputs";
import PriorityChangeInput from "../../components/Inputs/PriorityChangeInput";
import SpaceSelect from "../../components/Inputs/SpaceSelect";
import StatusSelectInput from "../../components/Inputs/StatusSelectInput";
import Layout from "../../components/Layout/Layout";
import useDataContext from "../../hooks/useDataContext";
import useDb from "../../hooks/useDb";
import { Space, Status, Task } from "../../interfaces";
import styles from './TaskPage.module.scss'

const TaskPage = () => {
    const navigate = useNavigate()
    const { tasks, statuses, selectedSpace } = useDataContext()
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
        if (task && statuses && selectedSpace) {
            setDescription(task.description)
            setSpace(selectedSpace)
            setStatus(statuses.find(status => status.name === task?.status)!)
            setPriority(task?.priority)
            if (task.dueDate && task.fromDate) {
                setOpenSwitch(true)
                setDueDate(dayjs.unix(task.dueDate).format('YYYY-MM-DDThh:mm'))
                setFromDate(dayjs.unix(task.fromDate).format('YYYY-MM-DDThh:mm'))
            }
        }
    }, [statuses, task, selectedSpace])

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        const from = dayjs(fromDate, `YYYY-MM-DDThh:mm`)
        const due = dayjs(dueDate, `YYYY-MM-DDThh:mm`)

        let updatedTask: Task = {
            description: description,
            priority: priority,
            orderIndex: tasks ? tasks.length + 1 : 0,
            space: selectedSpace.name,
            status: status ? status.name : '',
            fromDate: null,
            dueDate: null,
        }

        if (openSwitch && (from.isBefore(due) || from.isSame(due))) {
            updatedTask.fromDate = dayjs(fromDate, `YYYY-MM-DDThh:mm`).unix()
            updatedTask.dueDate = dayjs(dueDate, `YYYY-MM-DDThh:mm`).unix()
        }

        task && updateDocument(task.id!, updatedTask)
        navigate(-1)
    }

    return (
        <Layout title='Update task' spaceSelect={false}>
            {task && status &&
                <form className={styles.taskForm} onSubmit={handleSubmit}>
                    <textarea value={description} onChange={(e: any) => { setDescription(e.target.value) }} rows={10} />
                    <div className={styles.row}>
                        <label style={{ flexGrow: 1 }}>
                            Status:<br />
                            <StatusSelectInput status={status} setStatus={setStatus} />
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
                        <SpaceSelect space={space} setSpace={setSpace} usage='form' />
                    </label>

                    <button type='submit' className={styles.submitButton}>Save changes</button>
                </form>
            }
        </Layout>
    );
}

export default TaskPage;