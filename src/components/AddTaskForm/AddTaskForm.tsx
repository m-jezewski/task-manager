import { useState, useContext, FormEvent } from 'react'
import { Space, Task, Status } from '../../interfaces'
import { UserContext } from '../../contexts/UserContext'
import styles from './AddTaskForm.module.css'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../firebase/config'

interface AddTaskFormProps {
    tasks: Task[] | null
    statuses: Status[] | null
    currentSpace: Space
    defaultStatus: Status
}

const AddTaskForm = ({ currentSpace, tasks, statuses, defaultStatus }: AddTaskFormProps) => {
    const { user } = useContext(UserContext)
    const [text, setText] = useState('')
    const [status, setStatus] = useState<Status>(defaultStatus)
    const [priority, setPriority] = useState('low')

    const handleClick = () => {
        priority === 'low' ? setPriority('medium') : priority === 'medium' ? setPriority('high') : setPriority('low')
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()

        const newTask = {
            uid: user?.uid,
            text: text,
            priority: priority,
            orderIndex: tasks ? tasks.length + 1 : 0,
            space: currentSpace.space,
            status: status.status,
        }

        console.log(newTask)

        addDoc(collection(db, 'tasks'), newTask)
            .catch((e) => { console.log(e) })
    }

    return (
        <form onSubmit={handleSubmit} className={styles.container}>
            <div className={styles.label_container}>
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
                                {status.status}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Description:
                    <br />
                    <input
                        type={'text'}
                        required
                        className={styles.description_input}
                        maxLength={100}
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
            <button type={"submit"} className={styles.submit_button}>Submit</button>
        </form>
    )
}

export default AddTaskForm;