import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import './Datepicker.scoped.scss';

const DatepickerBodyYears = ({...args}) => {

  const {
    currentDayJs,
    dateFormat,
    setCurrentDayJs,
    selectedDate,
    setSelectedDate,
    dateViews,
    setDateView,
  } = args;

  const [currentYears, setCurrentYears] = useState([]);

  const selectYear = (item) => {
    setDateView(dateViews[1]);
    setCurrentDayJs(dayjs(item));
    setSelectedDate(item);
  }

  useEffect(() => {
    const theYear = parseInt(dayjs(currentDayJs).format('YYYY'));
    const yearHead = theYear - (theYear % 10);
    const years = [...Array(10).keys()].map((item) => dayjs(`${yearHead}-01-01`).add(item, 'year').format(dateFormat));
    setCurrentYears(years);
  }, [currentDayJs, dateFormat]);

  return (
    <div className="datepicker-body">
      <ul className="years-block">
        <li
          key={dayjs(currentYears[0]).subtract(1, 'year').format('YYYY-MM-DD')}
          className="year outside clickable"
          onClick={() => selectYear(dayjs(currentYears[0]).subtract(1, 'year').format('YYYY-MM-DD'))}
        >
          {dayjs(currentYears[0]).subtract(1, 'year').format('YYYY')}
        </li>
        {
          currentYears.map((item) => {
            return (
              <li
                key={item}
                className={`year clickable ${dayjs(selectedDate).format('YYYY') === dayjs(item).format('YYYY') ? 'selected' : ''}`}
                onClick={() => selectYear(item)}
              >
                {dayjs(item).format('YYYY')}
              </li>
            )
          })
        }
        <li
          key={dayjs(currentYears[currentYears.length - 1]).add(1, 'year').format('YYYY-MM-DD')}
          className="year outside clickable"
          onClick={() => selectYear(dayjs(currentYears[currentYears.length - 1]).add(1, 'year').format('YYYY-MM-DD'))}
        >
          {dayjs(currentYears[currentYears.length - 1]).add(1, 'year').format('YYYY')}
        </li>
      </ul>
    </div>
  );
}

export default DatepickerBodyYears;
