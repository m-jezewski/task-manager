import { FormEvent, useContext, useState } from "react";
import { Status } from '../../interfaces'
import { UserContext } from '../../contexts/UserContext'
import { ClosePopoverContext } from "../AnimatedPopover/AnimatedPopover";
import styles from './AddStatusForm.module.css'
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/config";
import useDataContext from "../../hooks/useDataContext";

const AddStatusForm = () => {
    const { user } = useContext(UserContext)
    const closePopover = useContext(ClosePopoverContext)
    const { statuses } = useDataContext()
    const [status, setStatus] = useState('')
    const [color, setColor] = useState('#FFFFFF')


    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        closePopover && closePopover()
        addDoc(collection(db, 'statuses'), {
            uid: user?.uid,
            status: status,
            orderIndex: statuses ? statuses[statuses.length - 1].orderIndex + 1 : 0,
            color: color
        })
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