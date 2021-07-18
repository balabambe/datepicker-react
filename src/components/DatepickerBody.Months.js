import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import './Datepicker.scoped.scss';

const DatepickerBodyMonths = ({...args}) => {

  const {
    dateViews,
    selectedDate,
    setCurrentDayJs,
    selectedMonthOfYear,
    setSelectedDate,
    setDateView,
  } = args;

  const [currentYM, setCurrentYM] = useState(dayjs(selectedDate).format('YYYY-MM'));
  const [currentMonths, setCurrentMonths] = useState([]);

  const selectDate = (item) => {
    setDateView(dateViews[0]);
    setCurrentDayJs(dayjs(item));
    setCurrentYM(dayjs(item).format('YYYY-MM'));
    setSelectedDate(item);
  };

  useEffect(() => {
    const getCurrentMonths = [...Array(12).keys()].map((item) => dayjs(`${selectedMonthOfYear}-${item + 1}-01`).format('YYYY-MM-DD'));
    setCurrentMonths(getCurrentMonths);
  }, [selectedMonthOfYear, setCurrentMonths]);

  return (
    <div className="datepicker-body">
      <ul className="months-block">
        {
          currentMonths.map((item) => {
            return (
              <li
                key={item}
                className={`month clickable ${dayjs(item).format('YYYY-MM') === currentYM ? 'selected' : ''}`}
                onClick={() => selectDate(item)}
              >
                {dayjs(item).format('MMM')}
              </li>
            )
          })
        }
      </ul>
    </div>
  );
}

export default DatepickerBodyMonths;
