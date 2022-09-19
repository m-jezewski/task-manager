import useDataContext from "../../../hooks/useDataContext";
import Sidebar from "../Sidebar/Sidebar";
import styles from './Layout.module.scss'
import Loader from "./Loader/Loader";


interface LayoutProps {
    children: React.ReactNode
    title: string
}

const Layout = ({ children, title }: LayoutProps) => {

    const { isPending } = useDataContext()

    return (
        <>
            <Sidebar />
            {isPending ?
                <Loader /> :
                <div className={styles.layoutContainer}>
                    <header className={styles.header}>
                        <h1>{title}</h1>
                        <hr />
                    </header>
                    <main>
                        {children}
                    </main>
                </div>}
        </>
    );
}

export default Layout;