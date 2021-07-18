import { useState } from 'react';
import dayjs from 'dayjs';
import DatepickerTitle from './DatepickerTitle';
import DatepickerBody from './DatepickerBody';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import './Datepicker.scoped.scss';

const dateFormat = 'YYYY-MM-DD';
const dateViews = ['day', 'month', 'year'];

const Datepicker = ({date = dayjs(), onSelect = (() => {}), opened = false}) => {

  const [currentDayJs, setCurrentDayJs] = useState(dayjs(date)); // 整個變動的核心
  const [immutableToday] = useState(dayjs().format(dateFormat)); // 今天日期，不可動

  const [selectedDate, setSelectedDate] = useState(immutableToday);

  const [dateView, setDateView] = useState(dateViews[0]);

  const togglePrevNext = (act, type, quantity = 1) => {
    const newDayjs = dayjs(currentDayJs);
    switch (act) {
      case 'prev':
        setCurrentDayJs(newDayjs.subtract(quantity, type));
        break;
      case 'next':
        setCurrentDayJs(newDayjs.add(quantity, type));
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
        togglePrevNext(act, 'year', 10);
        break;
      default:
      case dateViews[0]:
        togglePrevNext(act, 'month');
        break;
    }
  }

  return ( opened &&
    <>
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
          onSelect={onSelect}
        />
      </div>
    </>
  )
}

export default Datepicker;