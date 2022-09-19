import { useState, useContext } from 'react'
import { UserContext } from '../contexts/UserContext'
import { auth } from '../firebase/config'
import { signInWithEmailAndPassword } from 'firebase/auth'
import useErrorPromptContext from './useErrorPromptContext'

export const useLogin = () => {
  const { dispatch } = useContext(UserContext)
  const [error, setError] = useState(null)
  const [isPending, setisPending] = useState(false)
  const { isError, setIsError } = useErrorPromptContext()
  // check for different types of errors, e.g. passing wrong email/password should not trigger errorPrompt

  const login = (email: string, password: string) => {
    setisPending(true)
    setError(null)
    signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        dispatch({ type: 'LOGIN', payload: response.user })
        setisPending(false)
      })
      .catch((err) => {
        setError(err.message)
        setisPending(false)
      })
  }

  return { error, login, isPending }
}
