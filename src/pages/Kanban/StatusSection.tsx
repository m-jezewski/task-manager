import { Status, Task } from "../../interfaces";
import styles from './StatusSection.module.scss'
import TaskCard from "./TaskCard";
import ChangeStatusOrderBtn from '../../components/StatusComponents/ChangeStatusOrderBtn'
import { useState } from "react";
import DeleteStatusDialog from '../../components/StatusComponents/DeleteStatusDialog'
import AnimatedPopover from '../../components/AnimatedPopover/AnimatedPopover'
import AddTaskForm from '../../components/Forms/AddTaskForm'
import DropToContainer from "../../components/DragAndDrop/DropToContainer";

interface StatusSectionProps {
    status: Status
    tasks: Task[]
}

const StatusSection = ({ status, tasks }: StatusSectionProps) => {
    const filteredTasks = tasks.filter((i: Task) => i.status === status.name)
    const [showSection, setShowSection] = useState(true)

    return (
        <>
            {showSection ?
                <section className={styles.section}>
                    <div className={styles.section_header} style={{ backgroundColor: status.color }}>
                        <div className={styles.section_header_div}>
                            <button className='hide_button' onClick={() => { setShowSection(false) }} />
                            <ChangeStatusOrderBtn variant='left' elemId={status.id!} current={status} />
                        </div>
                        <h2>{status.name}</h2>
                        <div className={styles.section_header_div}>
                            <DeleteStatusDialog
                                status={status}
                                filteredTasks={filteredTasks}
                            />
                            <ChangeStatusOrderBtn variant='right' elemId={status.id!} current={status} />
                        </div>
                    </div>
                    <>
                        <AnimatedPopover buttonClass={`${styles.add_task} darken_border_hover text-button`} buttonText='Add new task'>
                            <AddTaskForm
                                direction='column'
                                position='relative'
                                defaultStatus={status}
                            />
                        </AnimatedPopover>
                        <DropToContainer
                            Parent='div'
                            status={status}
                            parentStyles={styles.task_container}
                        >
                            {filteredTasks.map(task => (
                                <TaskCard
                                    key={task.id}
                                    task={task}
                                />
                            ))}
                        </DropToContainer>
                    </>
                </section > :
                <section className={`${styles.section_hidden} ${styles.section}`} style={{ backgroundColor: status.color }}>
                    <button className='hide_button' onClick={() => { setShowSection(true) }} />
                </section>
            }
        </>
    );
}

export default StatusSection;