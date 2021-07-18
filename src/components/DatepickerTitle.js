import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import './Datepicker.scoped.scss';

const DatepickerTitle = ({dateViews, dateView, setDateView, currentDayJs}) => {
  const [currentMMM, setCurrentMMM] = useState(); // 月份英文

  useEffect(() => {
    setCurrentMMM(currentDayJs.format('MMM'));
  }, [
    currentDayJs,
    setCurrentMMM,
  ]);

  let header;
  switch (dateView) {
    case dateViews[1]:
      header = (
        <div className="date-title clickable" onClick={() => setDateView(dateViews[2])}>{dayjs(currentDayJs).format('YYYY')}</div>
      )
      break;
    case dateViews[2]:
      header = (
        <div className="date-title clickable">{dayjs(currentDayJs).format('YYYY')}</div>
      )
      break;
    default:
    case dateViews[0]:
      header = (
        <div className="date-title clickable" onClick={() => setDateView(dateViews[1])}>{currentMMM} {dayjs(currentDayJs).format('YYYY')}</div>
      )
      break;
  }
  return header;
}

export default DatepickerTitle;
