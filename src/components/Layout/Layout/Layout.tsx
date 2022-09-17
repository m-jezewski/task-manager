import Sidebar from "../Sidebar/Sidebar";
import styles from './Layout.module.scss'


interface LayoutProps {
    children: React.ReactNode
    title: string
}

const Layout = ({ children, title }: LayoutProps) => {
    return (
        <>
            <Sidebar />
            <div className={styles.layoutContainer}>
                <header className={styles.header}>
                    <h1>{title}</h1>
                    <hr />
                </header>
                <main>
                    {children}
                </main>
            </div>
        </>
    );
}

export default Layout;