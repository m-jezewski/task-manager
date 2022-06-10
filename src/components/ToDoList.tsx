import { useState } from "react";
import ToDoItem from './ToDoItem'

import { Todo, Space } from '../interfaces'

import styles from './ToDoList.module.css'
import './ToDoList.module.css'

interface ToDoListProps {
    space: Space
}

const ToDoList = ({ space }: ToDoListProps) => {
    //temp
    const [todos, setTodos] = useState<{ open: Todo[], inProgress: Todo[], finished: Todo[] }>(
        {
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
        })

    //temp

    const handleStatusChange = (todo: Todo, list: Todo[], key: string, status: 'open' | 'inProgress' | 'finished') => {
        if (key === status) return // no moving into present list

        const newTodos = {
            open: todos.open.filter(item => item.id !== todo.id),
            inProgress: todos.inProgress.filter(item => item.id !== todo.id),
            finished: todos.finished.filter(item => item.id !== todo.id),
            [status]: [...todos[status], todo]
        }

        setTodos(newTodos)
    }

    const handlePrioChange = (todo: Todo, list: Todo[], key: string) => {
        const newTodo = {
            ...todo,
            priority: todo.priority === 'high' ? 'low' : todo.priority === 'low' ? "medium" : 'high'
        }

        setTodos({ ...todos, [key]: [...list.filter(item => item !== todo), newTodo].sort((a, b) => a.id - b.id) })
    }

    const handleDelete = (todo: Todo, list: Todo[], key: string) => {
        const newTodos = {
            open: todos.open.filter(item => item.id !== todo.id),
            inProgress: todos.inProgress.filter(item => item.id !== todo.id),
            finished: todos.finished.filter(item => item.id !== todo.id),
        }

        setTodos(newTodos)
    }

    return (
        <>
            {Object.entries(todos).map(([key, list]) =>
                <table key={key} className={styles.list_container}>
                    <tbody>
                        <tr>
                            <th className={` ${styles.status_th}`}>
                                <span className={`${styles.status_text} ${styles[key]}`}>
                                    {key.toUpperCase()}
                                </span>
                                <button className={styles.status_button}>+</button>
                            </th>
                            <th />
                            <th>Priority:</th>
                            <th />
                        </tr>
                        {list.map((item) => (
                            <ToDoItem key={item.id} todo={item} status={key} list={{ list, key }} handleStatusChange={handleStatusChange} handlePrioChange={handlePrioChange} handleDelete={handleDelete} />
                        ))}
                    </tbody>
                </table>)}
        </>
    );
}

export default ToDoList;