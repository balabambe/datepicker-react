import DatepickerBodyDays from './DatepickerBody.Days';

const DatepickerBody = ({...args}) => {

  const {dateViews} = args;

  return (
    <DatepickerBodyDays {...args} />
  );
}

export default DatepickerBody;
