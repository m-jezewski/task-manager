import { Status, Task } from "../../../interfaces";

interface TaskBadgeProps {
    task: Task
    statuses: Status[]
}

const TaskBadge = ({ task, statuses }: TaskBadgeProps) => {
    return (
        <div
            style={{
                backgroundColor: statuses.filter((status) => status.name === task.status)[0].color,
                width: '2rem',
                height: '1rem',
                borderRadius: '0.3rem',
            }}
        />
    );
}

export default TaskBadge;