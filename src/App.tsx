import styles from './App.module.css';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';

//pages
import Dashboard from './pages/Dashboard/Dashboard';
import Todo from './pages/ToDo/ToDo';
import Kanban from './pages/Kanban/Kanban';
import Calendar from './pages/Calendar/Calendar';
import Goals from './pages/Goals/Goals';
import Select from './components/Select';

//temp 
const spaces = [
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
// temp


function App() {

  const [selectedSpace, setSelectedSpace] = useState(spaces[0])

  return (
    <div className={styles.App}>
      <Sidebar />
      <section>
        <header>
          <h1 id='main-title'> </h1>
          <hr />
        </header>
        <main>
          <Select spaces={spaces} selectedSpace={selectedSpace} setSelectedSpace={setSelectedSpace} />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="todo" element={<Todo space={selectedSpace} />} />
            <Route path="kanban" element={<Kanban />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="goals" element={<Goals />} />
          </Routes>
        </main>
      </section>
    </div>
  );
}

export default App;
