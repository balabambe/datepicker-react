import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import DatepickerTitle from './DatepickerTitle';
import DatepickerBody from './DatepickerBody';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import EventNoteIcon from '@material-ui/icons/EventNote';
import './Datepicker.scoped.scss';

const dayWeekNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const dateFormat = 'YYYY-MM-DD';
const daysCount = 6 * 7;
const dateViews = ['day', 'month', 'year'];

const Datepicker = () => {

  const [currentDayJs, setCurrentDayJs] = useState(dayjs()); // 整個變動的核心
  const [immutableToday] = useState(dayjs().format(dateFormat)); // 今天日期，不可動
  const [firstDayOfWeek, setFirstDayOfWeek] = useState(); // 這個月的 1 號是星期幾
  const [currentDaysInMonth, setCurrentDaysInMonth] = useState(); // 這個月有幾天(最後一天是幾號)
  
  const [prevMonthRemaningDays, setPrevMonthRemaningDays] = useState([]);
  const [currentMonthDays, setCurrentMonthDays] = useState([]);
  const [nextMonthRemaningDays, setNextMonthRemaningDays] = useState([]);

  const [selectedMonthOfYear, setSelectedMonthOfYear] = useState(dayjs(immutableToday).format('YYYY'));

  const [selectedDate, setSelectedDate] = useState(immutableToday);

  const [dateView, setDateView] = useState(dateViews[0]);

  const togglePrevNext = (act, type) => {
    const newDayjs = dayjs(currentDayJs);
    switch (act) {
      case 'prev':
        setCurrentDayJs(newDayjs.subtract(1, type));
        break;
      case 'next':
        setCurrentDayJs(newDayjs.add(1, type));
        break;
      default:
    }
  }
  const changeYear = (act) => {
    switch (act) {
      case 'prev':
        setSelectedMonthOfYear(dayjs(selectedMonthOfYear).subtract(1, 'year').format('YYYY'));
        break;
      case 'next':
        setSelectedMonthOfYear(dayjs(selectedMonthOfYear).add(1, 'year').format('YYYY'));
        break;
      default:
    }
  }

  const switchToggle = (act) => {
    switch (dateView) {
      case dateViews[1]:
        togglePrevNext(act, 'year');
        changeYear(act);
        break;
      case dateViews[2]:
        togglePrevNext(act, 'years');
        break;
      default:
      case dateViews[0]:
        togglePrevNext(act, 'month');
        break;
    }
  }

  useEffect(() => {
    setFirstDayOfWeek(currentDayJs.startOf('month').day());
    setCurrentDaysInMonth(currentDayJs.daysInMonth());
    setSelectedMonthOfYear(dayjs(immutableToday).format('YYYY'));
    
    const prevMonthRemaningDays = [...Array(firstDayOfWeek).keys()].map((item) => currentDayJs.subtract(1, 'month').endOf('month').subtract(item, 'day').format(dateFormat)).reverse();
    setPrevMonthRemaningDays(prevMonthRemaningDays);
    const currentMonthDays = [...Array(currentDaysInMonth).keys()].map((item) => currentDayJs.startOf('month').add(item, 'day').format(dateFormat));
    setCurrentMonthDays(currentMonthDays);
    const nextMonthRemaningDays = [...Array(daysCount - prevMonthRemaningDays.length - currentMonthDays.length).keys()].map((item) => currentDayJs.add(1, 'month').startOf('month').add(item, 'day').format(dateFormat));
    setNextMonthRemaningDays(nextMonthRemaningDays);
  }, [
    setFirstDayOfWeek,
    setCurrentDaysInMonth,
    setSelectedMonthOfYear,
    setPrevMonthRemaningDays,
    setCurrentMonthDays,
    setNextMonthRemaningDays,
    currentDayJs,
    immutableToday,
    firstDayOfWeek,
    currentDaysInMonth,
  ]);


  return (
    <>
      <EventNoteIcon />
      <div className="datepicker-main">
        <div className="datepicker-header">
          <div className="datepicker-nav">
            <div className="prev day clickable" onClick={() => switchToggle('prev')}>
              <ArrowForwardIosIcon />
            </div>
            <DatepickerTitle
              currentDayJs={currentDayJs}
              dateViews={dateViews}
              dateView={dateView}
              setDateView={setDateView}
            />
            <div className="next day clickable" onClick={() => switchToggle('next')}>
              <ArrowForwardIosIcon />
            </div>
          </div>
        </div>
        <DatepickerBody
          dateViews={dateViews}
          dateView={dateView}
          immutableToday={immutableToday}
          dayWeekNames={dayWeekNames}
          prevMonthRemaningDays={prevMonthRemaningDays}
          currentMonthDays={currentMonthDays}
          nextMonthRemaningDays={nextMonthRemaningDays}
          selectedDate={selectedDate}
          setDateView={setDateView}
          selectedMonthOfYear={selectedMonthOfYear}
          setCurrentDayJs={setCurrentDayJs}
          setSelectedDate={setSelectedDate}
        />
      </div>
    </>
  )
}

export default Datepicker;