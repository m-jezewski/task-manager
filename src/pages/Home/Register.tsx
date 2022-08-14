import { useState, MouseEventHandler, FormEvent } from 'react';
import arrowback from '../../assets/arrowback.svg'
import styles from './Home.module.scss'
import { useSignup } from '../../hooks/useSignup'

interface RegisterProps {
    handleClosingForms: MouseEventHandler<HTMLButtonElement>
}

const Register = ({ handleClosingForms }: RegisterProps) => {
    const { signup, error, isPending } = useSignup()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        signup(email, password, name)
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
                <label>
                    <span>Name</span>
                    <input
                        type='text'
                        maxLength={15}
                        onChange={e => setName(e.target.value)}
                        value={name}
                    ></input>
                </label>
                <div className={styles.button_row}>
                    <button className={styles.return_button} onClick={handleClosingForms}>
                        <img src={arrowback} alt='Go back' />
                    </button>
                    <button type='submit' className={styles.signupBtn}>Sign up!</button>
                </div>
            </form>
            {error && <p>{error}</p>}
        </>
    );
}

export default Register;