import { Link } from 'react-router-dom';
import styles from './NoSpaces.module.scss'

const NoSpaces = () => {
    return (
        <div className={styles.container}>
            <Link to='../Dashboard'>Create at least one space to add new statuses and tasks!</Link>
        </div>
    );
}

export default NoSpaces;