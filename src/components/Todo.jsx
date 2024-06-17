import React, { useContext, useState } from 'react'
import { ArrowClockwise, CheckCircleFill, Circle, Trash } from 'react-bootstrap-icons';
import { db } from '../firebaseConfig';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import moment from 'moment';
import { TodoContext } from '../context';
import { useSpring, animated, useTransition } from 'react-spring';


const Todo = ({todo}) => {
  // STATE
  const [hover,setHover] = useState(false);

  // CONTEXT
  const {selectedTodo,setSelectedTodo} = useContext(TodoContext);


  

  // method 1
  const deleteTodo =(todo)=>{
    const docToDelete = doc(db,'todos',todo.id);
    deleteDoc(docToDelete)
  }

  const handleDelete = () =>{
    deleteTodo(todo);

    if(selectedTodo === todo){
      setSelectedTodo(undefined);
    }
  }

  // method 2
  // const deleteTodo = async (todo) => {
  //   try {
  //     if (!todo || !todo.id) {
  //       throw new Error('Invalid todo item');
  //     }
  //     const docRef = doc(db, 'todos', todo.id);  // Create a reference to the document
  //     await deleteDoc(docRef);  // Delete the document
  //     console.log('Todo deleted successfully');
  //   } catch (error) {
  //     console.error('Error deleting todo: ', error);
  //   }
  // }
  
  const todoCheck = (todo)=>{
    const updateTodo = doc(db,"todos",todo.id);
    updateDoc(updateTodo,({
      checked : !todo.checked
    })).then(()=>{
      console.log("checked is updated");
    }).catch((err)=>{
      console.log(err.message);
    })
  }

  
  const repeatNextDay = async (todo) => {
    const date = moment(todo.date, 'MM/DD/YYYY');
    const nextDayDate = date.add(1, 'days');

    const repeatedTodo = {
      ...todo,
      checked: false,
      date: nextDayDate.format('MM/DD/YYYY'),
      day: nextDayDate.format('d'),
    };

    delete repeatedTodo.id;

    const collectionRef = collection(db, 'todos');

    try {
      await addDoc(collectionRef, repeatedTodo);
      console.log('Todo repeated for next day');
    } catch (error) {
      console.error('Error adding repeated todo:', error.message);
    }
  };

  // ANIMATION
  const fadeIn = useSpring({
    from: { marginTop: '-12px', opacity: 0 },
    to: { marginTop: '0px', opacity: 1 }
  });

  const checkTransition = useTransition(todo.checked, {
    from: { position: 'absolute', transform: 'scale(0)' },
    enter: {  transform: 'scale(1)' },
    leave: {  transform: 'scale(0)' },
    
  });

  return (
    <animated.div style={fadeIn} className='Todo'>
      <div 
        className="todo-container"
        onMouseEnter={()=>setHover(true)}
        onMouseLeave={()=>setHover(false)}
      >
        <div 
          className="check-todo"
          onClick={()=>todoCheck(todo)}
        >
          {
            checkTransition((props,checked)=>
              checked?
            <animated.span style={props} className="checked">
              <CheckCircleFill color='#bebebe'/>
            </animated.span>
            :
            <animated.span style={props} className="unchecked">
              <Circle color='todo.color'/>
            </animated.span>
            )
          }
        </div>
        <div 
          className="text"
          onClick={()=>setSelectedTodo(todo)}
        >
          <p style={{color : todo.checked ? '#bebebe':'#000000'}}>{todo.text}</p>
          
          <span>{todo.time}-{todo.projectName}</span>
          <div className={`line ${todo.checked ? 'line-through' : ''}`}>
          </div>
        </div>
        <div 
          className="add-to-next-day"
          onClick={()=>repeatNextDay(todo)}
        >
          {
            todo.checked && 
            <span>
              <ArrowClockwise/>
            </span>
          }
        </div>
        <div 
          className="delete-todo"
          onClick={()=>handleDelete(todo)}
        >
          {
            (hover || todo.checked )&&
            <span>
              <Trash/>
            </span>
          }
        </div>
      </div>
    </animated.div>
  )
}

export default Todo
