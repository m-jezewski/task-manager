import { Dialog } from "@headlessui/react";
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import DeleteModal from "../../../../components/ui/DeleteModal/DeleteModal";
import useDataContext from "../../../../hooks/useDataContext";
import useDb from "../../../../hooks/useDb";
import { Goal, Task } from "../../../../interfaces";
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
            <DeleteModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                title='Remove Goal'
                description='This action will pernamently remove this status and all associated with it steps, including tasks displayed in other part of application'
                handleDeleteBtnClick={handleDelete}
            />
        </>
    );
}

export default GoalDeleteModal