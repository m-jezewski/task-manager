import { addDoc, collection, deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore'
import { useContext, useEffect, useReducer, useState } from 'react'
import { UserContext } from '../contexts/UserContext'
import { db } from '../firebase/config'
import useErrorPromptContext from './useErrorPromptContext'

const useDb = (col: string) => {
  const { user } = useContext(UserContext)
  const { isError, setIsError } = useErrorPromptContext()

  const addDocument = async (doc: any) => {
    try {
      const ref = await addDoc(collection(db, col), { ...doc, uid: user?.uid })
      return ref
    } catch {
      setIsError(true)
    }
  }

  const removeDocument = async (docID: string) => {
    try {
      await deleteDoc(doc(collection(db, col), docID))
    } catch {
      setIsError(true)
    }
  }

  const updateDocument = async (docID: string, changesObj: any) => {
    try {
      await updateDoc(doc(collection(db, col), docID), changesObj)
    } catch {
      setIsError(true)
    }
  }

  return { addDocument, removeDocument, updateDocument }
}

export default useDb
