import styles from './PriorityChangeInput.module.scss'

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
            className={`${styles.PriorityChangeInput} ${priority}_prio`}
            onClick={handleClick}
        />
    );
}

export default PriorityChangeInput;