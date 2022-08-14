import dayjs, { Dayjs } from "dayjs";
import styles from './InputStyles.module.scss'

interface DueDateInputProps {
    fromDate: string
    dueDate: string
    setDueDate: React.Dispatch<React.SetStateAction<string>>
}

const DueDateInput = ({ fromDate, dueDate, setDueDate }: DueDateInputProps) => {
    return (
        <input
            type={'datetime-local'}
            className={styles.dateInput}
            required
            min={dayjs(fromDate, `YYYY-MM-DDThh:mm`).format(`YYYY-MM-DDThh:mm`)}
            value={dueDate}
            onChange={(e) => { setDueDate(e.target.value) }}
        />
    );
}

export default DueDateInput;