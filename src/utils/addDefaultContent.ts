import { addDoc, collection, doc, setDoc } from 'firebase/firestore'
import { db } from '../firebase/config'
import { Space, Task, Status } from '../interfaces'
import defaultData from '../data/defaultData.json'

export const addDefaultContent = (uid: string) => {
  console.log(defaultData)
}
