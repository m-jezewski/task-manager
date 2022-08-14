import styles from './App.module.scss';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { UserContext } from './contexts/UserContext';
import { DataContext, DataContextProvider } from './contexts/DataContext'

//pages
import Dashboard from './pages/Dashboard/Dashboard';
import TodoPage from './pages/ToDo/ToDoPage';
import Kanban from './pages/Kanban/Kanban';
import Calendar from './pages/Calendar/Calendar';
import Goals from './pages/Goals/Goals';
import Home from './pages/Home/Home';
import CalPanels from './pages/Calendar/CalPanels';
import TaskPage from './pages/Dashboard/TaskPage';
import DashboardHome from './pages/Dashboard/DashboardHome';
import NewGoal from './pages/NewGoal/NewGoal';
import GoalPage from './pages/Goals/GoalPage';

function App() {
  const { user, authReady } = useContext(UserContext)

  return (
    <div className={styles.App}>
      {authReady && <>{user ?
        <DataContextProvider uid={user.uid}>
          <Routes>
            <Route path="/Dashboard" >
              <Route path=':taskID' element={<TaskPage />} />
              <Route index element={<Dashboard />} />
            </Route>
            <Route path="Todo" element={<TodoPage />} />
            <Route path="Kanban" element={<Kanban />} />
            <Route path="Calendar" element={<Calendar />}>
              <Route path=':date' element={<CalPanels />} />
            </Route>
            <Route path="Goals" >
              <Route path="NewGoal" element={<NewGoal />}></Route>
              <Route path=":goalID" element={<GoalPage />}></Route>
              <Route index element={<Goals />}></Route>
            </Route>
            <Route path="*" element={<Navigate to='/Dashboard' replace />} />
          </Routes>
        </DataContextProvider> :
        <Routes>
          <Route path='/' element={<Home />} />
          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />
        </Routes>
      }</>
      }
    </div>
  );
}

export default App;
