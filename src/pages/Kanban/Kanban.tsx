import AddStatusForm from '../../components/Forms/AddStatusForm';
import AnimatedPopover from '../../components/AnimatedPopover/AnimatedPopover';
import Layout from '../../components/Layout/Layout';
import useDataContext from '../../hooks/useDataContext';

import styles from './Kanban.module.scss'
import StatusSection from './StatusSection';

const Kanban = () => {
    const { statuses, tasks, selectedSpace } = useDataContext()


    //selectedSpace check patrz todo

    return (
        <Layout title='Kanban'>
            <div className={styles.container}>
                {statuses && tasks && statuses.map(status => (
                    <StatusSection
                        key={status.id}
                        status={status}
                        tasks={tasks}
                    />
                ))}
                <AnimatedPopover
                    buttonClass={styles.addStatusButton}
                    buttonText='ADD NEW STATUS'
                    panelStyles={{
                        transform: 'translate(-15.5rem, -0.5rem)',
                        height: '100%'
                    }}
                >
                    <AddStatusForm />
                </AnimatedPopover>
            </div>
        </Layout>
    );
}

export default Kanban;