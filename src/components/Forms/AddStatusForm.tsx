import { FormEvent, useContext, useState } from "react";
//contexts
import { ClosePopoverContext } from "../AnimatedPopover/AnimatedPopover";
//styles
import styles from './AddStatusForm.module.scss'
//hooks
import useDataContext from "../../hooks/useDataContext";
import useDb from "../../hooks/useDb";

const AddStatusForm = () => {
    const { addDocument, res } = useDb('statuses') // handle error res here

    const closePopover = useContext(ClosePopoverContext)
    const { statuses } = useDataContext()
    const [name, setName] = useState('')
    const [color, setColor] = useState('#FFFFFF')


    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        closePopover && closePopover()
        addDocument({
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
                    className={styles.textInput}
                    required
                    maxLength={20}
                    onChange={(e) => { setName(e.target.value) }}
                />
            </label>
            <label>
                Choose color:
                <br />
                <input
                    className={styles.colorPicker}
                    type={'color'}
                    defaultValue={'#FFFFFF'}
                    onChange={(e) => { setColor(e.target.value) }}
                />
            </label>

            <button type={"submit"} className={styles.submitButton}>Submit</button>
        </form>
    )
}

export default AddStatusForm;