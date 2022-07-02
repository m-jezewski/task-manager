import { addDoc, collection, deleteDoc, doc } from 'firebase/firestore'
import { db } from './config'

const addItem = (item: {}, col: string) => {
  addDoc(collection(db, col), item)
}

const removeItem = (id: string, col: string) => {
  deleteDoc(doc(db, col, id))
}

export { addItem, removeItem }
