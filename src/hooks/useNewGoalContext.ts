import { useContext } from 'react'
import { NewGoalContext } from '../pages/Goals/NewGoal/NewGoal'

const useNewGoalContext = () => {
  return useContext(NewGoalContext)
}

export default useNewGoalContext
