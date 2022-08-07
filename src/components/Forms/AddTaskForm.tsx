import { useState, useContext, FormEvent, useEffect } from 'react'
import { Status, Task } from '../../interfaces'
import styles from './AddTaskForm.module.scss'
import { ClosePopoverContext } from '../AnimatedPopover/AnimatedPopover'
import useDataContext from '../../hooks/useDataContext'
import useDb from '../../hooks/useDb'
import dayjs, { Dayjs } from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import StatusSelectInput from './StatusSelectInput'
import PriorityChangeInput from './PriorityChangeInput'
import DateInputs from './DateInputs'

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
    const [timeFrame, setTimeFrame] = useState(defaultTimeFrame)

    //form inputs
    const [text, setText] = useState('')
    const [status, setStatus] = useState<Status | null>(defaultStatus)
    const [priority, setPriority] = useState('low')
    const [fromDate, setFromDate] = useState(defaultDate.format('YYYY-MM-DDThh:mm'))
    const [dueDate, setDueDate] = useState(defaultDate.format('YYYY-MM-DDThh:mm'))

    useEffect(() => {
        // if task is also a goal step add new goalStep with new task id
        if (res.docRef && addGoalStep) {
            addGoalStep('task', undefined, res.docRef.id)
        }
    }, [addGoalStep, res.docRef])


    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        const from = dayjs(fromDate, `YYYY-MM-DDThh:mm`)
        const due = dayjs(dueDate, `YYYY-MM-DDThh:mm`)
        closePopover && closePopover()

        const task: Task = {
            description: text,
            priority: priority,
            orderIndex: tasks ? tasks.length + 1 : 0,
            space: selectedSpace.name,
            status: status ? status.name : '',
            fromDate: null,
            dueDate: null,
        }

        if (timeFrame && (from.isBefore(due) || from.isSame(due))) {
            addDocument({
                ...task,
                fromDate: from.unix(),
                dueDate: due.unix(),
            })
        } else { addDocument(task) }
    }

    return (
        <form onSubmit={handleSubmit} className={styles.form} style={{ position: position, ...formStyles }}>
            <div className={styles.inner_container} style={{ flexDirection: direction }}>
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
                        className={styles.description_input}
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
            <div className={styles.inner_container} style={{ flexDirection: direction }}>
                <DateInputs
                    fromDate={fromDate}
                    setFromDate={setFromDate}
                    dueDate={dueDate}
                    setDueDate={setDueDate}
                    timeFrame={timeFrame}
                    setTimeFrame={setTimeFrame}
                />
                <button
                    type={"submit"}
                    className={`${styles.submit_button} text-button`}
                    style={{ alignSelf: direction === 'row' ? 'flex-end' : 'center' }}
                >
                    Submit</button>
            </div>
        </form>
    )
}

export default AddTaskForm;