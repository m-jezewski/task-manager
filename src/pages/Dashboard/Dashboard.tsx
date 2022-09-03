import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout/Layout'
import TaskTableItem from '../../components/TaskTableItem/TaskTableItem';
import GoalLink from '../../components/ui/GoalLink/GoalLink';
import SpaceDeleteBtn from '../../components/ui/SpaceDeleteBtn/SpaceDeleteBtn';
import useDataContext from '../../hooks/useDataContext';
import { getHoursOfDate } from '../../utils/getHoursOfDate';
import { getTasksWithinDay } from '../../utils/getTasksWithinDay';
import AddSpaceForm from './AddSpaceForm/AddSpaceForm';
import styles from './Dashboard.module.scss'
import Subheader from './Subheader/Subheader';

const Dashboard = () => {
    const { tasks, spaces, statuses, goals } = useDataContext()
    const todaysTasks = tasks && getTasksWithinDay(tasks, getHoursOfDate(dayjs()))
    const highPrioTasks = tasks && tasks.filter(task => task.priority === 'high')
    const [showAddSpace, setShowAddSpace] = useState(false)
    const handleShowAddSpace = () => {
        setShowAddSpace(!showAddSpace)
    }

    return (
        <Layout title="Dashboard" showSpaceSelect={false}>
            <Subheader />
            <div className={styles.gridContainer}>
                <section className={styles.todaySection}>
                    <table>
                        <caption className={styles.todaysTasksCaption}>Today's tasks</caption>
                        <tbody>
                            {!todaysTasks || todaysTasks.length === 0 ?
                                <tr>
                                    <td>No task has been scheduled for today</td>
                                </tr> :
                                todaysTasks?.map(task =>
                                    <TaskTableItem key={task.id} task={task} />
                                )}
                        </tbody>
                    </table>
                </section>
                <section className={styles.highPrioSection}>
                    <table>
                        <caption className={styles.highPrioTasksCaption}>Current high priority tasks</caption>
                        <tbody>
                            {!highPrioTasks || highPrioTasks.length === 0 ?
                                <tr>
                                    <td>You don't have any high priority tasks right now</td>
                                </tr>
                                : highPrioTasks.map(task =>
                                    <TaskTableItem key={task.id} task={task} />
                                )
                            }
                        </tbody>
                    </table>
                </section>
                <section className={styles.goalProgressSection}>
                    <span className={`${styles.sectionHeader} ${styles.goalProgressCaption}`}>Goal progress</span>
                    <div className={styles.goalLinks}>
                        {!goals || goals.length === 0 ?
                            'no goals?'
                            :
                            goals.slice(0, 5).map(goal => <GoalLink goal={goal} />)
                        }
                    </div>
                </section>
                <section className={styles.spacesSection}>
                    <span className={`${styles.sectionHeader} ${styles.spacesCaption}`}>Spaces</span>
                    <div className={styles.spaces}>
                        <ul>
                            {!spaces || spaces.length === 0 ?
                                "You currently have no workspaces"
                                : spaces.map(space =>
                                    <li key={space.id}>
                                        {space.name}
                                        <br />
                                        <span className={styles.itemDescription}>
                                            {statuses?.filter(t => t.spaceId === space.id!).length} statuses, {tasks?.filter(t => t.spaceId === space.id!).length} tasks
                                        </span>
                                        <SpaceDeleteBtn space={space} buttonStyles={styles.spaceDeleteBtn} />
                                    </li>
                                )}
                        </ul>
                        {showAddSpace ?
                            <AddSpaceForm handleShowAddSpace={handleShowAddSpace} />
                            : <button className={styles.showAddSpaceBtn} onClick={handleShowAddSpace}>
                                Add new space
                            </button>
                        }
                    </div>
                </section>
            </div>
        </Layout>
    );
}

export default Dashboard;