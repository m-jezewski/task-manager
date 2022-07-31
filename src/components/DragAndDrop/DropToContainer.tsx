import React, { ReactNode, useRef } from "react";
import { Status } from "../../interfaces";
import useDb from "../../hooks/useDb";

interface DropToContainerProps {
    children: ReactNode
    status: Status
    Parent: React.ElementType
    parentStyles?: string
}

const DropToContainer = ({ children, status, parentStyles, Parent }: DropToContainerProps) => {
    const divRef = useRef<HTMLDivElement>(null)
    const { updateDocument } = useDb('tasks')

    const debounceDragOver = (() => {
        let timeout: any
        return () => {
            clearTimeout(timeout)
            timeout = setTimeout(() => {
                divRef.current?.classList.remove('dragOver')
            }, 150)
        }
    })()

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        divRef.current?.classList.add('dragOver')
        debounceDragOver()
    }

    const handleDrop = (e: React.DragEvent) => {
        try {
            const task = JSON.parse(e.dataTransfer.getData('text/json'))
            if (status.name !== task.status) {
                updateDocument(task.id, { status: status.name })
            }
            divRef.current?.classList.remove('dragOver')
        } catch (e) {
            divRef.current?.classList.remove('dragOver')
        }
    }

    return (
        <Parent
            ref={divRef}
            className={parentStyles}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            {children}
        </Parent>
    );
}

export default DropToContainer;