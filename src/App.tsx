import styles from './App.module.css';
import { Route, Routes } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from './contexts/UserContext';
import { DataContext, DataContextProvider } from './contexts/DataContext'

//pages
import Dashboard from './pages/Dashboard/Dashboard';
import Todo from './pages/ToDo/ToDo';
import Kanban from './pages/Kanban/Kanban';
import Calendar from './pages/Calendar/Calendar';
import Goals from './pages/Goals/Goals';
import Home from './pages/Home/Home';

function App() {
  const { user, authReady } = useContext(UserContext)

  return (
    <div className={styles.App}>
      {authReady && <>{user ?
        <DataContextProvider uid={user.uid}>
          <Routes>
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="Todo" element={<Todo />} />
            <Route path="Kanban" element={<Kanban />} />
            <Route path="Calendar" element={<Calendar />} />
            <Route path="Goals" element={<Goals />} />
            <Route path="/*" element={<Dashboard />} />
          </Routes>
        </DataContextProvider> :
        <Routes>
          <Route path='/*' element={<Home />} />
        </Routes>
      }</>
      }
    </div>
  );
}

export default App;
