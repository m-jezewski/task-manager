import Sidebar from "../Sidebar/Sidebar";
import Select from '../Select/Select'
import Title from '../Title/Title'
import styles from './Layout.module.css'


interface LayoutProps {
    children: React.ReactNode
    title: string
}

const Layout = ({ children, title }: LayoutProps) => {
    return (
        <>
            <Sidebar />
            <main>
                <Title>{title}</Title>
                <section className={styles.layout_section}>
                    <Select />
                    {children}
                </section>
            </main>
        </>
    );
}

export default Layout;