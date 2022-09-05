
//interfaces
import { Status } from '../../interfaces'

//components
import Layout from "../../components/Layout/Layout/Layout";
import AddStatusForm from "../../components/forms/AddStatusForm/AddStatusForm";
import AnimatedPopover from "../../components/AnimatedPopover/AnimatedPopover";
import TaskTable from './TaskTable'
import useDataContext from '../../hooks/useDataContext';
import styles from './ToDo.module.scss'
import NoSpaces from '../../components/NoSpaces/NoSpaces';

const TodoPage = () => {
    const { tasks, statuses, selectedSpace } = useDataContext()

    return (
        <Layout title='To-Do List'>
            {selectedSpace ?
                tasks && statuses && <>
                    <div className={styles.newStatusContainer}>
                        <AnimatedPopover buttonClass={styles.newStatusButton} buttonText="ADD NEW STATUS">
                            <AddStatusForm />
                        </AnimatedPopover>
                    </div>
                    {statuses
                        .filter(status => status.spaceId === selectedSpace.id)
                        .map((status: Status) =>
                            <TaskTable
                                key={status.id}
                                status={status}
                            />)
                    }</>
                : <NoSpaces />}
        </Layout>
    );
}

export default TodoPage;