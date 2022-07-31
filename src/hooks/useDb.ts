import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { useEffect, useReducer, useState } from 'react'
import { db } from '../firebase/config'

type ACTIONTYPE = { type: 'DB_ACTION' } | { type: 'ERROR'; payload: any } | { type: 'IS_PENDING' }

const initialState = {
  isPending: false,
  error: null,
}

const dbReducer = (state: { isPending: boolean; error: string | null }, action: ACTIONTYPE) => {
  switch (action.type) {
    case 'IS_PENDING':
      return { isPending: true, error: null }
    case 'DB_ACTION':
      return { isPending: false, error: null }
    case 'ERROR':
      return { isPending: false, error: action.payload }
    default:
      return state
  }
}

const useDb = (col: string) => {
  const [res, dispatch] = useReducer(dbReducer, initialState)
  const [isUnmounted, setisUnmounted] = useState(false)
  const colRef = collection(db, col)

  const mountedDispatch = (dispatchValue: ACTIONTYPE) => {
    if (isUnmounted === false) {
      dispatch(dispatchValue)
    }
  }

  const addDocument = (doc: any) => {
    dbFunction(addDoc, colRef, doc)
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
      mountedDispatch({ type: 'DB_ACTION' })
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
