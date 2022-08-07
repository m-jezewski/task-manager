import { Switch } from '@headlessui/react'
import { useState } from 'react'
import styles from './InputStyles.module.scss'
import DueDateInput from './DueDateInput'
import FromDateInput from './FromDateInput'

interface DateInputsProps {
    fromDate: string
    dueDate: string
    setFromDate: React.Dispatch<React.SetStateAction<string>>
    setDueDate: React.Dispatch<React.SetStateAction<string>>
    timeFrame: boolean
    setTimeFrame: React.Dispatch<React.SetStateAction<boolean>>
}

const DateInputs = ({ fromDate, dueDate, setFromDate, setDueDate, timeFrame = false }: DateInputsProps) => {
    const [dateEnabled, setDateEnabled] = useState(timeFrame)

    return (
        <div>
            <label className={styles.dateEnabled_switch}>
                Time frame?
                <Switch
                    className={`${styles.switch} ${dateEnabled ? styles.switch_enabled : styles.switch_disabled}`}
                    checked={dateEnabled}
                    onChange={setDateEnabled}
                >
                    <span
                        className={`${dateEnabled ? styles.switch_inner_enabled : styles.switch_inner_disabled} ${styles.switch_inner}`}
                    />
                </Switch>
            </label>
            <div className={styles.dateInputsContainer}>
                {dateEnabled && <>
                    <label>
                        From:<br />
                        <FromDateInput
                            fromDate={fromDate}
                            setFromDate={setFromDate}
                        />
                    </label>
                    <br />
                    <label>
                        Due:<br />
                        <DueDateInput
                            dueDate={dueDate}
                            fromDate={fromDate}
                            setDueDate={setDueDate}
                        />
                    </label>
                </>}
            </div>
        </div>
    );
}

export default DateInputs;