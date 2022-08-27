import { useContext } from 'react'
import { DataContext, DataContextInterface } from '../contexts/DataContext'

const useDataContext = () => {
  return useContext(DataContext) as DataContextInterface
}
export default useDataContext
