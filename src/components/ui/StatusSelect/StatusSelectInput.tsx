import useDataContext from "../../../hooks/useDataContext";
import { Status } from "../../../interfaces";
import styles from './StatusSelectInput.module.scss'

interface StatusSelectInputProps {
    status: Status | null
    setStatus: React.Dispatch<React.SetStateAction<Status | null>>
}

const StatusSelectInput = ({ status, setStatus }: StatusSelectInputProps) => {

    const { statuses } = useDataContext()

    return (
        status && <select
            className={styles.statusSelectInput}
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
                    className={styles.selectInput}
                    style={{ backgroundColor: status.color }}
                >
                    {status.name}
                </option>
            ))}
        </select>
    );
}

export default StatusSelectInput;