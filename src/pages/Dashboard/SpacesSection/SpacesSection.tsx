import styles from './SpacesSection.module.scss'
import AddSpaceForm from "../../../components/forms/AddSpaceForm/AddSpaceForm";
import SpaceDeleteBtn from "../../../components/ui/SpaceDeleteBtn/SpaceDeleteBtn";
import useDataContext from '../../../hooks/useDataContext';
import { useState } from 'react'

const SpacesSection = ({ ...props }) => {
    const { spaces, statuses, tasks } = useDataContext()
    const [showAddSpace, setShowAddSpace] = useState(false)
    const handleShowAddSpace = () => {
        setShowAddSpace(!showAddSpace)
    }

    console.log(props)

    return (
        <section className={styles.spacesSection} {...props}>
            <span className={`${styles.sectionHeader} ${styles.spacesCaption}`}>Spaces</span>
            <div className={styles.spaces}>
                <ul>
                    {!spaces || spaces.length === 0 ?
                        <div className={styles.noTasks}>You currently have no workspaces</div>
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
    );
}

export default SpacesSection;