import Sidebar from "./Sidebar";
import styles from './Layout.module.scss'
import SpaceSelect from "../Forms/SpaceSelect";
import useDataContext from "../../hooks/useDataContext";


interface LayoutProps {
    children: React.ReactNode
    title: string
    spaceSelect?: boolean
}

const Layout = ({ children, title, spaceSelect = true }: LayoutProps) => {
    const { selectedSpace, setSelectedSpace } = useDataContext()
    return (
        <>
            <Sidebar />
            <main className={styles.main}>
                <div className={styles.header}>
                    <h1>{title}</h1>
                    <hr />
                </div>
                <section className={styles.layout_section}>
                    {spaceSelect && <SpaceSelect
                        space={selectedSpace}
                        setSpace={setSelectedSpace}
                        usage={'header'}
                    />}
                    {children}
                </section>
            </main>
        </>
    );
}

export default Layout;