import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import './Datepicker.scoped.scss';

const DatepickerBodyYears = ({...args}) => {

  const {
    currentDayJs,
    dateFormat,
  } = args;

  const [currentYears, setCurrentYears] = useState([]);

  useEffect(() => {
    const theYear = parseInt(dayjs(currentDayJs).format('YYYY'));
    const yearHead = theYear - (theYear % 10);
    const years = [...Array(10).keys()].map((item) => dayjs(`${yearHead}-01-01`).add(item, 'year').format(dateFormat));
    setCurrentYears(years);
  }, [currentDayJs, dateFormat]);

  return (
    <div className="datepicker-body">
      <ul className="years-block">
        <li className="year outside clickable">{dayjs(currentYears[0]).subtract(1, 'year').format('YYYY')}</li>
        {
          currentYears.map((item) => {
            return (
              <li className={`year clickable ${dayjs(currentDayJs).format('YYYY') === dayjs(item).format('YYYY') ? 'selected' : ''}`}>{dayjs(item).format('YYYY')}</li>
            )
          })
        }
        <li className="year outside clickable">{dayjs(currentYears[currentYears.length - 1]).add(1, 'year').format('YYYY')}</li>
      </ul>
    </div>
  );
}

export default DatepickerBodyYears;
