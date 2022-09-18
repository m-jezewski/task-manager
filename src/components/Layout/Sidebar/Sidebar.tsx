import { Link } from 'react-router-dom';
import styles from './Sidebar.module.scss'
import calendar from '../../../assets/icons/calendar.svg'
import checklist from '../../../assets/icons/checklist.svg'
import home from '../../../assets/icons/home.svg'
import width from '../../../assets/icons/width.svg'
import monitoring from '../../../assets/icons/monitoring.svg'
import menu from '../../../assets/icons/menu.svg'
import logoutIcon from '../../../assets/icons/logout.svg'
import { useLogout } from '../../../hooks/useLogout'
import { onClickOutside } from '../../../utils/onClickOutside';
import dayjs from 'dayjs';
import { useState, useRef } from 'react';
import AppHelp from './AppHelp';

const Sidebar = () => {
    const { logout } = useLogout()
    const [toggleSidebar, setToggleSidebar] = useState(false)
    const sidebarPanelRef = useRef<HTMLDivElement | null>(null)
    toggleSidebar && sidebarPanelRef.current && onClickOutside(sidebarPanelRef.current, () => { setToggleSidebar(!toggleSidebar) })

    return (
        <>
            <button
                onClick={(e) => { e.stopPropagation(); setToggleSidebar(!toggleSidebar) }}
                className={styles.toggleSidebar}>
                <img src={menu} alt={'toggle menu'} />
            </button>
            <div className={` ${toggleSidebar && styles.sideBarOpen} ${styles.container}`} ref={sidebarPanelRef}>
                <div>
                    <span className={styles.logo}>
                        Task<br />
                        Manager
                        <hr />
                    </span>
                    <nav>
                        <Link to='/Dashboard'><img src={home} alt='Dashboard' /><span>Dashboard</span></Link>
                        <Link to='/Todo'><img src={checklist} alt='Todo List' /><span>To-Do List</span></Link>
                        <Link to='/Kanban'><img src={width} alt='Kanban board' /><span>Kanban</span></Link>
                        <Link to={`/Calendar/${dayjs().format('DD-MM-YYYY')}/Day`}><img src={calendar} alt='Calendar' /><span>Calendar</span></Link>
                        <Link to='/Goals'><img src={monitoring} alt='Goals' /><span>Goals</span></Link>
                    </nav>
                </div>
                <div className={styles.settings}>
                    <AppHelp />
                    <button className={styles.logoutButton} onClick={() => { logout() }}>
                        <img src={logoutIcon} alt='Logout'></img><span>LOGOUT</span>
                    </button>
                </div>
            </div>
        </>
    );
}

export default Sidebar;