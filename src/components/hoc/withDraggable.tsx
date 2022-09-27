//interfaces
import { ComponentPropsWithoutRef, ElementType, forwardRef } from 'react'
import { Task } from '../../interfaces'
//styles
import styles from './DragAndDrop.module.scss'

interface withDraggableProps {
    task: Task
    step?: any
}

export const withDraggable = (WrappedComponent: ElementType) => forwardRef<HTMLElement, withDraggableProps & ComponentPropsWithoutRef<'div' | 'tr'>>(({ task, ...props }, ref) => {
    const handleDragStart = (e: React.DragEvent) => {
        if (typeof ref === 'function') return
        e.dataTransfer.setData('text/json', JSON.stringify(task))
        ref && ref.current?.classList.add(styles.dragging)
    }

    const handleDragEnd = () => {
        if (typeof ref === 'function') return
        ref && ref.current?.classList.remove(styles.dragging)
    }

    return <WrappedComponent
        ref={ref}
        draggable={true}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        task={task}
        {...props}
    />
})
