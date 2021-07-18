import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import './Datepicker.scoped.scss';

const dayWeekNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const DatepickerBodyDays = ({...args}) => {

  const daysCount = 6 * 7; // 一個月可顯示的日期有 42 格

  const {
    currentDayJs,
    immutableToday,
    selectedDate,
    setSelectedDate,
    dateFormat,
    onSelect,
  } = args;

  // 選取日期後 emit date 上去
  const selectDate = (item) => {
    setSelectedDate(item);
    onSelect(item);
  };

  const [firstDayOfWeek, setFirstDayOfWeek] = useState(); // 這個月的 1 號是星期幾
  const [currentDaysInMonth, setCurrentDaysInMonth] = useState(); // 這個月有幾天(最後一天是幾號)
  
  const [prevMonthRemaningDays, setPrevMonthRemaningDays] = useState([]); // 本月的前幾天可顯示的日期 Array
  const [currentMonthDays, setCurrentMonthDays] = useState([]); // 這個月的日期 Array
  const [nextMonthRemaningDays, setNextMonthRemaningDays] = useState([]); // 下個月可顯示的日期 Array

  useEffect(() => {
    setFirstDayOfWeek(currentDayJs.startOf('month').day()); // 取得本月的第一天是星期幾
    setCurrentDaysInMonth(currentDayJs.daysInMonth()); // 取得本月有幾天
    
    // 以本月的第一天是星期幾，並往前推算取得顯示上月的日數
    // ex: ['2021-06-27' ... '2021-06-30']
    const prevMonthRemaningDays = [...Array(firstDayOfWeek).keys()].map((item) => currentDayJs.subtract(1, 'month').endOf('month').subtract(item, 'day').format(dateFormat)).reverse();
    setPrevMonthRemaningDays(prevMonthRemaningDays);
    
    // 以本月有幾天取得本月所有的日數
    // ex: ['2021-07-01' ... '2021-07-30']
    const currentMonthDays = [...Array(currentDaysInMonth).keys()].map((item) => currentDayJs.startOf('month').add(item, 'day').format(dateFormat));
    setCurrentMonthDays(currentMonthDays);

    // 顯示這一個月最多有 6 * 7 格，取得 prevMonthRemaningDays 的 length 與本月 currentMonthDays 的 length，並去除掉這些已經取得的日數，就是剩下下個月可以取得的日數
    // ex: ['2021-08-01' ... '2021-08-07']
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
          // 前一個月
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
          // 本月
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
          // 下一個月
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
