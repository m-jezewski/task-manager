import { Dialog } from "@headlessui/react";
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import useDataContext from "../../../hooks/useDataContext";
import useDb from "../../../hooks/useDb";
import { Goal, Task } from "../../../interfaces";
import styles from './GoalDeleteModal.module.scss'

interface GoalDeleteModalProps {
    goal: Goal
}

const GoalDeleteModal = ({ goal }: GoalDeleteModalProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate()
    const { goalSteps } = useDataContext()
    const { removeDocument: removeGoal } = useDb('goals')
    const { removeDocument: removeGoalStep } = useDb('goalSteps')

    const handleDelete = () => {
        removeGoal(goal.id!)
        goalSteps?.filter(goalStep => goalStep.goalID === goal.id).forEach(goalStep => {
            removeGoalStep(goalStep.id!)
        })
        navigate(-1)
    }

    return (
        <>
            <button
                className={styles.openModalButton}
                type='button'
                onClick={() => { setIsOpen(true) }}>
                Delete Goal
            </button>
            <Dialog
                open={isOpen}
                onClose={() => { setIsOpen(false) }}
                className={styles.dialogContainer}
            >
                <Dialog.Panel className={styles.dialogPanel}>
                    <Dialog.Title className={styles.title}>Remove Goal</Dialog.Title>
                    <Dialog.Description>
                        This action will pernamently remove this status and all associated with it steps, including tasks displayed in other part of application <br />
                    </Dialog.Description>
                    <button className={styles.removeButton} onClick={handleDelete}>Remove</button>
                    <button className={styles.closeButton} onClick={() => { setIsOpen(false) }}>Cancel</button>
                </Dialog.Panel>
            </Dialog>
        </>
    );
}

export default GoalDeleteModal