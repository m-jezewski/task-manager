import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './DragAndDrop.module.scss'
import { Task } from '../../interfaces'

interface withDraggableProps {
    task: Task
}

export const withDraggable = (WrappedComponent: React.ElementType) => ({ task, ...props }: withDraggableProps) => {
    const navigate = useNavigate()
    const ref = useRef<HTMLElement>(null)

    const handleDragStart = (e: React.DragEvent) => {
        e.dataTransfer.setData('text/json', JSON.stringify(task))
        ref.current?.classList.add(styles.dragging)
    }

    const handleDragEnd = () => {
        ref.current?.classList.remove(styles.dragging)
    }

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
        draggable={true}
        onDragStart={handleDragStart}
        aria-label='Click to move to task page'
        role='link'
        tabIndex={0}
        onDragEnd={handleDragEnd}
        onClick={handleClick}
        onKeyDown={handleOnKeyDown}
        task={task}
        {...props}
    />
}
