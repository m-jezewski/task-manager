
//interfaces
import { Space, Task, Status } from '../../interfaces'

//context
import { useContext } from "react";
import { DataContext } from "../../contexts/DataContext";

//components
import Layout from "../../components/Layout/Layout";
import AddStatusForm from "../../components/AddStatusForm/AddStatusForm";
import AnimatedPopover from "../../components/AnimatedPopover/AnimatedPopover";
import TaskTable from './TaskTable'

const Todo = () => {
    const { tasks, statuses, selectedSpace } = useContext(DataContext) as { tasks: Task[] | null, statuses: Status[] | null, selectedSpace: Space | null }

    return (
        <Layout title='To-Do List'>
            <div className='new_status_container'>
                <AnimatedPopover buttonStyles={'new_status_button'} buttonText="ADD NEW STATUS">
                    <AddStatusForm statuses={statuses} />
                </AnimatedPopover>
            </div>
            {selectedSpace ? tasks && statuses && statuses.map((status: Status) =>
                <TaskTable
                    key={status.id}
                    status={status}
                    tasks={tasks}
                    statuses={statuses}
                    selectedSpace={selectedSpace}
                />) :
                <>Create at least one space to add new tasks!</>
            }
        </Layout>
    );
}

export default Todo;