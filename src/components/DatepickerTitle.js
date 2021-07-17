import './Datepicker.scoped.scss';

const DatepickerTitle = ({dateViews, dateView, setDateView, currentMMM, yyyy}) => {
  let header;
  switch (dateView) {
    case dateViews[1]:
      header = (
        <div className="date-title clickable" onClick={() => setDateView(dateViews[2])}>{yyyy}</div>
      )
      break;
    case dateViews[2]:
      header = (
        <div className="date-title clickable">{yyyy}</div>
      )
      break;
    default:
    case dateViews[0]:
      header = (
        <div className="date-title clickable" onClick={() => setDateView(dateViews[1])}>{currentMMM} {yyyy}</div>
      )
      break;
  }
  return header;
}

export default DatepickerTitle;
