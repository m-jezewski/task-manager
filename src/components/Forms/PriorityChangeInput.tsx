import styles from './InputStyles.module.scss'

interface PriorityChangeInputProps {
    priority: string
    setPriority: React.Dispatch<React.SetStateAction<string>>
    style?: React.CSSProperties
}

const PriorityChangeInput = ({ priority, setPriority, style }: PriorityChangeInputProps) => {

    const handleClick = () => {
        priority === 'low' ? setPriority('medium') : priority === 'medium' ? setPriority('high') : setPriority('low')
    }

    return (
        <input
            type='button'
            style={style}
            className={`icon circle ${priority}_prio ${styles.PriorityChangeInput}`}
            onClick={handleClick}
        />
    );
}

export default PriorityChangeInput;