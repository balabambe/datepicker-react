import dayjs from 'dayjs';
import './Datepicker.scoped.scss';

const DatepickerBodyYears = ({...args}) => {

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
    </div>
  );
}

export default DatepickerBodyYears;
