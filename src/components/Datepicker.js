import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import EventNoteIcon from '@material-ui/icons/EventNote';
import './Datepicker.scoped.scss';

const dayWeekNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const dateFormat = 'YYYY-MM-DD';
const daysCount = 6 * 7;


const Datepicker = () => {

  const [currentDayJs, setCurrentDayJs] = useState(dayjs());
  const [currentDate] = useState(dayjs().format(dateFormat)); // 今天日期
  const [yyyy, setYyyy] = useState(); // 今日解構
  const [firstDayOfWeek, setFirstDayOfWeek] = useState(); // 這個月的 1 號是星期幾
  const [currentMMM, setCurrentMMM] = useState(); // 月份英文
  const [currentDaysInMonth, setCurrentDaysInMonth] = useState(); // 這個月有幾天(最後一天是幾號)
  
  const [prevMonthRemaningDays, setPrevMonthRemaningDays] = useState([]);
  const [currentMonthDays, setCurrentMonthDays] = useState([]);
  const [nextMonthRemaningDays, setNextMonthRemaningDays] = useState([]);

  const [selectedDate, setSelectedDate] = useState(currentDate);

  const changeMonth = (act) => {
    const newDayjs = dayjs(currentDayJs);
    switch (act) {
      case 'prev':
        setCurrentDayJs(newDayjs.subtract(1, 'month'));
        break;
      case 'next':
        setCurrentDayJs(newDayjs.add(1, 'month'));
        break;
      default:
    }
  }

  const clickDate = (item) => {
    console.log(item);
    setSelectedDate(item);
  }

  useEffect(() => {
    setYyyy(currentDate.split('-')[0]);
    setFirstDayOfWeek(currentDayJs.startOf('month').day());
    setCurrentMMM(currentDayJs.format('MMM'));
    setCurrentDaysInMonth(currentDayJs.daysInMonth());
    
    const prevMonthRemaningDays = [...Array(firstDayOfWeek).keys()].map((item) => currentDayJs.subtract(1, 'month').endOf('month').subtract(item, 'day').format(dateFormat)).reverse();
    setPrevMonthRemaningDays(prevMonthRemaningDays);
    const currentMonthDays = [...Array(currentDaysInMonth).keys()].map((item) => currentDayJs.startOf('month').add(item, 'day').format(dateFormat));
    setCurrentMonthDays(currentMonthDays);
    const nextMonthRemaningDays = [...Array(daysCount - prevMonthRemaningDays.length - currentMonthDays.length).keys()].map((item) => currentDayJs.add(1, 'month').startOf('month').add(item, 'day').format(dateFormat));
    setNextMonthRemaningDays(nextMonthRemaningDays);

  }, [setYyyy, setFirstDayOfWeek, setCurrentMMM, setCurrentDaysInMonth, setPrevMonthRemaningDays, setCurrentMonthDays, setNextMonthRemaningDays, currentDayJs, currentDate, firstDayOfWeek, currentDaysInMonth]);


  return (
    <>
      <EventNoteIcon />
      <div className="datepicker-main">
        <div className="datepicker-header">
          <div className="datepicker-nav">
            <div className="prev day clickable" onClick={() => changeMonth('prev')}>
              <ArrowForwardIosIcon />
            </div>
            <div className="date-title clickable">{currentMMM} {yyyy}</div>
            <div className="next day clickable" onClick={() => changeMonth('next')}>
              <ArrowForwardIosIcon />
            </div>
          </div>
          <ul className="datepicker-dayweekname">
            { dayWeekNames.map((item) => {
              return (
                <li className="day" key={item}>{item}</li>
              );
            })}
          </ul>
        </div>
        <div className="datepicker-body">
          <ul className="days-block">
            {
              prevMonthRemaningDays.map((item) => {
                return (
                  <li
                    key={item}
                    className={`day outside-day prev-month clickable ${selectedDate === item ? 'selected' : ''}`}
                    onClick={() => {
                      clickDate(item);
                    }}
                  >
                    {dayjs(item).format('D')}
                  </li>
                )
              })
            }
            {
              currentMonthDays.map((item) => {
                return (
                  <li
                    key={item}
                    className={`day current-month clickable ${currentDate === item ? 'current-day' : ''} ${selectedDate === item ? 'selected' : ''}`}
                    onClick={() => {
                      clickDate(item);
                    }}
                  >
                    {dayjs(item).format('D')}
                  </li>
                )
              })
            }
            {
              nextMonthRemaningDays.map((item) => {
                return (
                  <li
                    key={item}
                    className={`day outside-day next-month clickable ${selectedDate === item ? 'selected' : ''}`}
                    onClick={() => {
                      clickDate(item);
                    }}
                  >
                    {dayjs(item).format('D')}
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    </>
  )
}

export default Datepicker;