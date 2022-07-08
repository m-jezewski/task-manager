import { useContext } from 'react'
import { DataContext } from '../contexts/DataContext'
import { Space, Status, Task } from '../interfaces'

const useDataContext = () => {
  const { tasks, spaces, statuses, selectedSpace, setSelectedSpace } = useContext(DataContext) as {
    tasks: Task[]
    spaces: Space[]
    statuses: Status[]
    selectedSpace: Space
    setSelectedSpace: React.Dispatch<React.SetStateAction<Space | null>>
  }

  return { tasks, spaces, statuses, selectedSpace, setSelectedSpace }
}
export default useDataContext
