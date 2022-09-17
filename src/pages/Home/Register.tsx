import { useState, MouseEventHandler, FormEvent } from 'react';
import arrowback from '../../assets/icons/arrowback.svg'
import styles from './Home.module.scss'
import { useSignup } from '../../hooks/useSignup'

interface RegisterProps {
    handleClosingForms: MouseEventHandler<HTMLButtonElement>
}

const Register = ({ handleClosingForms }: RegisterProps) => {
    const { signup, error, isPending } = useSignup()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        signup(email, password)
    }


    return (
        <>
            <h2 className={styles.subtitle}>Register</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Email</span>
                    <input
                        type='email'
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                    />
                </label>
                <label>
                    <span>Password</span>
                    <input
                        type='password'
                        onChange={e => setPassword(e.target.value)}
                    />
                </label>
                <div className={styles.button_row}>
                    <button type='submit' className={styles.signupBtn}>Sign up!</button>
                    <button className={styles.return_button} onClick={handleClosingForms} type='button'>
                        <img src={arrowback} alt='Go back' />
                    </button>
                </div>
            </form>
            {error && <p>{error}</p>}
        </>
    );
}

export default Register;