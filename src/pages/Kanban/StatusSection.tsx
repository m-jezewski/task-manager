import { Status, Task } from "../../interfaces";
import styles from './StatusSection.module.css'
import TaskCard from "./TaskCard";
import ChangeStatusOrderBtn from '../../components/ChangeStatusOrderBtn/ChangeStatusOrderBtn'
import { useState } from "react";
import DeleteStatusDialog from '../../components/DeleteStatusDialog/DeleteStatusDialog'
import AnimatedPopover from '../../components/AnimatedPopover/AnimatedPopover'
import AddTaskForm from '../../components/AddTaskForm/AddTaskForm'
import DropToContainer from "../../components/DropToContainer/DropToContainer";

interface StatusSectionProps {
    status: Status
    tasks: Task[]
}

const StatusSection = ({ status, tasks }: StatusSectionProps) => {
    const filteredTasks = tasks.filter((i: Task) => i.status === status.status)
    const [showSection, setShowSection] = useState(true)

    return (
        <>
            {showSection ?
                <section >
                    <div className={styles.section_header} style={{ backgroundColor: status.color }}>
                        <div>
                            <button className='hide_button' onClick={() => { setShowSection(false) }} />
                            <ChangeStatusOrderBtn variant='left' elemId={status.id!} current={status} />
                        </div>
                        <h3>{status.status}</h3>
                        <div>
                            <DeleteStatusDialog
                                status={status}
                                filteredTasks={filteredTasks}
                            />
                            <ChangeStatusOrderBtn variant='right' elemId={status.id!} current={status} />
                        </div>
                    </div>
                    <>
                        <AnimatedPopover buttonClass={`${styles.add_task} darken_border_hover`} buttonText='Add new task'>
                            <AddTaskForm
                                direction='column'
                                position='relative'
                                defaultStatus={status}
                            />
                        </AnimatedPopover>
                        <DropToContainer
                            Parent='div'
                            status={status}
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
                <section className={styles.section_hidden} style={{ backgroundColor: status.color }}>
                    <button className='hide_button' onClick={() => { setShowSection(true) }} />
                </section>
            }
        </>
    );
}

export default StatusSection;