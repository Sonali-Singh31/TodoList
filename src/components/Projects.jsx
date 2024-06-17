import React, { useContext, useState } from 'react'
import AddNewProject from './AddNewProject'
import Project from './Project'
import { CaretUp, Palette, PencilFill } from 'react-bootstrap-icons'
import { useSpring,animated } from 'react-spring';
import { TodoContext } from '../context'

const Projects = () => {
  const [showMenu,setShowMenu] = useState(true);
  const [edit,setEdit] = useState(false);
  const pencilColor = edit?"#1EC94C" : "#000000";

  // const projects =[
  //   { id : 1, name : "personal", numOfTodos : 0},
  //   { id : 2, name : "work", numOfTodos : 1},
  //   { id : 3, name : "other", numOfTodos : 2},
  // ]

  // CONTEXT
  const {projects} = useContext(TodoContext);

    // STATE
    // const [showMenu,setShowMenu] = useState(true);

    // ANIMATED
    const spin = useSpring({
      transform:showMenu?'rotate(0deg)':'rotate(180deg)',
      config:{friction:15}
    })
  
    const menuAnimation = useSpring({
      display : showMenu ? 'block':'none',
      lineHeight: showMenu?'1.2':'0'
    })

  return (
    <div className='Projects'>
      <div className="header">
        <div className="title">
          <div className="flex align-middle justify-around">
          <Palette size="18"/>
          <p>Projects</p>
          </div>
        </div>
        <div className="btns">
          {
            showMenu && projects.length>0 &&
            <span className='edit' onClick={()=>setEdit(edit=>!edit)}>
            <PencilFill size="15" color={pencilColor}/>
          </span>
          }
          <AddNewProject/>
          <animated.span  
            onClick={()=>setShowMenu(!showMenu)} 
            style={spin} 
            className='arrow'
          >
            <CaretUp size="20"/>
          </animated.span>
        </div>
      </div>
      <animated.div style={menuAnimation} className="items">
        {
          projects.map( project =>
            <Project
            project={project}
            key={project.id}
            edit={edit}
            />
          )
        }
      </animated.div>
    </div>
  )
}

export default Projects
