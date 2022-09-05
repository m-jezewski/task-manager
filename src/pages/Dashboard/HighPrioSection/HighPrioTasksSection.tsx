import TaskTableItem from '../../../components/TaskTableItem/TaskTableItem';
import useDataContext from '../../../hooks/useDataContext';
import styles from './HighPrioTaskSection.module.scss'


const HighPrioTaskSection = () => {
    const { tasks } = useDataContext()
    const highPrioTasks = tasks && tasks.filter(task => task.priority === 'high')

    return (
        <section className={styles.highPrioSection}>
            <table>
                <caption className={styles.highPrioTasksCaption}>Current high priority tasks</caption>
                <tbody>
                    {!highPrioTasks || highPrioTasks.length === 0 ?
                        <tr>
                            <td className={styles.noTasks}>You don't have any high priority tasks right now</td>
                        </tr>
                        : highPrioTasks.map(task =>
                            <TaskTableItem key={task.id} task={task} />
                        )
                    }
                </tbody>
            </table>
        </section>
    );
}

export default HighPrioTaskSection;