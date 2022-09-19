import { useContext } from 'react'
import { ErrorPromptContext, ErrorPromptContextInterface } from '../contexts/ErrorPromptContext'

const useErrorPromptContext = () => {
  return useContext(ErrorPromptContext) as ErrorPromptContextInterface
}

export default useErrorPromptContext
