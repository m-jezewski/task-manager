import { addDoc, collection } from 'firebase/firestore'
import { db } from './firebase/config'
import { Space, Task, Status } from './interfaces'

// called in useSignup hook to add some basic user data 
const addDefaultContent = (uid: string) => {
    const defaultSpace: Space = {
        uid: uid,
        name: 'My awesome default space!'
    }
    const defaultSpace2: Space = {
        uid: uid,
        name: 'My second awesome default space!'
    }
    const defaultTasks: Task[] = [
        {
            uid: uid,
            orderIndex: 0,
            description: 'My awesome default task!',
            priority: 'low',
            dueDate: null,
            fromDate: null,
            status: 'Open',
            space: 'My awesome default space!',
        },
        {
            uid: uid,
            orderIndex: 1,
            description: 'My awesome default task!',
            priority: 'medium',
            dueDate: null,
            fromDate: null,
            status: 'Open',
            space: 'My awesome default space!',
        },
        {
            uid: uid,
            orderIndex: 2,
            description: 'My awesome default task!',
            priority: 'low',
            dueDate: null,
            fromDate: null,
            status: 'In Progress',
            space: 'My awesome default space!',
        }
    ]
    const defaultStatuses: Status[] = [
        {
            uid: uid,
            name: 'Open',
            orderIndex: 1,
            color: '#c7d2fe'
        },
        {
            uid: uid,
            name: 'In Progress',
            orderIndex: 2,
            color: '#ddd6fe'
        },
        {
            uid: uid,
            name: 'Finished',
            orderIndex: 3,
            color: '#d9f99d'
        },
    ]

    addDoc(collection(db, 'spaces'), defaultSpace)
    addDoc(collection(db, 'spaces'), defaultSpace2)
    defaultTasks.forEach(task => {
        addDoc(collection(db, 'tasks'), task)
    });
    defaultStatuses.forEach(status => {
        addDoc(collection(db, 'statuses'), status)
    })
}
// add item to used space and status

const remove = () => {
    // remove item to used space and status
}

const modify = () => {
    // modify item to used space and status
}

export { addDefaultContent, remove, modify }