import React, { useContext, useState } from 'react'
import ProjectForm from './ProjectForm'
import { collection, where,getDocs,doc,updateDoc, query } from 'firebase/firestore'
import { db } from '../firebaseConfig'
import { TodoContext } from '../context'

const RenameProject = ({project,setShowModal}) => {
  // STATE
  const [newProjectName,setNewProjectName] = useState(project.name)

  // CONTEXT
  const {selectedProject,setSelectedProject} = useContext(TodoContext)

  
  const handleRenameProject = async (project, newProjectName) => {
    const projectRef = collection(db, "projects");
    const todosRef = collection(db, "todos");

    const { name: oldProjectName } = project;

    try {
      const projectQuery = query(projectRef, where('name', '==', newProjectName));
      const querySnapshot = await getDocs(projectQuery);

      if (!querySnapshot.empty) {
        alert('Project with the same name already exists!');
        return;
      } else {
        await updateDoc(doc(projectRef, project.id), {
          name: newProjectName
        });
      }

      const todosQuery = query(todosRef, where('projectName', '==', oldProjectName));
      const todosSnapshot = await getDocs(todosQuery);

      const updateTodosPromises = todosSnapshot.docs.map(async (todoDoc) => {
        await updateDoc(todoDoc.ref, {
          projectName: newProjectName
        });
      });

      await Promise.all(updateTodosPromises);

      if (selectedProject === oldProjectName) {
        setSelectedProject(newProjectName);
      }

      setShowModal(false); // Close modal after successful rename
    } catch (error) {
      console.error('Error renaming project:', error);
      // Handle errors as needed
    }
  };

  
  
  const handleSubmit = (e) =>{
    e.preventDefault()

    handleRenameProject(project,newProjectName);
    setShowModal(false);
  }
  return (
    <div className='RenameProject'>
      <ProjectForm
        handleSubmit={handleSubmit}
        heading="Edit project name!"
        value={newProjectName}
        setValue={setNewProjectName}
        setShowModal={setShowModal}
        confirmButtonText='Confirm'
        />
    </div>
  )
}

export default RenameProject
