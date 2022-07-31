import { FormEvent, useContext, useState } from "react";
import { UserContext } from '../../contexts/UserContext'
import { ClosePopoverContext } from "../AnimatedPopover/AnimatedPopover";
import styles from './AddStatusForm.module.scss'
import useDataContext from "../../hooks/useDataContext";
import useDb from "../../hooks/useDb";

const AddStatusForm = () => {
    const { addDocument, res } = useDb('statuses') // handle error res here

    const { user } = useContext(UserContext)
    const closePopover = useContext(ClosePopoverContext)
    const { statuses } = useDataContext()
    const [name, setName] = useState('')
    const [color, setColor] = useState('#FFFFFF')


    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        closePopover && closePopover()
        addDocument({
            uid: user?.uid,
            name: name,
            orderIndex: statuses ? statuses[statuses.length - 1].orderIndex + 1 : 0,
            color: color
        })
    }

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <h2>Add new status:</h2>
            <label>
                Status name: <br />
                (ex. „In Progress”)
                <br />
                <input
                    type={'text'}
                    required
                    maxLength={20}
                    onChange={(e) => { setName(e.target.value) }}
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

            <button type={"submit"} className={`${styles.submit_button} text-button`}>Submit</button>
        </form>
    )
}

export default AddStatusForm;