import { Tab } from "@headlessui/react";
import dayjs, { Dayjs } from "dayjs";
import { useNavigate, useOutletContext } from "react-router-dom";
import DayCal from "./DayCal/DayCal";
import MonthlyCal from "./MonthlyCal/MonthlyCal";
import WeeklyCal from "./WeeklyCal/WeeklyCal";
import styles from './Calendar.module.scss'
import useDataContext from "../../hooks/useDataContext";

const CalPanels = () => {
    const navigate = useNavigate()

    const { date } = useOutletContext() as { date: Dayjs }
    const { tasks, statuses } = useDataContext()

    const handleChange = (e: any) => {
        navigate(`../${dayjs(e.target.value).format('DD-MM-YYYY')}`, { replace: true })
    }

    return (
        <Tab.Group>
            <Tab.List>
                {({ selectedIndex }: any) => <>
                    <Tab className={`text-button darken_hover ${styles.tab} ${selectedIndex === 0 && styles.tab_active}`} >DAY</Tab>
                    <Tab className={`text-button darken_hover ${styles.tab} ${selectedIndex === 1 && styles.tab_active}`} >WEEK</Tab>
                    <Tab className={`text-button darken_hover ${styles.tab} ${selectedIndex === 2 && styles.tab_active}`} >MONTH</Tab>
                    <input
                        className={styles.date_input}
                        value={date.format('YYYY-MM-DD')}
                        type={'date'}
                        onChange={handleChange}
                    /></>}
            </Tab.List>
            <Tab.Panels className={styles.tab_panels}>
                <Tab.Panel>
                    <DayCal date={date} tasks={tasks} statuses={statuses} />
                </Tab.Panel>
                <Tab.Panel>
                    <WeeklyCal date={date} tasks={tasks} statuses={statuses} />
                </Tab.Panel>
                <Tab.Panel>
                    <MonthlyCal date={date} tasks={tasks} statuses={statuses} />
                </Tab.Panel>
            </Tab.Panels>
        </Tab.Group>
    );
}

export default CalPanels;