import { useContext } from 'react'
import { NewGoalContext } from '../pages/NewGoal/NewGoal'

const useNewGoalContext = () => {
  return useContext(NewGoalContext)
}

export default useNewGoalContext
