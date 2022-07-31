import styles from './Home.module.scss'
import { useState } from 'react';

import Login from './Login'
import Register from './Register'

const Home = () => {
    const [isSignupOpen, setIsSignupOpen] = useState(false)
    const [isLoginOpen, setIsLoginOpen] = useState(false)

    const handleClosingForms = () => {
        setIsSignupOpen(false)
        setIsLoginOpen(false)
    }

    return (
        <div className={styles.container}>
            <section>
                <h1>Taskify</h1>
                {!isSignupOpen && !isLoginOpen && <>
                    <p>
                        <span className={styles.subtitle}>Track your tasks and progress towards your goals.</span>
                        Keep your goal progress and manage your tasks in a tasklist, calendar or kanban board in my highly customizable task managemant app.
                    </p>
                    <button className={`${styles.signup_button} lighten_hover text-button`} onClick={() => { setIsSignupOpen(true) }}>Sign Up</button>
                    <button className={`${styles.login_button} lighten_hover text-button`} onClick={() => { setIsLoginOpen(true) }}>Log In</button>
                </>}
                {isSignupOpen &&
                    <Register handleClosingForms={handleClosingForms} />
                }
                {isLoginOpen &&
                    <Login handleClosingForms={handleClosingForms} />
                }
            </section >
            <div className={styles.img_container}>

            </div>
        </div >
    );
}

export default Home;