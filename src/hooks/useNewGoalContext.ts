import { useContext } from 'react'
import { NewGoalContext } from '../pages/Goals/NewGoal/NewGoal'

export const useNewGoalContext = () => {
  return useContext(NewGoalContext)
}
