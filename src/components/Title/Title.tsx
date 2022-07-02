import styles from './Title.module.css'

interface TitleProps {
    children: string
    hStyles?: {}
}

const Title = ({ children, hStyles }: TitleProps) => {
    return (
        <div className={styles.title}>
            <h1>{children}</h1>
            <hr />
        </div>
    )
}

export default Title;