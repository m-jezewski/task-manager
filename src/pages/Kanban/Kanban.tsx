import AddStatusForm from '../../components/forms/AddStatusForm/AddStatusForm';
import AnimatedPopover from '../../components/AnimatedPopover/AnimatedPopover';
import Layout from '../../components/Layout/Layout/Layout';
import useDataContext from '../../hooks/useDataContext';

import styles from './Kanban.module.scss'
import StatusSection from './StatusSection';
import NoSpaces from '../../components/NoSpaces/NoSpaces';

const Kanban = () => {
    const { statuses, selectedSpace } = useDataContext()

    return (
        <Layout title='Kanban'>
            {selectedSpace ?
                statuses && <div className={styles.container}>
                    {statuses
                        .filter(s => s.spaceId === selectedSpace.id)
                        .map(status => (
                            <StatusSection
                                key={status.id}
                                status={status}
                            />
                        ))}
                    <AnimatedPopover
                        className={styles.addStatusButton}
                        buttonText='ADD NEW STATUS'
                        panelStyles={{
                            transform: 'translate(-15.5rem, -0.5rem)',
                            height: '100%'
                        }}
                    >
                        <AddStatusForm />
                    </AnimatedPopover>
                </div>
                : <NoSpaces />}
        </Layout>
    );
}

export default Kanban;