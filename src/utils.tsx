import { addDoc, collection, doc, setDoc } from 'firebase/firestore'
import { db } from './firebase/config'
import { Space, Task, Status } from './interfaces'

// called in useSignup hook to add some basic user data 
const addDefaultContent = (uid: string) => {
    const defaultSpace: Space = {
        uid: uid,
        name: 'My awesome default space!',
    }
    const defaultSpace2: Space = {
        uid: uid,
        name: 'My second awesome default space!',
    }
    const defaultTasks: Task[] = [
        {
            uid: uid,
            orderIndex: 0,
            description: 'My awesome default task!',
            priority: 'low',
            dueDate: null,
            fromDate: null,
            statusId: 'Open',
            spaceId: uid,
        },
        {
            uid: uid,
            orderIndex: 1,
            description: 'My awesome default task!',
            priority: 'medium',
            dueDate: null,
            fromDate: null,
            statusId: 'Open',
            spaceId: uid,
        },
        {
            uid: uid,
            orderIndex: 2,
            description: 'My awesome default task!',
            priority: 'low',
            dueDate: null,
            fromDate: null,
            statusId: 'In Progress',
            spaceId: uid,
        }
    ]
    const defaultStatuses: Status[] = [
        {
            uid: uid,
            name: 'Open',
            orderIndex: 1,
            color: '#c7d2fe',
            spaceId: uid
        },
        {
            uid: uid,
            name: 'In Progress',
            orderIndex: 2,
            color: '#ddd6fe',
            spaceId: uid
        },
        {
            uid: uid,
            name: 'Finished',
            orderIndex: 3,
            color: '#d9f99d',
            spaceId: uid,
        },
    ]

    setDoc(doc(db, 'spaces', uid), defaultSpace)
    setDoc(doc(db, 'spaces', uid + 'xd'), defaultSpace2)
    defaultTasks.forEach(task => {
        addDoc(collection(db, 'tasks'), task)
    });
    defaultStatuses.forEach(status => {
        addDoc(collection(db, 'statuses'), status)
    })
}

export { addDefaultContent }