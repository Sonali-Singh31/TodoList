import React,{useContext, useEffect, useState} from 'react'
import TodoForm from './TodoForm'
import { TodoContext } from '../context';
import moment from 'moment';
import {  doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const EditTodo = () => {
  const [text,setText] = useState();
  const [day,setDay] = useState(new Date());
  const [time,setTime] = useState(new Date());
  const [todoProject,setTodoProject] = useState('')
  const {selectedTodo,projects} = useContext(TodoContext);

  useEffect(() => {
    if (selectedTodo) {
      setText(selectedTodo.text);
      setDay(moment(selectedTodo.date, 'MM/DD/YYYY').toDate());
      setTime(moment(selectedTodo.time, 'hh:mm A').toDate());
      setTodoProject(selectedTodo.projectName);
    }
  }, [selectedTodo]);
  
  // useEffect(()=>{
  //   if(selectedTodo){
  //     const collectionRef = doc(db,'todos',selectedTodo.id);
  //     updateDoc(collectionRef,({
  //       text,
  //       date : moment(day).format('MM/dd/yyyy'),
  //       day : moment(day).format('d'),
  //       time:moment(time).format('hh:mm A'),
  //       projectName:todoProject
  //     })).then(()=>{
  //       console.log("changed");
  //     }).catch((err)=>{
  //       console.log(err.message)
  //     })

  //   }
  // },[selectedTodo,text, day, time, todoProject])

  useEffect(() => {
    const updateTodo = async () => {
      if (selectedTodo) {
        const todoRef = doc(db, 'todos', selectedTodo.id);
        try {
          await updateDoc(todoRef, {
            text: text,
            date: moment(day).format('MM/DD/YYYY'),
            day : moment(day).format('d'),
            time: moment(time).format('hh:mm A'),
            projectName: todoProject
          });
          console.log('Todo updated successfully');
        } catch (error) {
          console.error('Error updating todo:', error.message);
        }
      }
    };

    updateTodo();
  }, [selectedTodo, text, day, time, todoProject]);
  

  const handleSubmit =(e)=>{
    e.preventDefault()
  }
  return (
    <div>
      {
        selectedTodo &&
        <div className='EditTodo'>
      <div className="header">
        Edit Todo
      </div>
      <div className="container">
      <TodoForm
          handlSubmit={handleSubmit}
          text={text}
          setText={setText}
          day={day}
          setDay={setDay}
          time={time}
          setTime={setTime}
          projects={projects}
          todoProject={todoProject}
          
          setTodoProject={setTodoProject}
        />
      </div>
    </div>
      }
    </div>
  )
}

export default EditTodo
