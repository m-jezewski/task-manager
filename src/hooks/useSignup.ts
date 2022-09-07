import { useState } from 'react'
import { auth } from '../firebase/config'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { UserContext } from '../contexts/UserContext'
import { useContext } from 'react'
import { addDefaultContent } from '../utils/addDefaultContent'

export const useSignup = () => {
  const { dispatch } = useContext(UserContext)
  const [error, setError] = useState(null)
  const [isPending, setisPending] = useState(false)

  const signup = (email: string, password: string) => {
    setisPending(true)
    setError(null)
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        addDefaultContent(userCredential.user.uid)
        dispatch({ type: 'LOGIN', payload: userCredential.user })
        setisPending(false)
      })
      .catch((err) => {
        setError(err.message)
        setisPending(false)
      })
  }

  return { error, signup, isPending }
}
