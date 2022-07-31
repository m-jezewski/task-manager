import { useState, useContext, FormEvent } from 'react'
import { Status, Task } from '../../interfaces'
import { UserContext } from '../../contexts/UserContext'
import styles from './AddTaskForm.module.scss'
import { ClosePopoverContext } from '../AnimatedPopover/AnimatedPopover'
import useDataContext from '../../hooks/useDataContext'
import useDb from '../../hooks/useDb'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { Switch } from '@headlessui/react'
import { Timestamp } from 'firebase/firestore'

interface AddTaskFormProps {
    defaultStatus: Status
    direction: 'column' | 'row'
    position: 'absolute' | 'relative'
}

const AddTaskForm = ({ defaultStatus, direction, position }: AddTaskFormProps) => {
    const { addDocument, res } = useDb('tasks') // handle error res here
    const { user } = useContext(UserContext)
    const closePopover = useContext(ClosePopoverContext)
    const { tasks, statuses, selectedSpace } = useDataContext()
    const [dateEnabled, setDateEnabled] = useState(false)

    //form inputs
    const [text, setText] = useState('')
    const [status, setStatus] = useState<Status>(defaultStatus)
    const [priority, setPriority] = useState('low')

    dayjs.extend(customParseFormat)
    const defaultDate = dayjs().format('YYYY-MM-DDThh:mm')

    const [fromDate, setFromDate] = useState(defaultDate)
    const [dueDate, setDueDate] = useState(defaultDate)

    const handleClick = () => {
        priority === 'low' ? setPriority('medium') : priority === 'medium' ? setPriority('high') : setPriority('low')
    }

    const handleSubmit = (e: FormEvent) => {
        const from = dayjs(fromDate, `YYYY-MM-DDThh:mm`)
        const due = dayjs(dueDate, `YYYY-MM-DDThh:mm`)

        e.preventDefault()
        closePopover && closePopover()

        const task: Task = {
            uid: user?.uid!,
            description: text,
            priority: priority,
            orderIndex: tasks ? tasks.length + 1 : 0,
            space: selectedSpace.name,
            status: status.name,
            fromDate: null,
            dueDate: null,
        }

        if (dateEnabled && (from.isBefore(due) || from.isSame(due))) {
            addDocument({
                ...task,
                fromDate: from.unix(),
                dueDate: due.unix(),
            })
        }
        else {
            addDocument(task)
        }
    }

    return (
        <form onSubmit={handleSubmit} className={styles.form} style={{ position: position }}>
            <div className={styles.inner_container} style={{ flexDirection: direction }}>
                <label>
                    Status:
                    <br />
                    <select
                        className={styles.select_input}
                        value={status.id}
                        onChange={(e) => {
                            setStatus(statuses?.find(i => i.id === e.target.value)!)
                        }}
                        style={{ backgroundColor: status.color }}
                    >
                        {statuses?.map((status) => (
                            <option
                                key={status.id}
                                value={status.id}
                                className={styles.select_input}
                                style={{ backgroundColor: status.color }}
                            >
                                {status.name}
                            </option>
                        ))}
                    </select>
                </label>
                <label style={{ flexGrow: 1 }}>
                    Description:
                    <br />
                    <input
                        type={'text'}
                        required
                        className={styles.description_input}
                        maxLength={350}
                        value={text}
                        onChange={(e) => { setText(e.target.value) }}
                    />
                </label>
                <label>
                    Priority:
                    <input
                        type='button'
                        className={`icon circle ${priority}_prio`}
                        onClick={handleClick}
                    />
                </label>
            </div>
            <div className={styles.inner_container} style={{ flexDirection: direction }}>
                <div className={styles.dateEnabled_switch}>
                    Time frame?
                    <Switch
                        className={`${styles.switch} ${dateEnabled ? styles.switch_enabled : styles.switch_disabled}`}
                        checked={dateEnabled}
                        onChange={setDateEnabled}
                    >
                        <span
                            className={`${dateEnabled ? styles.switch_inner_enabled : styles.switch_inner_disabled} ${styles.switch_inner}`}
                        />
                    </Switch>
                </div>
                <div>
                    {dateEnabled && <>
                        <label>
                            From:<br />
                            <input
                                type={'datetime-local'}
                                className={styles.date_input}
                                value={fromDate}
                                required
                                min={'2022-01-01T00:00'}
                                onChange={(e) => { setFromDate(e.target.value) }}
                            />
                        </label>
                        <label>
                            Due:<br />
                            <input
                                type={'datetime-local'}
                                className={styles.date_input}
                                required
                                min={dayjs(fromDate, `YYYY-MM-DDThh:mm`).format(`YYYY-MM-DDThh:mm`)}
                                value={dueDate}
                                onChange={(e) => { setDueDate(e.target.value) }}
                            />
                        </label>
                    </>}
                </div>
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