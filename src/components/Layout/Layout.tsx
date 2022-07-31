import Sidebar from "./Sidebar";
import Select from './Select'
import styles from './Layout.module.scss'


interface LayoutProps {
    children: React.ReactNode
    title: string
}

const Layout = ({ children, title }: LayoutProps) => {
    return (
        <>
            <Sidebar />
            <main className={styles.main}>
                <div className={styles.header}>
                    <h1>{title}</h1>
                    <hr />
                </div>
                <section className={styles.layout_section}>
                    <Select />
                    {children}
                </section>
            </main>
        </>
    );
}

export default Layout;