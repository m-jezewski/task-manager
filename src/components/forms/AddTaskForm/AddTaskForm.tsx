import { useState, useContext, FormEvent, useEffect } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
//interaces
import { Status, Task } from '../../../interfaces'
//styles
import styles from './AddTaskForm.module.scss'
//hooks
import useDataContext from '../../../hooks/useDataContext'
import useDb from '../../../hooks/useDb'
//components
import { ClosePopoverContext } from '../../AnimatedPopover/AnimatedPopover'
import StatusSelectInput from '../../ui/StatusSelect/StatusSelectInput'
import PriorityChangeInput from '../../ui/PriorityChangeButton/PriorityChangeInput'
import DateInputs from '../../ui/DateInputs/DateInputs'
import { DocumentReference } from 'firebase/firestore'
import useNewGoalContext from '../../../hooks/useNewGoalContext'
import NoStatuses from '../../NoStatuses/NoStatuses'

interface AddTaskFormProps {
    defaultStatus?: Status
    openDateInputSwitch?: boolean
    customStyles?: string
    defaultDate?: Dayjs
    addGoalStep?: boolean
    goalID?: string
}

dayjs.extend(customParseFormat)

const AddTaskForm = ({ defaultStatus, openDateInputSwitch = false, customStyles, defaultDate = dayjs(), goalID, addGoalStep }: AddTaskFormProps) => {
    const { addDocument: addTaskDocument } = useDb('tasks')
    const { addDocument: addGoalStepDocument } = useDb('goalSteps')
    const closePopover = useContext(ClosePopoverContext)
    const newGoalCtx = useNewGoalContext()
    const { tasks, selectedSpace, statuses } = useDataContext()
    const [openDateInputs, setOpenDateInputs] = useState(openDateInputSwitch)
    const [taskRef, setTaskRef] = useState<DocumentReference<any> | null>(null)
    //form inputs
    const [text, setText] = useState('')
    const [status, setStatus] = useState<Status | null>(defaultStatus ? defaultStatus : statuses && statuses[0])
    const [priority, setPriority] = useState('low')
    const [fromDate, setFromDate] = useState(defaultDate.format('YYYY-MM-DDThh:mm'))
    const [dueDate, setDueDate] = useState(defaultDate.format('YYYY-MM-DDThh:mm'))

    useEffect(() => {
        if (taskRef && addGoalStep) {
            if (newGoalCtx) {
                newGoalCtx.addStepInNewGoal({ type: 'task', progress: 0, taskID: taskRef.id! })
            } else {
                addGoalStepDocument({ type: 'task', progress: 0, taskID: taskRef.id!, goalID: goalID })
            }
        }
    }, [taskRef])


    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        const from = dayjs(fromDate, `YYYY-MM-DDThh:mm`)
        const due = dayjs(dueDate, `YYYY-MM-DDThh:mm`)
        closePopover && closePopover()

        let task: Task = {
            description: text,
            priority: priority,
            orderIndex: tasks ? tasks.length + 1 : 0,
            spaceId: selectedSpace ? selectedSpace.id! : '',
            statusId: status ? status.id! : '',
            fromDate: null,
            dueDate: null,
        }

        if (openDateInputs && (from.isBefore(due) || from.isSame(due))) {
            task = { ...task, fromDate: from.unix(), dueDate: due.unix() }
        }

        addTaskDocument(task).then(ref => {
            ref && setTaskRef(ref)
            setText('')
            setStatus(defaultStatus ? defaultStatus : statuses && statuses[0])
            setPriority('low')
            setOpenDateInputs(openDateInputSwitch)
            setDueDate(defaultDate.format('YYYY-MM-DDThh:mm'))
            setFromDate(defaultDate.format('YYYY-MM-DDThh:mm'))
        })
    }

    return (
        !statuses || statuses.length === 0 ?
            <NoStatuses elemStyles={`${styles.form} ${customStyles}`} />
            :
            <form onSubmit={handleSubmit} className={`${styles.form} ${customStyles}`}>
                <label>
                    Status:
                    <br />
                    <StatusSelectInput status={status} setStatus={setStatus} />
                </label>
                <label style={{ flexGrow: 1 }}>
                    Description:
                    <br />
                    <input
                        type={'text'}
                        required
                        className={styles.descriptionInput}
                        maxLength={550}
                        value={text}
                        onChange={(e) => { setText(e.target.value) }}
                    />
                </label>
                <label>
                    Priority:
                    <PriorityChangeInput priority={priority} setPriority={setPriority} />
                </label>
                <DateInputs
                    fromDate={fromDate}
                    setFromDate={setFromDate}
                    dueDate={dueDate}
                    setDueDate={setDueDate}
                    openSwitch={openDateInputs}
                    setOpenSwitch={setOpenDateInputs}
                />
                <button
                    type={"submit"}
                    className={styles.submitButton}
                >
                    Submit</button>
            </form>
    )
}

export default AddTaskForm;