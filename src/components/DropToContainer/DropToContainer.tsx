import React, { ReactElement, ReactNode, useRef } from "react";
import { Status } from "../../interfaces";
import { collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';

interface DropToContainerProps {
    children: ReactNode
    status: Status
    Parent: React.ElementType
    parentStyles?: string
}

const DropToContainer = ({ children, status, parentStyles, Parent }: DropToContainerProps) => {
    const divRef = useRef<HTMLDivElement>(null)

    const debounce = () => {
        let timeout: any
        return () => {
            clearTimeout(timeout)
            timeout = setTimeout(() => {
                divRef.current?.classList.remove('dragOver')
            }, 100)
        }
    }

    const debounceDragOver = debounce()

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        divRef.current?.classList.add('dragOver')
        debounceDragOver()
    }

    const handleDrop = (e: React.DragEvent) => {
        try {
            const task = JSON.parse(e.dataTransfer.getData('text/json'))
            if (status.status !== task.status) {
                updateDoc(doc(collection(db, 'tasks'), task.id), { status: status.status })
            }
            divRef.current?.classList.remove('dragOver')
        } catch (e) {
            divRef.current?.classList.remove('dragOver')
        }
    }

    return (
        <Parent
            style={{ flexGrow: 1, borderRadius: '0.5rem' }}
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