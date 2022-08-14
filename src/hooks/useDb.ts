import { addDoc, collection, deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore'
import { useContext, useEffect, useReducer, useState } from 'react'
import { UserContext } from '../contexts/UserContext'
import { db } from '../firebase/config'

type ACTIONTYPE = { type: 'DB_ACTION' } | { type: 'ERROR'; payload: string | null } | { type: 'IS_PENDING' }

const initialState = {
  isPending: false,
  error: null,
}

const dbReducer = (
  state: {
    isPending: boolean
    error: string | null
  },
  action: ACTIONTYPE
) => {
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
  const { user } = useContext(UserContext)

  const mountedDispatch = (dispatchValue: ACTIONTYPE) => {
    if (isUnmounted === false) {
      dispatch(dispatchValue)
    }
  }

  const addDocument = async (doc: any) => {
    try {
      mountedDispatch({ type: 'IS_PENDING' })
      const ref = await addDoc(collection(db, col), { ...doc, uid: user?.uid })
      mountedDispatch({ type: 'DB_ACTION' })
      return ref
    } catch (err) {
      mountedDispatch({ type: 'ERROR', payload: 'Sorry, Something went wrong' })
    }
  }

  const removeDocument = async (docID: string) => {
    try {
      mountedDispatch({ type: 'IS_PENDING' })
      await deleteDoc(doc(collection(db, col), docID))
      mountedDispatch({ type: 'DB_ACTION' })
    } catch (err) {
      mountedDispatch({ type: 'ERROR', payload: 'Sorry! Something went wrong.' })
    }
  }

  const updateDocument = async (docID: string, changesObj: any) => {
    try {
      mountedDispatch({ type: 'IS_PENDING' })
      await updateDoc(doc(collection(db, col), docID), changesObj)
    } catch (err) {
      mountedDispatch({ type: 'ERROR', payload: 'Sorry! Something went wrong.' })
    }
  }

  const getDocument = async (docID: string) => {
    console.log('getting some docs')
    const docSnap = await getDoc(doc(collection(db, col), docID))
    const docData = docSnap.data()
    return docData
  }

  useEffect(() => {
    return () => {
      setisUnmounted(true)
    }
  }, [])

  return { addDocument, removeDocument, updateDocument, getDocument, res }
}

export default useDb
