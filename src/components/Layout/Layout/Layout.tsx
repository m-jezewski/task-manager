import Sidebar from "../Sidebar/Sidebar";
import styles from './Layout.module.scss'
import SpaceSelect from "../../ui/SpaceSelect/SpaceSelect";
import useDataContext from "../../../hooks/useDataContext";


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
            <div className={styles.layoutContainer}>
                <header className={styles.header}>
                    <h1>{title}</h1>
                    <hr />
                </header>
                <main>
                    {spaceSelect && <SpaceSelect
                        space={selectedSpace}
                        setSpace={setSelectedSpace}
                        usage={'header'}
                    />}
                    {children}
                </main>
            </div>
        </>
    );
}

export default Layout;