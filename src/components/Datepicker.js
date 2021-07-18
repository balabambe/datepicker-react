import { useState } from 'react';
import dayjs from 'dayjs';
import DatepickerTitle from './DatepickerTitle';
import DatepickerBody from './DatepickerBody';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import EventNoteIcon from '@material-ui/icons/EventNote';
import './Datepicker.scoped.scss';

const dateFormat = 'YYYY-MM-DD';
const dateViews = ['day', 'month', 'year'];

const Datepicker = () => {

  const [currentDayJs, setCurrentDayJs] = useState(dayjs()); // 整個變動的核心
  const [immutableToday] = useState(dayjs().format(dateFormat)); // 今天日期，不可動

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

  const switchToggle = (act) => {
    switch (dateView) {
      case dateViews[1]:
        togglePrevNext(act, 'year');
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
          currentDayJs={currentDayJs}
          dateFormat={dateFormat}
          dateViews={dateViews}
          dateView={dateView}
          immutableToday={immutableToday}
          selectedDate={selectedDate}
          setDateView={setDateView}
          setCurrentDayJs={setCurrentDayJs}
          setSelectedDate={setSelectedDate}
        />
      </div>
    </>
  )
}

export default Datepicker;