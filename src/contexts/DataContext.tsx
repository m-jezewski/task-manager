import React, { createContext, useEffect, useState } from "react";
import { useCollectionSub } from '../hooks/useCollectionSub';
import { Task, Space, Status, Goal, GoalStep, NumberGoalStep, BooleanGoalStep, TaskGoalStep } from '../interfaces'

interface DataContextProviderProps {
    children: React.ReactNode
    uid: string
}

export interface DataContextInterface {
    tasks: Task[] | null
    spaces: Space[] | null
    statuses: Status[] | null
    goals: Goal[] | null
    goalSteps: (NumberGoalStep | BooleanGoalStep | TaskGoalStep)[] | null
    selectedSpace: Space | null
    setSelectedSpace: React.Dispatch<React.SetStateAction<Space | null>>
}

export const DataContext = createContext<DataContextInterface | null>(null)

export const DataContextProvider = ({ children, uid }: DataContextProviderProps) => {
    const spaces = useCollectionSub('spaces', uid) as Space[]
    const tasks = useCollectionSub('tasks', uid) as Task[]
    const statuses = useCollectionSub('statuses', uid) as Status[]
    const goals = useCollectionSub('goals', uid) as Goal[]
    const goalSteps = useCollectionSub('goalSteps', uid) as (NumberGoalStep | BooleanGoalStep | TaskGoalStep)[]

    const [selectedSpace, setSelectedSpace] = useState<Space | null>(null)
    const filteredTasks = selectedSpace && tasks?.filter((task: Task) => task.space === selectedSpace.name).sort((a, b) => a.orderIndex - b.orderIndex)

    useEffect(() => {
        spaces && setSelectedSpace(spaces[0])
    }, [spaces])

    const data: DataContextInterface = {
        tasks: filteredTasks ? filteredTasks : null,
        spaces,
        statuses: statuses?.sort((a, b) => a.orderIndex - b.orderIndex)!,
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