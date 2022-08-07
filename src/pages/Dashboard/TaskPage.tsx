import dayjs from "dayjs";
import { updateDoc } from "firebase/firestore";
import React, { ChangeEventHandler, FormEvent, FormEventHandler, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DateInputs from "../../components/Forms/DateInputs";
import PriorityChangeInput from "../../components/Forms/PriorityChangeInput";
import SpaceSelect from "../../components/Forms/SpaceSelect";
import StatusSelectInput from "../../components/Forms/StatusSelectInput";
import Layout from "../../components/Layout/Layout";
import ChangeTaskPrioBtn from "../../components/TaskComponents/ChangeTaskPrioBtn";
import useDataContext from "../../hooks/useDataContext";
import useDb from "../../hooks/useDb";
import { Space, Status } from "../../interfaces";
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
    const [timeFrame, setTimeFrame] = useState(false)

    useEffect(() => {
        if (task && statuses && selectedSpace) {
            setDescription(task.description)
            setSpace(selectedSpace)
            setStatus(statuses.find(status => status.name === task?.status)!)
            setPriority(task?.priority)
            if (task.dueDate && task.fromDate) {
                setTimeFrame(true)
                setDueDate(dayjs.unix(task.dueDate).format('YYYY-MM-DDThh:mm'))
                setFromDate(dayjs.unix(task.fromDate).format('YYYY-MM-DDThh:mm'))
            }
        }
    }, [statuses, task, selectedSpace])

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        task && updateDocument(task.id!, {
            description: description,
            space: space?.name,
            status: status?.name,
            priority: priority,
        })

        navigate(-1)
    }

    return (
        <Layout title='Update task' spaceSelect={false}>
            {task && status &&
                <form className={styles.taskForm}>
                    <textarea value={description} onChange={(e: any) => { setDescription(e.target.value) }} rows={10} />
                    <div className={styles.row}>
                        <label style={{ flexGrow: 1 }}>
                            Status:
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
                            timeFrame={timeFrame}
                            setTimeFrame={setTimeFrame}
                        />
                    </div>
                    <label>
                        Space:
                        <SpaceSelect space={space} setSpace={setSpace} usage='form' />
                    </label>

                    <button type={'submit'} onClick={handleSubmit} className={`text-button darken_border_hover ${styles.submit_button}`}>Save changes</button>
                </form>
            }
        </Layout>
    );
}

export default TaskPage;