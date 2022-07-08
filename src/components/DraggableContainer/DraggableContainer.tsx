import { ReactNode, useRef } from "react";
import { Task } from "../../interfaces";
import styles from './DraggableContainer.module.css'

interface DraggableContainerProps {
    children: ReactNode
    task: Task
    Parent: React.ElementType
    parentStyles?: string
}

const DraggableContainer = ({ children, task, Parent, parentStyles }: DraggableContainerProps) => {
    const divRef = useRef<HTMLDivElement>(null)

    const handleDragStart = (e: React.DragEvent) => {
        e.dataTransfer.setData('text/json', JSON.stringify(task))
        divRef.current?.classList.add(styles.dragging)
    }

    const handleDragEnd = () => {
        divRef.current?.classList.remove(styles.dragging)
    }

    return (
        <Parent
            className={parentStyles}
            style={{ cursor: 'pointer' }}
            draggable={true}
            ref={divRef}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            {children}
        </Parent>
    );
}

export default DraggableContainer;