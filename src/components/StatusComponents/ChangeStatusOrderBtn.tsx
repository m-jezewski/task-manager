import styles from './ChangeStatusOrder.module.scss'
import { CSSProperties, useContext } from 'react'
import { DataContext } from '../../contexts/DataContext'
import { Status, Task } from '../../interfaces'
import useDb from '../../hooks/useDb'

interface ChangeStatusOrderBtnProps {
    variant: 'up' | 'down' | 'left' | 'right'
    elemId: string
    current: Status
    buttonStyles?: CSSProperties

}

const ChangeStatusOrderBtn = ({ variant, elemId, current, buttonStyles }: ChangeStatusOrderBtnProps) => {
    const { statuses } = useContext(DataContext) as { tasks: Task[], statuses: Status[] }
    const { updateDocument, res } = useDb('statuses') // handle error res here

    const handleClick = () => {
        let inc = 0;
        variant === 'up' || variant === 'left' ? inc = -1 : inc = 1
        const adjacent = statuses[statuses.findIndex((status) => status.id === elemId) + inc]
        if (!adjacent) return

        updateDocument(elemId, {
            orderIndex: adjacent.orderIndex
        })
        updateDocument(adjacent.id!, {
            orderIndex: current.orderIndex
        })
    }

    return (
        <button className={`${styles[variant]} ${styles.orderButton}`} style={buttonStyles} onClick={handleClick} />
    );
}

export default ChangeStatusOrderBtn;