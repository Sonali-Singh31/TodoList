import React, { useState } from 'react'
import { Plus } from 'react-bootstrap-icons'
import Modal from './Modal'
import ProjectForm from './ProjectForm'
import { addDoc, collection, query, where,getDocs } from 'firebase/firestore'
import { db } from '../firebaseConfig'

const AddNewProject = () => {
  const [showModal,setShowModal] = useState(false);
  const [projectName,setProjectName] = useState('');
  const projectRef = collection(db,"projects");
  const handleSubmit = async(e)=>{
    e.preventDefault();
    if(projectName){
      // projectRef
      // .where('name','==','projectName')
      // .get()
      // .then(querySnapshot=>{
      //   if(querySnapshot.empty){
      //     addDoc(projectRef,{
      //       name : projectName
      //     }).then(()=>{
      //         console.log("project added")
      //     }).catch((err)=>{
      //         console.log(err.message);
      //     })
      //   }
      //   else{
      //     alert('Project already existed!')
      //   }
      // })
      const q = query(projectRef, where("name", "==", projectName));

      try {
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          await addDoc(projectRef, {
            name: projectName,
          });
          console.log("Project added");
        } else {
          alert("Project already exists!");
        }
      } catch (err) {
        console.error("Error adding project: ", err.message);
      }

      setShowModal(false)
      setProjectName('')
    }
  }
  return (
    <div className='AddNewProject'>
      <div className="add-button">
        <span onClick={()=>setShowModal(true)}>
          <Plus size="20"/>
        </span>
      </div>
      <Modal showModel={showModal} setShowModel={setShowModal} >
        <ProjectForm
        handleSubmit={handleSubmit}
        heading="New project!"
        value={projectName}
        setValue={setProjectName}
        setShowModal={setShowModal}
        confirmButtonText='+ Add Project'
        />
      </Modal>
    </div>
  )
}

export default AddNewProject
