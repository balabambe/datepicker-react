import dayjs from 'dayjs';
import './Datepicker.scoped.scss';

const DatepickerBodyDays = ({...args}) => {

  const {
    currentDate,
    dayWeekNames,
    prevMonthRemaningDays,
    currentMonthDays,
    nextMonthRemaningDays,
    selectedDate,
    setSelectedDate,
  } = args;

  const selectDate = (item) => setSelectedDate(item);

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
                className={`day outside-day prev-month clickable ${selectedDate === item ? 'selected' : ''}`}
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
                className={`day current-month clickable ${currentDate === item ? 'current-day' : ''} ${selectedDate === item ? 'selected' : ''}`}
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
                className={`day outside-day next-month clickable ${selectedDate === item ? 'selected' : ''}`}
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
