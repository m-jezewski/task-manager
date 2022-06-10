import { Space } from './interfaces'

const spaces: Space[] = [
    {
        spaceName: 'My awesome space',
        statuses: {
            open: [{
                id: 0,
                text: "some task 0",
                priority: 'low'
            },
            {
                id: 1,
                text: "some task 1",
                priority: 'high'
            },
            {
                id: 2,
                text: "some task 2",
                priority: 'medium'
            },
            {
                id: 3,
                text: "some task 3",
                priority: 'low'
            },
            {
                id: 4,
                text: "some task 4",
                priority: 'medium'
            },
            {
                id: 5,
                text: "some task 5",
                priority: 'low'
            }],
            inProgress: [{
                id: 6,
                text: "some task 6",
                priority: 'low'
            },
            {
                id: 7,
                text: "some task 7",
                priority: 'high'
            },
            {
                id: 8,
                text: "some task 8",
                priority: 'medium'
            },
            {
                id: 9,
                text: "some task 9",
                priority: 'low'
            },
            {
                id: 10,
                text: "some task 10",
                priority: 'medium'
            },
            {
                id: 11,
                text: "some task 11",
                priority: 'low'
            }],
            finished: [{
                id: 12,
                text: "some task 12",
                priority: 'low'
            },
            {
                id: 13,
                text: "some task 13 ",
                priority: 'high'
            },
            {
                id: 14,
                text: "some task 14",
                priority: 'medium'
            },
            {
                id: 15,
                text: "some task 15",
                priority: 'low'
            },
            {
                id: 16,
                text: "some task 16",
                priority: 'medium'
            },
            {
                id: 17,
                text: "some task 17",
                priority: 'low'
            }],
        }
    },
    {
        spaceName: 'My less awesome space',
        statuses: {
            open: [{
                id: 0,
                text: "some task 0",
                priority: 'low'
            },
            {
                id: 1,
                text: "some task 1",
                priority: 'high'
            },
            {
                id: 2,
                text: "some task 2",
                priority: 'medium'
            },
            {
                id: 3,
                text: "some task 3",
                priority: 'low'
            },
            {
                id: 4,
                text: "some task 4",
                priority: 'medium'
            },
            {
                id: 5,
                text: "some task 5",
                priority: 'low'
            }],
            inProgress: [{
                id: 6,
                text: "some task 6",
                priority: 'low'
            },
            {
                id: 7,
                text: "some task 7",
                priority: 'high'
            },
            {
                id: 8,
                text: "some task 8",
                priority: 'medium'
            },
            {
                id: 9,
                text: "some task 9",
                priority: 'low'
            },
            {
                id: 10,
                text: "some task 10",
                priority: 'medium'
            },
            {
                id: 11,
                text: "some task 11",
                priority: 'low'
            }],
            finished: [{
                id: 12,
                text: "some task 12",
                priority: 'low'
            },
            {
                id: 13,
                text: "some task 13 ",
                priority: 'high'
            },
            {
                id: 14,
                text: "some task 14",
                priority: 'medium'
            },
            {
                id: 15,
                text: "some task 15",
                priority: 'low'
            },
            {
                id: 16,
                text: "some task 16",
                priority: 'medium'
            },
            {
                id: 17,
                text: "some task 17",
                priority: 'low'
            }],
        }
    },
    {
        spaceName: 'working on it',
        statuses: {
            open: [{
                id: 0,
                text: "some task 0",
                priority: 'low'
            },
            {
                id: 1,
                text: "some task 1",
                priority: 'high'
            },
            {
                id: 2,
                text: "some task 2",
                priority: 'medium'
            },
            {
                id: 3,
                text: "some task 3",
                priority: 'low'
            },
            {
                id: 4,
                text: "some task 4",
                priority: 'medium'
            },
            {
                id: 5,
                text: "some task 5",
                priority: 'low'
            }],
            inProgress: [{
                id: 6,
                text: "some task 6",
                priority: 'low'
            },
            {
                id: 7,
                text: "some task 7",
                priority: 'high'
            },
            {
                id: 8,
                text: "some task 8",
                priority: 'medium'
            },
            {
                id: 9,
                text: "some task 9",
                priority: 'low'
            },
            {
                id: 10,
                text: "some task 10",
                priority: 'medium'
            },
            {
                id: 11,
                text: "some task 11",
                priority: 'low'
            }],
            finished: [{
                id: 12,
                text: "some task 12",
                priority: 'low'
            },
            {
                id: 13,
                text: "some task 13 ",
                priority: 'high'
            },
            {
                id: 14,
                text: "some task 14",
                priority: 'medium'
            },
            {
                id: 15,
                text: "some task 15",
                priority: 'low'
            },
            {
                id: 16,
                text: "some task 16",
                priority: 'medium'
            },
            {
                id: 17,
                text: "some task 17",
                priority: 'low'
            }],
        }
    }
]

const addItem = (space: Space, status: 'open' | 'inProgress' | 'finished', key: string) => {
    const activeSpace = spaces.filter(i => i.spaceName === space.spaceName)[0]

    // const handleStatusChange = (todo: Todo, list: Todo[], key: string, status: 'open' | 'inProgress' | 'finished') => {
    //     if (key === status) return // no moving into present list

    //     const newTodos = {
    //         open: todos.open.filter(item => item.id !== todo.id),
    //         inProgress: todos.inProgress.filter(item => item.id !== todo.id),
    //         finished: todos.finished.filter(item => item.id !== todo.id),
    //         [status]: [...todos[status], todo]
    //     }

    //     setTodos(newTodos)
    // }
}

const removeItem = (space: any) => {

}

const modifyItem = (space: any) => {

}

export { addItem, removeItem, modifyItem }