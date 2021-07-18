import DatepickerBodyDays from './DatepickerBody.Days';
import DatepickerBodyMonths from './DatepickerBody.Months';
import DatepickerBodyYears from './DatepickerBody.Years';

const DatepickerBody = ({...args}) => {

  const {dateViews, dateView} = args;
  let bodies;
  switch (dateView) {
    case dateViews[1]:
      bodies = <DatepickerBodyMonths {...args} />;  
      break;
    case dateViews[2]:
      bodies = <DatepickerBodyYears {...args} />;  
      break;
    default:
    case dateViews[0]:
      bodies = <DatepickerBodyDays {...args} />;  
      break;  
  }

  return bodies;
}

export default DatepickerBody;
