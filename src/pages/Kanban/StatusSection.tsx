import { Status } from "../../interfaces";
import styles from './Kanban.module.scss'
import StatusOrderChangeBtn from '../../components/ui/StatusOrderChangeBtn/StatusOrderChangeBtn'
import { useState } from "react";
import StatusDeleteBtn from '../../components/ui/StatusDeleteBtn/StatusDeleteBtn'
import StatusHideBtn from "../../components/ui/StatusHideBtn/StatusHideBtn";
import StatusTaskList from "./StatusTaskList";

interface StatusSectionProps {
    status: Status
}

const StatusSection = ({ status }: StatusSectionProps) => {
    const [showSection, setShowSection] = useState(true)

    return (
        <>
            {showSection ?
                <section>
                    <div className={styles.sectionHeader} style={{ backgroundColor: status.color }}>
                        <div>
                            <StatusHideBtn setShowStatus={setShowSection} showStatus={showSection} />
                            <StatusOrderChangeBtn variant='left' elemId={status.id!} current={status} />
                        </div>
                        <h2>{status.name}</h2>
                        <div>
                            <StatusDeleteBtn status={status} />
                            <StatusOrderChangeBtn variant='right' elemId={status.id!} current={status} />
                        </div>
                    </div>
                    <StatusTaskList status={status} />
                </section > :
                <section className={`${styles.section} ${styles.sectionHidden}`} style={{ backgroundColor: status.color }}>
                    <StatusHideBtn showStatus={showSection} setShowStatus={setShowSection} />
                </section>
            }
        </>
    );
}

export default StatusSection;