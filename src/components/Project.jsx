// import React, { useContext, useState } from 'react'
// import RenameProject from './RenameProject'
// import { PencilFill, XCircle } from 'react-bootstrap-icons'
// import Modal from './Modal'
// import { TodoContext } from '../context';
// import { deleteDoc, collection, query, where,getDocs,doc, QuerySnapshot } from 'firebase/firestore'
// import { db } from '../firebaseConfig'
// import firebase from 'firebase/compat/app';
// import { useSpring,animated,useTransition } from 'react-spring';




// const Project = ({project,edit}) => {
//   // CONTEXT
//   const {setSelectedProject,defaultProject,selectedProject} = useContext(TodoContext)

//   // STATE
//   const [showModal,setShowModal] = useState(false);

  

//   const deleteProject = async (project) => {
//     try {
//       // Step 1: Delete the project document
//       const projectToDelete = doc(db, 'projects', project.id);
//       await deleteDoc(projectToDelete);
  
//       // Step 2: Query and delete all todos associated with the project
//       const todosQuery = query(collection(db, 'todos'), where("projectName", "==", project.name));
//       const querySnapshot = await getDocs(todosQuery);
  
//       // Delete each todo document found
//       querySnapshot.forEach(async (doc) => {
//         await deleteDoc(doc.ref);
//       })
  
//       console.log("Project and associated todos deleted successfully");
//     } catch (error) {
//       console.error("Error deleting project: ", error.message);
      
//     }
    
//       if(selectedProject ===project.name){
//         setSelectedProject(defaultProject);
//       }
    
//   };

//   // ANIMATION
//   const fadeIn = useSpring({
//     from : {marginTop : '-12px',opacity:0},
//     to:{marginTop : '0px',opacity:1}
//   })

  
//   const btnTransition = useTransition(edit, {
//     from: { opacity: 0, right: '-20px' },
//     enter: { opacity: 1, right: '0px' },
//     leave: { opacity: 0, right: '-20px' }
//   });

//   return (
    
//       <animated.div style={fadeIn} className='Project'>
//       <div 
//         className='name'
//         onClick={()=>setSelectedProject(project.name)}
//       >
//         {project.name}
//       </div>
//       <div className="btns">
//         {
//          btnTransition((props,editProject)=>
//           editProject?
          
//           <animated.div style={props} className="edit-delete ">
//           <span 
//           className='edit' 
//           onClick={()=>setShowModal(true)}
//           >
//             <PencilFill size="13"/>
//           </span>
//           <span 
//             className='delete'
//             onClick={()=>deleteProject(project)}
//           >
//             <XCircle size="13"/>
//           </span>
//         </animated.div>
       
//         :
//         project.numOfTodos ===0 ?
//         ""
//         :
//         <animated.div style={props} className="total-todos">
//           {project.numOfTodos}
//         </animated.div>
//          )
//         }
//       </div>
//       <Modal showModel={showModal} setShowModel={setShowModal}>
//         <RenameProject project={project} setShowModal={setShowModal}/>
//       </Modal>
//     </animated.div>
    
//   )
// }

// export default Project


import React, { useContext, useState } from 'react';
import RenameProject from './RenameProject';
import { PencilFill, XCircle } from 'react-bootstrap-icons';
import Modal from './Modal';
import { TodoContext } from '../context';
import { deleteDoc, collection, query, where, getDocs, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useSpring, animated, useTransition } from 'react-spring';

const Project = ({ project, edit }) => {
  // CONTEXT
  const { setSelectedProject, defaultProject, selectedProject } = useContext(TodoContext);

  // STATE
  const [showModal, setShowModal] = useState(false);

  const deleteProject = async (project) => {
    try {
      // Step 1: Delete the project document
      const projectToDelete = doc(db, 'projects', project.id);
      await deleteDoc(projectToDelete);

      // Step 2: Query and delete all todos associated with the project
      const todosQuery = query(collection(db, 'todos'), where("projectName", "==", project.name));
      const querySnapshot = await getDocs(todosQuery);

      // Delete each todo document found
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      })

      console.log("Project and associated todos deleted successfully");
    } catch (error) {
      console.error("Error deleting project: ", error.message);
    }

    if (selectedProject === project.name) {
      setSelectedProject(defaultProject);
    }
  };

  // ANIMATION
  const fadeIn = useSpring({
    from: { marginTop: '-12px', opacity: 0 },
    to: { marginTop: '0px', opacity: 1 }
  });

  const btnTransition = useTransition(edit, {
    from: { opacity: 0, right: '-20px' },
    enter: { opacity: 1, right: '0px' },
    leave: { opacity: 0, right: '-20px' },
    config: { tension: 220, friction: 20 } // Adjust animation config as needed
  });

  return (
    <animated.div style={fadeIn} className='Project'>
      <div
        className='name'
        onClick={() => setSelectedProject(project.name)}
      >
        {project.name}
      </div>
      <div className="btns">
        {
          btnTransition((style, item) =>
            item ? (
              <animated.div style={style} className="edit-delete">
                <span
                  className='edit'
                  onClick={() => setShowModal(true)}
                >
                  <PencilFill size="13" />
                </span>
                <span
                  className='delete'
                  onClick={() => deleteProject(project)}
                >
                  <XCircle size="13" />
                </span>
              </animated.div>
            ) : (
              project.numOfTodos > 0 && (
                <animated.div style={style} className="total-todos">
                  {project.numOfTodos}
                </animated.div>
              )
            )
          )
        }
      </div>
      <Modal showModel={showModal} setShowModel={setShowModal}>
        <RenameProject project={project} setShowModal={setShowModal} />
      </Modal>
    </animated.div>
  );
}

export default Project;

