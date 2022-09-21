import { Switch } from '@headlessui/react'
import styles from './DateInputs.module.scss'
import dayjs from 'dayjs'

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
                    aria-label='Click to open or close date and time inputs'
                    onChange={setOpenSwitch}>
                    <span className={`${openSwitch ? styles.switchInnerEnabled : styles.switchInnerDisabled} ${styles.switchInner}`} />
                </Switch>
            </label>
            <div className={styles.dateInputsContainer}>
                {openSwitch && <>
                    <label>
                        From:<br />
                        <input
                            type={'datetime-local'}
                            value={fromDate}
                            required
                            min={'2022-01-01T00:00'}
                            onChange={(e) => { setFromDate(e.target.value) }}
                        />
                    </label>
                    <br />
                    <label>
                        Due:<br />
                        <input
                            type={'datetime-local'}
                            required
                            min={dayjs(fromDate, `YYYY-MM-DDThh:mm`).format(`YYYY-MM-DDThh:mm`)}
                            value={dueDate}
                            onChange={(e) => { setDueDate(e.target.value) }}
                        />
                    </label>
                </>}
            </div>
        </div>
    );
}

export default DateInputs;