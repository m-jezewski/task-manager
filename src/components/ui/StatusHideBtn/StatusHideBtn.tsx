import styles from './StatusHideBtn.module.scss'

interface StatusHideBtnProps {
    showStatus: boolean
    setShowStatus: React.Dispatch<React.SetStateAction<boolean>>
}

const StatusHideBtn = ({ showStatus, setShowStatus }: StatusHideBtnProps) => {
    return (
        <button
            className={styles.hideButton}
            onClick={() => { setShowStatus(!showStatus) }}
            aria-label='Click to collapse table'
        />
    );
}

export default StatusHideBtn;