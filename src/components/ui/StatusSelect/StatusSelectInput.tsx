//interfaces
import { Space, Status } from "../../../interfaces";
//hooks
import { useEffect } from 'react'
import { useDataContext } from "../../../hooks/useDataContext";
//styles
import styles from './StatusSelectInput.module.scss'

interface StatusSelectInputProps {
    space: Space | null
    status: Status | null
    setStatus: React.Dispatch<React.SetStateAction<Status | null>>
}

export const StatusSelectInput = ({ space, status, setStatus }: StatusSelectInputProps) => {
    const { statuses, selectedSpace } = useDataContext()
    const spaceStatuses = space ? statuses?.filter(s => s.spaceId === space.id) : statuses?.filter(s => s.spaceId === selectedSpace?.id)

    useEffect(() => {
        spaceStatuses?.find(s => s.id === status?.id) === undefined && setStatus((spaceStatuses && spaceStatuses[0]) || null)
    }, [spaceStatuses])


    return (
        <select
            id='spaceSelect'
            className={styles.statusSelectInput}
            value={status?.id}
            required
            onChange={(e) => {
                setStatus(spaceStatuses?.find(i => i.id === e.target.value)!)
            }}
            style={{ backgroundColor: status?.color }}
        >
            {!spaceStatuses || spaceStatuses.length === 0 ?
                <option
                    value={''}
                    className={styles.selectInput}>
                    You cannot add task to space without any statuses
                </option>
                : spaceStatuses?.map((status) => (
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

