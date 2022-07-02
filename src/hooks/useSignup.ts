import { useState } from 'react'
import { auth, db } from '../firebase/config'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { UserContext } from '../contexts/UserContext'
import { useContext } from 'react'
import { addDoc, collection } from 'firebase/firestore'
import { addDefaultContent } from '../utils'

export const useSignup = () => {
  const { dispatch } = useContext(UserContext)
  const [error, setError] = useState(null)
  const [isPending, setisPending] = useState(false)

  const signup = async (email: string, password: string, name: string) => {
    setisPending(true)
    setError(null)
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        //name update
        updateProfile(userCredential.user, {
          displayName: name,
        }).catch((err) => {
          setError(err.message)
        })
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
