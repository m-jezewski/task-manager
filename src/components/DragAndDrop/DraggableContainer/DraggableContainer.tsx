import React, { ReactNode, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Task } from "../../../interfaces";
//styles
import styles from './DraggableContainer.module.scss'

interface DraggableContainerProps {
    children: ReactNode
    task: Task
    Parent: React.ElementType
    parentStyles?: string
}

const DraggableContainer = ({ children, task, Parent, parentStyles }: DraggableContainerProps) => {
    const navigate = useNavigate()
    const divRef = useRef<HTMLDivElement>(null)

    const handleDragStart = (e: React.DragEvent) => {
        e.dataTransfer.setData('text/json', JSON.stringify(task))
        divRef.current?.classList.add(styles.dragging)
    }

    const handleDragEnd = () => {
        divRef.current?.classList.remove(styles.dragging)
    }

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        navigate(`/Dashboard/${task.id}`)
    }

    return (
        <Parent
            className={parentStyles}
            style={{ cursor: 'pointer' }}
            draggable={true}
            ref={divRef}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onClick={handleClick}
        >
            {children}
        </Parent>
    );
}

export default DraggableContainer;