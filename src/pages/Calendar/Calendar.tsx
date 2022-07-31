import Layout from '../../components/Layout/Layout'
import { Tab } from '@headlessui/react'
import DayCal from './DayCal/DayCal'
import MonthlyCal from './MonthlyCal/MonthlyCal'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import WeeklyCal from './WeeklyCal/WeeklyCal'
import { useNavigate, useLocation, Outlet, useParams, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'

dayjs.extend(customParseFormat)

const Calendar = () => {
    const navigate = useNavigate()
    const { date: dateParams } = useParams()
    const date = dayjs(dateParams, 'DD-MM-YYYY').isValid() ? dayjs(dateParams, 'DD-MM-YYYY') : dayjs()

    useEffect(() => {
        navigate(date.format('DD-MM-YYYY'), { replace: true })
    }, [])

    return (
        <Layout title='Calendar'>
            <Outlet context={{ date }} />
        </Layout>
    );
}

export default Calendar;