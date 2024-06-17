import React, { useContext, useEffect, useState } from 'react'
import Modal from './Modal'
import {Bell, CalendarDay, Clock, Palette, X} from 'react-bootstrap-icons';
import DatePicker from 'react-datepicker';
import Datepicker from 'react-multi-date-picker';
import 'react-datepicker/dist/react-datepicker.css'
import  TimePicker  from 'react-multi-date-picker/plugins/time_picker';
import 'react-time-picker/dist/TimePicker.css'
import TodoForm from './TodoForm';
import { TodoContext } from '../context';
import { db } from '../firebaseConfig';
import { collection,addDoc,doc } from 'firebase/firestore';
import {calendarItems} from '../constants'
import moment from 'moment';
import randomColor from 'randomcolor';
// import 'react-time-picker/dist/react-timePicker.css'

const AddNewTodo = () => {
  // CONTEXT
  const {projects,selectedProject} = useContext(TodoContext);
  // STATE

  const [showModel,setShowModel] = useState(false);
  const [text,setText] = useState('');
  const [day,setDay] = useState(new Date());
  const [time,setTime] = useState(new Date());
  const [todoProject,setTodoProject] = useState(selectedProject);
  useEffect(()=>{

    setTodoProject(selectedProject);
  },[selectedProject])
  
  const collectionRef = collection(db,"todos")

  const handleSubmit =(e)=>{
    e.preventDefault();
    if(text && !calendarItems.includes(todoProject)){
      addDoc(collectionRef,{
        text : text,
        date : moment(day).format('MM/dd/yyyy'),
        day:moment(day).format('d'),
        time:moment(time).format('hh:mm A'),
        color:randomColor({luminosity:'dark'}),
        checked:false,
        projectName:todoProject
      }).then(()=>{
        console.log("data added");
      }).catch((err)=>{
        console.log(err.message);
      })
    }
    setText('');
  }

  return (
    <div className='AddNewTodo'>
      <div className="btn">
        <button onClick={()=>setShowModel(true)}>
          + New Todo
        </button>
      </div>
      <Modal showModel={showModel} setShowModel={setShowModel}>
        
        <TodoForm
          handlSubmit={handleSubmit}
          heading = 'Add new to do!'
          text={text}
          setText={setText}
          day={day}
          setDay={setDay}
          time={time}
          setTime={setTime}
          projects={projects}
          todoProject={todoProject}
          setTodoProject={setTodoProject}
          showButtons = {true}
          setShowModel={setShowModel}
        />

       
      </Modal>
    </div>
  )
}

export default AddNewTodo
