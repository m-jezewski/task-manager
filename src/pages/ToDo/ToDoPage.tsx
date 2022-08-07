
//interfaces
import { Space, Task, Status } from '../../interfaces'

//context
import { useContext } from "react";
import { DataContext } from "../../contexts/DataContext";

//components
import Layout from "../../components/Layout/Layout";
import AddStatusForm from "../../components/Forms/AddStatusForm";
import AnimatedPopover from "../../components/AnimatedPopover/AnimatedPopover";
import TaskTable from './TaskTable'
import useDataContext from '../../hooks/useDataContext';

const TodoPage = () => {
    const { tasks, statuses, selectedSpace } = useDataContext()

    return (
        <Layout title='To-Do List'>
            <div className='new_status_container'>
                <AnimatedPopover buttonClass={'new_status_button darken_border_hover text-button'} buttonText="ADD NEW STATUS">
                    <AddStatusForm />
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

export default TodoPage;