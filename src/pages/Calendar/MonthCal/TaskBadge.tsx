//interfaces
import { Task } from "../../../interfaces";
//hooks
import { useDataContext } from "../../../hooks/useDataContext";
//styles
import styles from './MonthCal.module.scss'
//components
import { withTaskLink } from "../../../components/hoc/withTaskLink";
import { ComponentPropsWithoutRef, forwardRef } from "react";

interface TaskBadgeProps {
    task: Task
}

const TaskBadge = forwardRef<HTMLDivElement, TaskBadgeProps & ComponentPropsWithoutRef<'div'>>(({ task, ...props }, ref) => {
    const { statuses } = useDataContext()

    return (
        <div
            ref={ref}
            {...props}
            style={{
                backgroundColor: statuses?.find((status) => status.id! === task.statusId)?.color,
            }}
            className={styles.taskBadge}
        />
    );
})

export const TaskBadgeLink = withTaskLink(TaskBadge)