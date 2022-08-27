import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { Task, Space, Status, GoalStep, Goal } from '../interfaces'
import { useState, useEffect } from 'react'
import { db } from '../firebase/config'

type Data = Task[] | Space[] | Status[] | Goal[] | GoalStep[]

export const useCollectionSub = (c: string, uid: string) => {
  const [data, setData] = useState<Data | null>(null)

  useEffect(() => {
    const col = query(collection(db, c), where('uid', '==', uid))
    const unsubscribe = onSnapshot(col, (snapshot) => {
      const newData = snapshot.docs.map((i) => ({
        ...i.data(),
        id: i.id,
      })) as Data

      setData(newData)
    })

    return () => {
      unsubscribe()
    }
  }, [c, uid])

  return data
}
