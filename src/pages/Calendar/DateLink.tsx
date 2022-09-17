import { Dayjs } from "dayjs";
import { Link } from "react-router-dom";
import arrowLeft from '../../assets/icons/arrowLeft.svg'
import arrowRight from '../../assets/icons/arrowRight.svg'
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter'

interface DateLinkProps {
    move: 'forward' | 'back'
    by: 'day' | 'week' | 'month'
    date: Dayjs
}

const DateLink = ({ move, by, date }: DateLinkProps) => {
    return (
        <Link
            to={move === 'back' ?
                `../../${date.subtract(1, by).format('DD-MM-YYYY')}/${capitalizeFirstLetter(by)}` :
                `../../${date.add(1, by).format('DD-MM-YYYY')}/${capitalizeFirstLetter(by)}`}
            replace={true}
        >
            {move === "back" && <img src={arrowLeft} alt={`move back to previous ${by}`} />}
            {move === 'forward' && <img src={arrowRight} alt={`move forward to next ${by}`} />}
        </Link>
    );
}

export default DateLink;