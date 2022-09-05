import styles from './PriorityChangeInput.module.scss'

interface PriorityChangeInputProps {
    priority: string
    setPriority: React.Dispatch<React.SetStateAction<string>>
}

const PriorityChangeInput = ({ priority, setPriority }: PriorityChangeInputProps) => {
    const handleClick = () => {
        priority === 'low' ? setPriority('medium') : priority === 'medium' ? setPriority('high') : setPriority('low')
    }

    return (
        <input
            type='button'
            className={`${styles.PriorityChangeInput} ${priority}_prio`}
            onClick={handleClick}
        />
    );
}

export default PriorityChangeInput;