import { Dayjs } from "dayjs";
import AnimatedPopover from "../../components/AnimatedPopover/AnimatedPopover";
import AddTaskForm from "../../components/Forms/AddTaskForm";
import { Status } from "../../interfaces";
import DateLink from "./DateLink";
import styles from './Calendar.module.scss'

interface SubHeaderProps {
    date: Dayjs
    statuses: Status[]
    moveBy: 'day' | 'week' | 'month'
    dateHeader: string
}

const SubHeader = ({ date, statuses, moveBy, dateHeader }: SubHeaderProps) => {
    return (
        <div className={styles.subHeader}>
            <DateLink
                by={moveBy}
                move="back"
                date={date}
            />
            <h2>{dateHeader}</h2>
            <DateLink
                by={moveBy}
                move="forward"
                date={date}
            />
            <AnimatedPopover
                buttonClass={`${styles.addTaskButton} darken_border_hover text-button`}
                buttonText={'Add new task'}>
                <AddTaskForm
                    defaultStatus={statuses && statuses[0]}
                    direction={"column"}
                    position={"absolute"}
                    defaultTimeFrame
                    formStyles={{ transform: 'translate(calc(-100% - 0.5rem), 1rem)' }}
                    defaultDate={date}
                />
            </AnimatedPopover>
        </div>
    );
}

export default SubHeader;