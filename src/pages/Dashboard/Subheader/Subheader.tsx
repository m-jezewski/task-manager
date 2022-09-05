import styles from './Subheader.module.scss'
import { useState, useEffect } from 'react'
import dayjs from 'dayjs'

interface SubheaderProps {

}

const Subheader = () => {
    const [date, setDate] = useState(dayjs())
    //useEffect(() => {
    //    setInterval(() => {
    //        setDate(dayjs())
    //    }, 1000)
    //})

    return (
        <div className={styles.subheader}>
            <span>
                {date.format('dddd DD/MM/YYYY')}
            </span>
            {date.format('HH:mm:ss')}
        </div>
    );
}

export default Subheader;