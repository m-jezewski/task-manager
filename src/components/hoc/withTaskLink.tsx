//interfaces
import { Task } from '../../interfaces'
//hooks
import { useNavigate } from 'react-router-dom'
import { useRef } from 'react'
//styles
import styles from './withTaskLink.module.scss'

interface withTaskLinkProps {
    task: Task
}

export const withTaskLink = <T extends withTaskLinkProps>(WrappedComponent: React.ComponentType<T>) => ({ task, ...props }: T) => {
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

    const newProps = { ...props, task } as T;

    return <WrappedComponent
        ref={ref}
        className={styles.link}
        aria-label='Click to move to task page'
        role='link'
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={handleOnKeyDown}
        {...newProps}
    />
}
