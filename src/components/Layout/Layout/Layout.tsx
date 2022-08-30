import Sidebar from "../Sidebar/Sidebar";
import styles from './Layout.module.scss'
import { useState } from 'react'
import SpaceSelect from "../../ui/SpaceSelect/SpaceSelect";
import useDataContext from "../../../hooks/useDataContext";


interface LayoutProps {
    children: React.ReactNode
    title: string
    showSpaceSelect?: boolean
}

const Layout = ({ children, title, showSpaceSelect = true }: LayoutProps) => {
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
                    {showSpaceSelect && <SpaceSelect
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