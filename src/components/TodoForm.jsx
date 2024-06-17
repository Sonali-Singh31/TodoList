import React ,{useState}from 'react'

import {Bell, CalendarDay, Clock, Palette, X} from 'react-bootstrap-icons';
import DatePicker from 'react-datepicker';
import Datepicker from 'react-multi-date-picker';
import 'react-datepicker/dist/react-datepicker.css'
import  TimePicker  from 'react-multi-date-picker/plugins/time_picker';
import 'react-time-picker/dist/TimePicker.css'
import colors from 'react-multi-date-picker/plugins/colors';
// import 'react-time-picker/dist/react-timePicker.css'

const TodoForm = ({
    handlSubmit,
    heading = false,
    text,setText,
    day,setDay,
    time,setTime,
    todoProject,setTodoProject,  
    projects,
    showButtons = false,
    setShowModel= false
}) => {
  
    const [placeholder, setPlaceholder] = useState('Select time');

  const handleTimeChange = (time) => {
    setTime(time);
    setPlaceholder(''); 
    // Clear placeholder once a time is selected
  };

  return (
   
        <form action="" onSubmit={handlSubmit} className='TodoForm'>
          <div className="text">
            {
                heading &&
                <h3>{heading}</h3>
            }
            <input 
            type="text"
            value={text}
            onChange={(e)=>setText(e.target.value)}
            placeholder='To do...'
            autoFocus />

          </div>
          <div className="remind">
            <Bell/>
            <p>Remind Me!</p>
          </div>
          <div className="pick-day">
            <div className="title">
              <CalendarDay/>
              <p>Choose a day</p>
            </div>
            <DatePicker
            selected={day}
            onChange={(day)=>setDay(day)}
            dateFormat="MM/dd/yyyy"
            />
          </div>
          <div className="pick-time">
            <div className="title">
              <Clock/>
              <p>Choose time</p>
            </div>
            <Datepicker
            disableDayPicker
            selected={time}
            onChange={(time)=>setTime(time)}
            format='hh:mm A'
            plugins={[<TimePicker position="bottom"/>]}
            render={(value, openCalendar) => (
              <input
                type="text"
                value={value || placeholder}
                onFocus={openCalendar}
                onChange={(e) => handleTimeChange(e.target.value)}
                placeholder={placeholder}
              />
  )}
            />
          </div>
          <div className="pick-project">
            <div className="title">
              <Palette/>
              <p>Choose a project</p>
            </div>
            
          <div className="projects">
            {
                projects.length>0 ?
                projects.map(project =>
                  <div className={`project ${todoProject ===project.name?"active":""}`} 
                  onClick={()=>setTodoProject(project.name)}
                  key={project.id}
                    >
                        {project.name}
                    </div>
                ):
                <div style={{color:'#ff0000'}}>
                  Please add a project before proceeding
                </div>
            }
          </div>
          </div>
          {
            showButtons && 
            <div>
                <div className="cancel" onClick={()=>setShowModel(false)}>
            <X size={40}/>
          </div>
          <div className="confirm ">
            <button>+ Add to do</button>
          </div>
            </div>
          }
        </form>
        
       
      
  )
}

export default TodoForm
