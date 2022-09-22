//hooks
import { useDataContext } from '../../hooks/useDataContext';
//styles
import styles from './Kanban.module.scss'
//components
import { AddStatusForm } from '../../components/forms/AddStatusForm/AddStatusForm';
import { AnimatedPopover } from '../../components/AnimatedPopover/AnimatedPopover';
import { Layout } from '../../components/Layout/Layout/Layout';
import { StatusSection } from './StatusSection';
import { NoSpaces } from '../../components/NoSpaces/NoSpaces';
import { SpaceSelect } from '../../components/ui/SpaceSelect/SpaceSelect';
import { PanelHelp } from './PanelHelp';

export const Kanban = () => {
    const { statuses, selectedSpace, setSelectedSpace } = useDataContext()

    return (
        <Layout title='Kanban'>
            <div className={styles.row}>
                <SpaceSelect
                    space={selectedSpace}
                    setSpace={setSelectedSpace}
                    className={styles.spaceSelect}
                />
                <PanelHelp />
            </div>
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