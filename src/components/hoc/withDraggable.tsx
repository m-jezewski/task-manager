//interfaces
import { forwardRef } from 'react'
import { Task } from '../../interfaces'
//styles
import styles from './DragAndDrop.module.scss'

interface withDraggableProps {
    task: Task
}

export const withDraggable = <T extends withDraggableProps>(WrappedComponent: React.ComponentType<T>) => forwardRef<HTMLElement, T>(({ task, ...props }, ref) => {
    const handleDragStart = (e: React.DragEvent) => {
        console.log(ref)
        if (typeof ref === 'function') return
        e.dataTransfer.setData('text/json', JSON.stringify(task))
        ref && ref.current?.classList.add(styles.dragging)
    }

    const handleDragEnd = () => {
        if (typeof ref === 'function') return
        ref && ref.current?.classList.remove(styles.dragging)
    }

    const newProps = { task, ...props } as T

    return <WrappedComponent
        ref={ref}
        draggable={true}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        {...newProps}
    />
})
