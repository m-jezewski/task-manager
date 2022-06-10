import Title from "../../components/Title";
import ToDoList from "../../components/ToDoList";
import { Space } from '../../interfaces'

interface TodoProps {
    space: Space
}

const Todo = ({ space }: TodoProps) => {
    return (
        <>
            <Title>To-Do List</Title>
            <ToDoList space={space}></ToDoList>
        </>
    );
}

export default Todo;