import { useState } from 'react'
import { auth } from '../firebase/config'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { UserContext } from '../contexts/UserContext'
import { useContext } from 'react'
import { addDefaultContent } from '../utils/addDefaultContent'
import { openAppHelp } from '../utils/openAppHelp'
import useErrorPromptContext from './useErrorPromptContext'

export const useSignup = () => {
  const { dispatch } = useContext(UserContext)
  const [error, setError] = useState(null)
  const [isPending, setisPending] = useState(false)
  const { isError, setIsError } = useErrorPromptContext()
  // check for different types of errors, e.g. passing wrong email/password should not trigger errorPrompt

  const signup = (email: string, password: string) => {
    setisPending(true)
    setError(null)
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        addDefaultContent(userCredential.user.uid)
        dispatch({ type: 'LOGIN', payload: userCredential.user })
        setisPending(false)
        openAppHelp()
      })
      .catch((err) => {
        setError(err.message)
        setisPending(false)
      })
  }

  return { error, signup, isPending }
}
