import { FormEvent, useContext, useState } from "react";
import { Status } from '../../interfaces'
import { UserContext } from '../../contexts/UserContext'
import styles from './AddStatusForm.module.css'
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/config";

interface AddStatusFormProps {
    statuses: Status[] | null
}

const AddStatusForm = ({ statuses }: AddStatusFormProps) => {
    const { user } = useContext(UserContext)
    const [status, setStatus] = useState('')
    const [color, setColor] = useState('')


    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()

        const newStatus = {
            uid: user?.uid,
            status: status,
            orderIndex: statuses ? statuses.length + 1 : 0,
            color: color
        }

        addDoc(collection(db, 'statuses'), newStatus)
    }

    return (
        <form onSubmit={handleSubmit} className={styles.container}>
            <h2 className={styles.subtitle}>Add new status:</h2>
            <label>
                Status name: <br />
                (ex. „In Progress”)
                <br />
                <input
                    type={'text'}
                    required
                    maxLength={20}
                    onChange={(e) => { setStatus(e.target.value) }}
                />
            </label>
            <label>
                Choose color:
                <br />
                <input
                    className={styles.color_picker}
                    type={'color'}
                    defaultValue={'#FFFFFF'}
                    onChange={(e) => { setColor(e.target.value) }}
                />
            </label>

            <button type={"submit"} className={styles.submit_button}>Submit</button>
        </form>
    )
}

export default AddStatusForm;