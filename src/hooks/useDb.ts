import { addDoc, collection, deleteDoc, doc, DocumentReference, updateDoc } from 'firebase/firestore'
import { useContext, useEffect, useReducer, useState } from 'react'
import { UserContext } from '../contexts/UserContext'
import { db } from '../firebase/config'
import { Goal, GoalStep, Space, Task } from '../interfaces'

type ACTIONTYPE =
  | { type: 'DB_ACTION'; payload: DocumentReference | null }
  | { type: 'ERROR'; payload: string | null }
  | { type: 'IS_PENDING' }

const initialState = {
  isPending: false,
  docRef: null,
  error: null,
}

const dbReducer = (
  state: { isPending: boolean; error: string | null; docRef: DocumentReference | null },
  action: ACTIONTYPE
) => {
  switch (action.type) {
    case 'IS_PENDING':
      return { isPending: true, error: null, docRef: null }
    case 'DB_ACTION':
      return { isPending: false, error: null, docRef: action.payload }
    case 'ERROR':
      return { isPending: false, error: action.payload, docRef: null }
    default:
      return state
  }
}

const useDb = (col: string) => {
  const [res, dispatch] = useReducer(dbReducer, initialState)
  const [isUnmounted, setisUnmounted] = useState(false)
  const colRef = collection(db, col)
  const { user } = useContext(UserContext)

  const mountedDispatch = (dispatchValue: ACTIONTYPE) => {
    if (isUnmounted === false) {
      dispatch(dispatchValue)
    }
  }

  const addDocument = (doc: any) => {
    mountedDispatch({ type: 'IS_PENDING' })
    addDoc(colRef, { ...doc, uid: user?.uid }).then((ref) => mountedDispatch({ type: 'DB_ACTION', payload: ref }))
  }

  const removeDocument = (docID: string) => {
    dbFunction(deleteDoc, doc(colRef, docID))
  }

  const updateDocument = (docID: string, changesObj: any) => {
    dbFunction(updateDoc, doc(colRef, docID), changesObj)
  }

  const dbFunction = async (firebaseFn: any, ...args: any) => {
    mountedDispatch({ type: 'IS_PENDING' })
    try {
      await firebaseFn(...args)
      mountedDispatch({ type: 'DB_ACTION', payload: null })
    } catch (error) {
      mountedDispatch({ type: 'ERROR', payload: 'Sorry! Something went wrong.' })
    }
  }

  useEffect(() => {
    return () => {
      setisUnmounted(true)
    }
  }, [])

  return { addDocument, removeDocument, updateDocument, res }
}

export default useDb
