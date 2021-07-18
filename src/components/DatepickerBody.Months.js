import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import './Datepicker.scoped.scss';

const DatepickerBodyMonths = ({...args}) => {

  const {
    currentDayJs,
    selectedDate,
    dateViews,
    setCurrentDayJs,
    setSelectedDate,
    setDateView,
  } = args;

  const [currentMonths, setCurrentMonths] = useState([]);

  const selectDate = (item) => {
    setDateView(dateViews[0]);
    setCurrentDayJs(dayjs(item));
    setSelectedDate(item);
  };

  useEffect(() => {
    /**
     * 取得 Jan ~ Dec 的 value
     * ex: ['2021-01-01' ... '2021-12-01']
     */
    const getCurrentMonths = [...Array(12).keys()].map((item) => dayjs(currentDayJs).startOf('year').add(item, 'month').format('YYYY-MM-DD'));
    setCurrentMonths(getCurrentMonths);
  }, [currentDayJs, setCurrentMonths]);

  return (
    <div className="datepicker-body">
      <ul className="months-block">
        {
          currentMonths.map((item) => {
            return (
              <li
                key={item}
                className={`month clickable ${dayjs(item).format('YYYY-MM') === dayjs(selectedDate).format('YYYY-MM') ? 'selected' : ''}`}
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
