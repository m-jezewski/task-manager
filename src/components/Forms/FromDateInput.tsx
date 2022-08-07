import styles from './InputStyles.module.scss'

interface FromDateInputProps {
    fromDate: string
    setFromDate: React.Dispatch<React.SetStateAction<string>>
}

const FromDateInput = ({ fromDate, setFromDate }: FromDateInputProps) => {
    return (
        <input
            type={'datetime-local'}
            className={styles.date_input}
            value={fromDate}
            required
            min={'2022-01-01T00:00'}
            onChange={(e) => { setFromDate(e.target.value) }}
        />
    );
}

export default FromDateInput;