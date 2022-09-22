import { forwardRef, ComponentPropsWithoutRef } from "react";
//interfaces
import { Status } from "../../interfaces";
//hooks
import { useDataContext } from "../../hooks/useDataContext";
//styles
import styles from './Kanban.module.scss'
//components
import { AnimatedPopover } from "../../components/AnimatedPopover/AnimatedPopover";
import { DraggableTaskCard } from "./TaskCard";
import { AddTaskForm } from "../../components/forms/AddTaskForm/AddTaskForm";
import { withOnDrop } from "../../components/DragAndDrop/withOnDrop";

interface StatusTaskListProps {
    status: Status
}

const StatusTaskList = forwardRef(({ status, ...props }: StatusTaskListProps & ComponentPropsWithoutRef<'div'>, ref) => {
    const { tasks } = useDataContext()

    return (
        <div className={styles.taskContainer} {...props} ref={ref as React.LegacyRef<HTMLDivElement>}>
            <AnimatedPopover className={styles.addTaskBtn} buttonText='Add new task'>
                <AddTaskForm
                    defaultStatus={status}
                />
            </AnimatedPopover>
            {tasks?.filter(task => task.statusId === status.id!)?.map(task => (
                <DraggableTaskCard
                    key={task.id}
                    task={task}
                />
            ))}
        </div>
    );
})

export const DropToStatusTaskList = withOnDrop(StatusTaskList)