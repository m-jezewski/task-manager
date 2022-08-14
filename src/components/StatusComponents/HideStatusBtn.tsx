import styles from './HideStatusBtn.module.scss'

interface HideStatusBtnProps {
    showStatus: boolean
    setShowStatus: React.Dispatch<React.SetStateAction<boolean>>
}

const HideStatusBtn = ({ showStatus, setShowStatus }: HideStatusBtnProps) => {
    return (
        <button className={styles.hideButton} onClick={() => { setShowStatus(!showStatus) }}></button>
    );
}

export default HideStatusBtn;