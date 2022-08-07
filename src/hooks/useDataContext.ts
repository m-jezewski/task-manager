import { useContext } from 'react'
import { DataContext } from '../contexts/DataContext'
import { Goal, GoalStep, Space, Status, Task } from '../interfaces'

const useDataContext = () => {
  const { tasks, spaces, statuses, selectedSpace, setSelectedSpace, goals, goalSteps } = useContext(DataContext) as {
    tasks: Task[]
    spaces: Space[]
    statuses: Status[]
    goals: Goal[]
    goalSteps: GoalStep[]
    selectedSpace: Space
    setSelectedSpace: React.Dispatch<React.SetStateAction<Space | null>>
  }

  return { tasks, spaces, statuses, selectedSpace, setSelectedSpace, goals, goalSteps }
}
export default useDataContext
