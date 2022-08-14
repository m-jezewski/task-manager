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
    openSwitch: boolean
    setOpenSwitch: React.Dispatch<React.SetStateAction<boolean>>
}

const DateInputs = ({ fromDate, dueDate, setFromDate, setDueDate, openSwitch = false, setOpenSwitch }: DateInputsProps) => {
    return (
        <div>
            <label className={styles.dateEnabledSwitch}>
                Time frame?
                <Switch
                    className={`${styles.switch} ${openSwitch ? styles.switchEnabled : styles.switchDisabled}`}
                    checked={openSwitch}
                    onChange={setOpenSwitch}
                >
                    <span
                        className={`${openSwitch ? styles.switchInnerEnabled : styles.switchInnerDisabled} ${styles.switchInner}`}
                    />
                </Switch>
            </label>
            <div className={styles.dateInputsContainer}>
                {openSwitch && <>
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