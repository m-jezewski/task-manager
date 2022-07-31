import { FormEvent, MouseEventHandler, useState } from 'react';
import arrowback from '../../assets/arrowback.svg'
import styles from './Home.module.scss'
import { useLogin } from '../../hooks/useLogin'

interface LoginProps {
    handleClosingForms: MouseEventHandler<HTMLButtonElement>
}

const Login = ({ handleClosingForms }: LoginProps) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, error, isPending } = useLogin()


    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        login(email, password)
        //redirect
    }

    return (
        <>
            <h2>Log in</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Email</span>
                    <input type='email'
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </label>
                <label>
                    <span>Password</span>
                    <input
                        type='password'
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </label>
                <div className={styles.button_row}>
                    <button className={styles.return_button} onClick={handleClosingForms}>
                        <img src={arrowback} alt='Go back' />
                    </button>
                    <button type='submit' className={`${styles.login_button} lighten_hover text-button`}>Log in!</button>
                </div>
            </form>
            {error && <p>{error}</p>}
        </>
    );
}

export default Login;
