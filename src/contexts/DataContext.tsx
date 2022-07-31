import React, { createContext, useEffect, useState } from "react";
import { useCollectionSub } from '../hooks/useCollectionSub';
import { Task, Space, Status } from '../interfaces'

interface SpaceContextProviderProps {
    children: React.ReactNode
    uid: string
}

export const DataContext: any = createContext(null)

export const DataContextProvider = ({ children, uid }: SpaceContextProviderProps) => {
    const [selectedSpace, setSelectedSpace] = useState<Space | null>(null)
    const spaces = useCollectionSub('spaces', uid) as Space[] | null
    const tasks = useCollectionSub('tasks', uid) as Task[] | null
    const statuses = useCollectionSub('statuses', uid) as Status[] | null

    useEffect(() => {
        if (spaces) {
            setSelectedSpace(spaces[0])
        }
    }, [spaces])

    const data = {
        unfilteredTasks: tasks,
        tasks: selectedSpace && tasks?.filter((task: Task) => task.space === selectedSpace.name).sort((a, b) => a.orderIndex - b.orderIndex),
        spaces: spaces,
        statuses: statuses?.sort((a, b) => a.orderIndex - b.orderIndex),
        selectedSpace: selectedSpace,
        setSelectedSpace: setSelectedSpace,
    }

    return (
        <DataContext.Provider value={data}>
            {children}
        </DataContext.Provider>
    )
}