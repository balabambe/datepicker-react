import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import './Datepicker.scoped.scss';

const dayWeekNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const DatepickerBodyDays = ({...args}) => {

  const daysCount = 6 * 7;

  const {
    currentDayJs,
    immutableToday,
    selectedDate,
    setSelectedDate,
    dateFormat,
  } = args;

  const selectDate = (item) => setSelectedDate(item);


  const [firstDayOfWeek, setFirstDayOfWeek] = useState(); // 這個月的 1 號是星期幾
  const [currentDaysInMonth, setCurrentDaysInMonth] = useState(); // 這個月有幾天(最後一天是幾號)
  
  const [prevMonthRemaningDays, setPrevMonthRemaningDays] = useState([]);
  const [currentMonthDays, setCurrentMonthDays] = useState([]);
  const [nextMonthRemaningDays, setNextMonthRemaningDays] = useState([]);

  useEffect(() => {
    setFirstDayOfWeek(currentDayJs.startOf('month').day()); // 取得本月的第一天是星期幾
    setCurrentDaysInMonth(currentDayJs.daysInMonth()); // 取得本月有幾天
    
    // 以本月的第一天是星期幾，並往前推算取得並顯示上月的日數
    const prevMonthRemaningDays = [...Array(firstDayOfWeek).keys()].map((item) => currentDayJs.subtract(1, 'month').endOf('month').subtract(item, 'day').format(dateFormat)).reverse();
    setPrevMonthRemaningDays(prevMonthRemaningDays);
    
    // 以本月有幾天取得本月所有的日數
    const currentMonthDays = [...Array(currentDaysInMonth).keys()].map((item) => currentDayJs.startOf('month').add(item, 'day').format(dateFormat));
    setCurrentMonthDays(currentMonthDays);

    // 顯示這一個月最多有 6 * 7 格，取得 prevMonthRemaningDays 的 length 與本月 currentMonthDays 的 length，並去除掉這些已經取得的日數，就是剩下下個月可以取得的日數
    const nextMonthRemaningDays = [...Array(daysCount - prevMonthRemaningDays.length - currentMonthDays.length).keys()].map((item) => currentDayJs.add(1, 'month').startOf('month').add(item, 'day').format(dateFormat));
    setNextMonthRemaningDays(nextMonthRemaningDays);

  }, [
    setFirstDayOfWeek,
    setCurrentDaysInMonth,
    setPrevMonthRemaningDays,
    setCurrentMonthDays,
    setNextMonthRemaningDays,
    currentDayJs,
    immutableToday,
    firstDayOfWeek,
    currentDaysInMonth,
    daysCount,
    dateFormat]
  );

  return (
    <div className="datepicker-body">
      <ul className="datepicker-dayweekname">
        { dayWeekNames.map((item) => {
          return (
            <li className="day" key={item}>{item}</li>
          );
        })}
      </ul>
      <ul className="days-block">
        {
          prevMonthRemaningDays.map((item) => {
            return (
              <li
                key={item}
                className={`day outside prev-month clickable ${selectedDate === item ? 'selected' : ''}`}
                onClick={() => {
                  selectDate(item);
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
                className={`day current-month clickable ${immutableToday === item ? 'current-day' : ''} ${selectedDate === item ? 'selected' : ''}`}
                onClick={() => {
                  selectDate(item);
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
                className={`day outside next-month clickable ${selectedDate === item ? 'selected' : ''}`}
                onClick={() => {
                  selectDate(item);
                }}
              >
                {dayjs(item).format('D')}
              </li>
            )
          })
        }
      </ul>
    </div>
  );
}

export default DatepickerBodyDays;
