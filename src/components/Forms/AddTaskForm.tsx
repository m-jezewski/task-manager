import { useState, useContext, FormEvent, useEffect } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
//interaces
import { Status, Task } from '../../interfaces'
//styles
import styles from './AddTaskForm.module.scss'
//hooks
import useDataContext from '../../hooks/useDataContext'
import useDb from '../../hooks/useDb'
//components
import { ClosePopoverContext } from '../AnimatedPopover/AnimatedPopover'
import StatusSelectInput from '../Inputs/StatusSelectInput'
import PriorityChangeInput from '../Inputs/PriorityChangeInput'
import DateInputs from '../Inputs/DateInputs'
import { DocumentReference } from 'firebase/firestore'

interface AddTaskFormProps {
    defaultStatus: Status
    direction: 'column' | 'row'
    position: 'absolute' | 'relative'
    defaultTimeFrame?: boolean
    formStyles?: {}
    defaultDate?: Dayjs
    addGoalStep?: (type: 'boolean' | 'number' | 'task', e?: FormEvent, taskID?: string) => void
}

dayjs.extend(customParseFormat)

const AddTaskForm = ({
    defaultStatus,
    direction,
    position,
    defaultTimeFrame = false,
    formStyles,
    defaultDate = dayjs(),
    addGoalStep
}: AddTaskFormProps) => {
    const { addDocument, res } = useDb('tasks')
    const closePopover = useContext(ClosePopoverContext)
    const { tasks, selectedSpace } = useDataContext()
    const [openDateInputs, setOpenDateInputs] = useState(defaultTimeFrame)
    const [taskRef, setTaskRef] = useState<DocumentReference<any> | null>(null)

    //form inputs
    const [text, setText] = useState('')
    const [status, setStatus] = useState<Status | null>(defaultStatus)
    const [priority, setPriority] = useState('low')
    const [fromDate, setFromDate] = useState(defaultDate.format('YYYY-MM-DDThh:mm'))
    const [dueDate, setDueDate] = useState(defaultDate.format('YYYY-MM-DDThh:mm'))

    useEffect(() => {
        taskRef && addGoalStep && addGoalStep('task', undefined, taskRef.id)
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
            space: selectedSpace.name,
            status: status ? status.name : '',
            fromDate: null,
            dueDate: null,
        }

        if (openDateInputs && (from.isBefore(due) || from.isSame(due))) {
            task.fromDate = from.unix()
            task.dueDate = due.unix()
        }

        addDocument(task).then(ref => {
            ref && setTaskRef(ref)
            setText('')
            setStatus(defaultStatus)
            setPriority('low')
            setOpenDateInputs(defaultTimeFrame)
            setDueDate(defaultDate.format('YYYY-MM-DDThh:mm'))
            setFromDate(defaultDate.format('YYYY-MM-DDThh:mm'))
        })
    }

    return (
        <form onSubmit={handleSubmit} className={styles.form} style={{ position: position, ...formStyles }}>
            <div className={styles.innerContainer} style={{ flexDirection: direction }}>
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
            </div>
            <div className={styles.innerContainer} style={{ flexDirection: direction }}>
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
                    style={{ alignSelf: direction === 'row' ? 'flex-end' : 'center' }}
                >
                    Submit</button>
            </div>
        </form>
    )
}

export default AddTaskForm;