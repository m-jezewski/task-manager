import React, { createContext, useEffect, useState } from "react";
import { useCollectionSub } from '../hooks/useCollectionSub';
import { Task, Space, Status, Goal, GoalStep, NumberGoalStep, BooleanGoalStep, TaskGoalStep } from '../interfaces'

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
    const goals = useCollectionSub('goals', uid) as Goal[] | null
    const goalSteps = useCollectionSub('goalSteps', uid) as (NumberGoalStep | BooleanGoalStep | TaskGoalStep)[] | null

    useEffect(() => {
        if (spaces) {
            setSelectedSpace(spaces[0])
        }
    }, [spaces])

    const data = {
        unfilteredTasks: tasks,
        tasks: selectedSpace && tasks?.filter((task: Task) => task.space === selectedSpace.name).sort((a, b) => a.orderIndex - b.orderIndex),
        spaces,
        statuses: statuses?.sort((a, b) => a.orderIndex - b.orderIndex),
        selectedSpace,
        setSelectedSpace,
        goals,
        goalSteps
    }

    return (
        <DataContext.Provider value={data}>
            {children}
        </DataContext.Provider>
    )
}