//interfaces
import { ComponentPropsWithRef, ElementType } from 'react'
import { Task, TaskGoalStep } from '../../interfaces'
//hooks
import { useNavigate } from 'react-router-dom'
import { useRef } from 'react'
//styles
import styles from './withTaskLink.module.scss'
import { Dayjs } from 'dayjs'

interface withTaskLinkProps {
    task: Task
    step?: TaskGoalStep
    date?: Dayjs
} // those step? date? are ugly but sadly I have no idea how to type it properly

export const withTaskLink = (WrappedComponent: ElementType) => ({ task, ...props }: withTaskLinkProps & ComponentPropsWithRef<'tr' | 'div'>) => {
    const navigate = useNavigate()
    const ref = useRef<HTMLElement>(null)

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        navigate(`/Dashboard/${task.id}`)
    }

    const handleOnKeyDown = (e: React.KeyboardEvent) => {
        e.stopPropagation()
        if (document.activeElement === ref.current && (e.code === 'Enter' || e.code === 'Space')) {
            navigate(`/Dashboard/${task.id}`)
        }
    }

    return <WrappedComponent
        ref={ref}
        className={styles.link}
        aria-label='Click to move to task page'
        role='link'
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={handleOnKeyDown}
        task={task}
        {...props}
    />
}
