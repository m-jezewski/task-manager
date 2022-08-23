import { useState, useContext, FormEvent, useEffect } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
//interaces
import { BooleanGoalStep, NumberGoalStep, Status, Task, TaskGoalStep } from '../../../interfaces'
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

interface AddTaskFormProps {
    defaultStatus: Status
    direction: 'column' | 'row'
    position: 'absolute' | 'relative'
    openDateInputSwitch?: boolean
    formStyles?: {}
    defaultDate?: Dayjs
    addGoalStep?: boolean
    goalID?: string
    addStepToNewGoal?: (step: NumberGoalStep | BooleanGoalStep | TaskGoalStep) => void
}

dayjs.extend(customParseFormat)

const AddTaskForm = ({
    defaultStatus,
    direction,
    position,
    openDateInputSwitch = false,
    formStyles,
    defaultDate = dayjs(),
    goalID,
    addStepToNewGoal,
    addGoalStep
}: AddTaskFormProps) => {
    const { addDocument: addTaskDocument } = useDb('tasks')
    const { addDocument: addGoalStepDocument } = useDb('goalSteps')
    const closePopover = useContext(ClosePopoverContext)
    const { tasks, selectedSpace } = useDataContext()
    const [openDateInputs, setOpenDateInputs] = useState(openDateInputSwitch)
    const [taskRef, setTaskRef] = useState<DocumentReference<any> | null>(null)
    //form inputs
    const [text, setText] = useState('')
    const [status, setStatus] = useState<Status | null>(defaultStatus)
    const [priority, setPriority] = useState('low')
    const [fromDate, setFromDate] = useState(defaultDate.format('YYYY-MM-DDThh:mm'))
    const [dueDate, setDueDate] = useState(defaultDate.format('YYYY-MM-DDThh:mm'))

    useEffect(() => {
        if (taskRef && addGoalStep) {
            console.log('now i should add goalStep')
            addStepToNewGoal ?
                addStepToNewGoal({ type: 'task', progress: 0, taskID: taskRef.id! })
                : addGoalStepDocument({ type: 'task', progress: 0, taskID: taskRef.id!, goalID: goalID })
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
            space: selectedSpace.name,
            status: status ? status.name : '',
            fromDate: null,
            dueDate: null,
        }

        if (openDateInputs && (from.isBefore(due) || from.isSame(due))) {
            task = {
                ...task,
                fromDate: from.unix(),
                dueDate: due.unix()
            }
        }

        addTaskDocument(task).then(ref => {
            ref && setTaskRef(ref)
            setText('')
            setStatus(defaultStatus)
            setPriority('low')
            setOpenDateInputs(openDateInputSwitch)
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