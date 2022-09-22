import { useDataContext } from '../../hooks/useDataContext';
//styles
import styles from './ToDo.module.scss'
//interfaces
import { Status } from '../../interfaces'
//components
import { AnimatedPopover } from "../../components/AnimatedPopover/AnimatedPopover";
import { Layout } from "../../components/Layout/Layout/Layout";
import { AddStatusForm } from "../../components/forms/AddStatusForm/AddStatusForm";
import { DropToTaskTable } from './TaskTable'
import { NoSpaces } from '../../components/NoSpaces/NoSpaces';
import { SpaceSelect } from '../../components/ui/SpaceSelect/SpaceSelect';
import { ListHelp } from './ListHelp';

export const TodoPage = () => {
    const { statuses, selectedSpace, setSelectedSpace } = useDataContext()

    return (
        <Layout title='To-Do List'>
            <div className={styles.row}>
                <SpaceSelect
                    space={selectedSpace}
                    setSpace={setSelectedSpace}
                    className={styles.spaceSelect}
                />
                <ListHelp />
            </div>
            {selectedSpace ?
                <>
                    <div className={styles.newStatusContainer}>
                        <AnimatedPopover className={styles.newStatusButton} buttonText="ADD NEW STATUS">
                            <AddStatusForm />
                        </AnimatedPopover>
                    </div>
                    {statuses && statuses
                        .filter(status => status.spaceId === selectedSpace.id)
                        .map((status: Status) =>
                            <DropToTaskTable
                                key={status.id}
                                status={status}
                            />)
                    }</>
                : <NoSpaces />}
        </Layout>
    );
}