// import React, { useEffect, useState } from 'react'
// import firebase from '../firebaseConfig';
// export const useTodos = () => {
//     const [todos,setTodos] = useState([])

//     useEffect(()=>{
//         let unsubscribe = firebase
//         .firestore()
//         .collection('todos')
//         .onSnapshot( snapshot=>{
//             const data = snapshot.docs.map( doc =>{
//                 return {
//                     id : doc.id,
//                     ...doc.data()
//                 }
//             })
//             setTodos(data)
//         })
//         return ()=>unsubscribe()
//     })
//   return todos;
// }

// export const useProjects = ({todos}) => {
//     const [projects,setProjects] = useState([])

//     function calculateNumOfTodos(projectName,todos){
//         return todos.filter(todo => todo.projectName === projectName).length
//     }
//     useEffect(()=>{
//         let unsubscribe = app
//         .firestore()
//         .collection('projects')
//         .onSnapshot( snapshot=>{
//             const data = snapshot.docs.map( doc =>{

//                 const projectName = doc.data().name
//                 return {
//                     id : doc.id,
//                     name:projectName,
//                     numOfTodos : calculateNumOfTodos(projectName,todos)
//                 }
//                 setTodos(data)
//             })
//         })
//         return ()=>unsubscribe()
//     })
//   return projects;
// }

import { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, onSnapshot } from 'firebase/firestore';
import moment from 'moment';

export const useTodos = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    console.log("Effect call");
    const unsubscribe = onSnapshot(collection(db, 'todos'), snapshot => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTodos(data);
      console.log("unsubscribe");
    });

    return () => unsubscribe();
  }, []);

  return todos;
};

export const useFilterTodos =(todos,selectedProject)=>{
  const [filteredTodos,setFilteredTodos] = useState([])
  useEffect( ()=>{
    let data;
    const todayDateFormated = moment().format(
      'MM/dd/yyyy'
    )
    if(selectedProject === 'today'){
      data = todos.filter(todo => todo.date === todayDateFormated)
    }
    else if(selectedProject === 'next 7 days'){
      data = todos.filter(todo=>{
        const todoDate = moment(todo.date,'MM/DD/YYYY')
        const todayDate = moment(todayDateFormated,'MM/DD/YYYY')
        const diffDays = todoDate.diff(todayDate,'days')
        return diffDays>=0 && diffDays<7
      })
    }else if(selectedProject === 'all days'){
      data = todos
    }else{
      data = todos.filter(todo => todo.projectName === selectedProject)
    }
    setFilteredTodos(data);
  },[todos,selectedProject]);
  return filteredTodos
}

export const useProjects = () => {
    const [projects, setProjects] = useState([]);
  
    // const calculateNumOfTodos = (projectName, todos) => {
    //   return todos.filter(todo => todo.projectName === projectName).length;
    // };
  
    useEffect(() => {
      const unsubscribe = onSnapshot(collection(db, 'projects'), snapshot => {
        const data = snapshot.docs.map(doc => {
          
          return {
            id: doc.id,
            name: doc.data().name,
            
          };
        });
        setProjects(data);
      });
  
      return () => unsubscribe();
    }, []);
  
    return projects;
  };

  export function useProjectsWithStats(projects,todos) {
    const [projectsWithStats,setProjectWithStats] = useState([])

    useEffect(()=>{
      const data = projects.map((project)=>{
        return {
          numOfTodos : todos.filter(todo => todo.projectName === project.name && !todo.checked).length,
          ...project
        }
      })
      setProjectWithStats(data);
    },[projects,todos])
    return projectsWithStats;
  }