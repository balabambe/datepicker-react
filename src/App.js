import { useState } from 'react';
import './App.scss';
import './components/Datepicker.scoped.scss';
import Datepicker from './components/Datepicker';
import EventNoteIcon from '@material-ui/icons/EventNote';

const App = () => {

  const [datepickerOpen, setDatepickerOpen] = useState(false);
  const [date, setDate] = useState('');

  const onSelect = (item) => {
    setDate(item);
    setDatepickerOpen(false);
  }

  return (
    <div className="App">
      <div className="datepicker-input">
        <div className="input-block">
          <label htmlFor="datepicker-input">
            <i className="icon-calendar"><EventNoteIcon /></i>
          </label>
          <input
            id="datepicker-input"
            type="text"
            onFocus={() => setDatepickerOpen(true)}
            defaultValue={date}
          />
        </div>
        <Datepicker opened={datepickerOpen} onSelect={(item) => onSelect(item)}/>
      </div>
    </div>
  );
}

export default App;
