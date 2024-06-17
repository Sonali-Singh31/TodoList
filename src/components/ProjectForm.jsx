import React from 'react'

const ProjectForm = ({handleSubmit, heading, value, setValue,setShowModal,confirmButtonText}) => {
  return (
    <form onSubmit={handleSubmit} className='ProjectForm'>
        <h3>{heading}</h3>
        <input 
            type="text"
            value={value}
            onChange={(e)=>setValue(e.target.value)}
            placeholder='project name...'
            autoFocus
        />
        <button className='cancel' role='button' onClick={()=>setShowModal(false)}>
            cancel

        </button>
        <button className="confirm">
            {confirmButtonText}
        </button>
      
    </form>
  )
}

export default ProjectForm
