import './Datepicker.scoped.scss';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import EventNoteIcon from '@material-ui/icons/EventNote';

const Datepicker = () => {
  return (
    <>
      <div className="main">
        <p class="wording">is date picker</p>
      </div>
      <ArrowBackIosIcon />
      <ArrowForwardIosIcon />
      <EventNoteIcon />
    </>
  )
}

export default Datepicker;