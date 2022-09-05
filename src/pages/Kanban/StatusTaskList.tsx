import { forwardRef, ComponentPropsWithoutRef } from "react";
import AnimatedPopover from "../../components/AnimatedPopover/AnimatedPopover";
import AddTaskForm from "../../components/forms/AddTaskForm/AddTaskForm";
import useDataContext from "../../hooks/useDataContext";
import { Status } from "../../interfaces";
import DraggableTaskCard from "./TaskCard";
import styles from './Kanban.module.scss'
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

const DropToStatusTaskList = withOnDrop(StatusTaskList)

export default DropToStatusTaskList;