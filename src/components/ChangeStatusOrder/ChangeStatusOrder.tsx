import styles from './ChangeStatusOrder.module.css'
import { CSSProperties, useContext } from 'react'
import { DataContext } from '../../contexts/DataContext'
import { Status, Task } from '../../interfaces'
import { collection, doc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase/config'

interface ChangeStatusOrderProps {
    variant: 'up' | 'down' | 'left' | 'right'
    elemId: string
    current: Status
    buttonStyles?: CSSProperties

}

const ChangeStatusOrder = ({ variant, elemId, current, buttonStyles }: ChangeStatusOrderProps) => {
    const { statuses } = useContext(DataContext) as { tasks: Task[], statuses: Status[] }

    const handleClick = () => {
        let inc = 0;
        variant === 'up' || variant === 'right' ? inc = -1 : inc = 1
        const adjacent = statuses[statuses.findIndex((status) => status.id === elemId) + inc]
        if (!adjacent) return

        updateDoc(doc(collection(db, 'statuses'), elemId), {
            orderIndex: adjacent.orderIndex
        })
        updateDoc(doc(collection(db, 'statuses'), adjacent.id), {
            orderIndex: current.orderIndex
        })

        console.log(statuses)
    }

    return (
        <button className={`${styles[variant]} ${styles.button} icon`} style={buttonStyles} onClick={handleClick} />
    );
}

export default ChangeStatusOrder;