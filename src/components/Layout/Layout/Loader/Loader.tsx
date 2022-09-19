import styles from './Loader.module.scss'

const Loader = () => {
    return (
        <div className={styles.container}>
            <div className={styles.loader}>
                <h1>Task Manager</h1>
                <div className={styles.ldsRing}><div /><div /><div /><div /></div>
            </div>
        </div>
    );
}

export default Loader;