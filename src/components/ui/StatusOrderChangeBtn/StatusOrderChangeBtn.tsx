import styles from './StatusOrderChangeBtn.module.scss'
import { Status } from '../../../interfaces'
import useDb from '../../../hooks/useDb'
import useDataContext from '../../../hooks/useDataContext'

interface StatusOrderChangeBtnProps {
    variant: 'up' | 'down' | 'left' | 'right'
    elemId: string
    current: Status
}

const StatusOrderChangeBtn = ({ variant, elemId, current }: StatusOrderChangeBtnProps) => {
    const { statuses, selectedSpace } = useDataContext()
    const currentSpaceStatuses = statuses?.filter(s => s.spaceId === selectedSpace?.id!)
    const { updateDocument } = useDb('statuses')

    const handleClick = () => {
        let inc = variant === 'up' || variant === 'left' ? -1 : 1
        const adjacent = currentSpaceStatuses && currentSpaceStatuses[currentSpaceStatuses.findIndex((status) => status.id === elemId) + inc]
        if (!adjacent) return
        updateDocument(elemId, { orderIndex: adjacent.orderIndex })
        updateDocument(adjacent.id!, { orderIndex: current.orderIndex })
    }

    return (
        <button className={`${styles[variant]} ${styles.orderButton}`} onClick={handleClick} />
    );
}

export default StatusOrderChangeBtn;