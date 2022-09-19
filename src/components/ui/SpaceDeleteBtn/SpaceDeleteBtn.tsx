import { Space } from "../../../interfaces";
import { useState, ComponentPropsWithoutRef } from 'react'
import styles from './SpaceDeleteBtn.module.scss'
import useDataContext from "../../../hooks/useDataContext";
import useDb from "../../../hooks/useDb";
import DeleteModal from "../../Modals/DeleteModal/DeleteModal";

interface SpaceDeleteBtnProps {
    space: Space
    className: string
}

const SpaceDeleteBtn = ({ space, className, ...props }: SpaceDeleteBtnProps & ComponentPropsWithoutRef<'button'>) => {
    const [isOpen, setIsOpen] = useState(false)
    const { tasks, statuses } = useDataContext()
    const { removeDocument: removeTask } = useDb('tasks')
    const { removeDocument: removeStatus } = useDb('statuses')
    const { removeDocument: removeSpace } = useDb('spaces')

    const handleDelete = () => {
        tasks?.filter(task => task.spaceId === space.id).forEach(task => removeTask(task.id!))
        statuses?.filter(status => status.spaceId === space.id).forEach(space => removeStatus(space.id!))
        removeSpace(space.id!)
        setIsOpen(false)
    }

    return (
        <>
            <button
                onClick={() => { setIsOpen(true) }}
                className={`${styles.openDialogButton} ${className}`}
                {...props}
            />
            <DeleteModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                title='Remove Space'
                description='This action will pernamently remove this space and all associated with it statuses and tasks. Are you absolutely sure?'
                handleDeleteBtnClick={handleDelete}
            />
        </>
    );
}

export default SpaceDeleteBtn;