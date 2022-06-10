import { Link } from 'react-router-dom';
import styles from './Sidebar.module.css'

import calendar from '../assets/calendar.svg'
import checklist from '../assets/checklist.svg'
import home from '../assets/home.svg'
import width from '../assets/width.svg'
import monitoring from '../assets/monitoring.svg'

const Sidebar = () => {
    return (
        <div className={styles.container}>
            <h1>Task Tracker</h1>
            <hr />
            <nav>
                <Link to='/'><img src={home} alt='' />Dashboard</Link>
                <Link to='/Todo'><img src={checklist} alt='' />To-Do List</Link>
                <Link to='/Kanban'><img src={width} alt='' /> Kanban</Link>
                <Link to='/Calendar'><img src={calendar} alt='' />Calendar</Link>
                <Link to='/Goals'><img src={monitoring} alt='' />Goals</Link>
            </nav>
        </div>
    );
}

export default Sidebar;