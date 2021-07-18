import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import './Datepicker.scoped.scss';

const DatepickerTitle = ({dateViews, dateView, setDateView, currentDayJs}) => {
  const [currentMMM, setCurrentMMM] = useState(); // 月份英文
  const [yearRange, setYearRange] = useState();

  useEffect(() => {
    const theYear = parseInt(dayjs(currentDayJs).format('YYYY'));
    const yearHead = theYear - (theYear % 10);
    setYearRange(yearHead);
    setCurrentMMM(currentDayJs.format('MMM'));
  }, [
    currentDayJs,
    setCurrentMMM,
    setYearRange,
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
        <div className="date-title clickable">{`${yearRange}-${yearRange + 9}`}</div>
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
