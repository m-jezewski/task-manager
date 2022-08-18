import { useContext } from 'react'
import { DataContext } from '../contexts/DataContext'
import { BooleanGoalStep, Goal, NumberGoalStep, Space, Status, Task, TaskGoalStep } from '../interfaces'

const useDataContext = () => {
  const { tasks, spaces, statuses, selectedSpace, setSelectedSpace, goals, goalSteps } = useContext(DataContext) as {
    tasks: Task[]
    spaces: Space[]
    statuses: Status[]
    goals: Goal[]
    goalSteps: (NumberGoalStep | BooleanGoalStep | TaskGoalStep)[] | null
    selectedSpace: Space
    setSelectedSpace: React.Dispatch<React.SetStateAction<Space | null>>
  }

  return { tasks, spaces, statuses, selectedSpace, setSelectedSpace, goals, goalSteps }
}
export default useDataContext
