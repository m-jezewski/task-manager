//interfaces
import { Task, Space, Status, GoalStep, Goal } from '../interfaces'
//hooks
import { useState, useEffect } from 'react'
import { useErrorPromptContext } from './useErrorPromptContext'
//firebase
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '../firebase/config'

type Data = Task[] | Space[] | Status[] | Goal[] | GoalStep[]

export const useCollectionSub = (c: string, uid: string | undefined) => {
  const [isPending, setIsPending] = useState(false)
  const [data, setData] = useState<Data | null>(null)
  const { setIsError } = useErrorPromptContext()

  useEffect(() => {
    if (!uid) {
      setData(null)
      return
    }

    setIsPending(true)
    const col = query(collection(db, c), where('uid', '==', uid))
    const unsubscribe = onSnapshot(
      col,
      (snapshot) => {
        const newData = snapshot.docs.map((i) => ({
          ...i.data(),
          id: i.id,
        })) as Data
        setData(newData)
        setIsPending(false)
      },
      () => {
        setIsError(true)
      }
    )

    return () => {
      unsubscribe()
    }
  }, [c, uid])

  return { data, isPending }
}
