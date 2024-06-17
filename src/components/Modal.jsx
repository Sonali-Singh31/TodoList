import React, { useRef } from 'react'
import { useSpring,animated } from 'react-spring';


const Modal = ({children,showModel,setShowModel}) => {
    const modelRef = useRef();
    const closeModel = (e) => {
        if(e.target=== modelRef.current){
            setShowModel(false);
        }
    };
    const modalAnimation = useSpring({
      opacity:showModel ? 1:0,
      top :showModel?'25%':'0%',
      config:{friction:15}
    })
  return (
    showModel &&
    <div className='Model' ref={modelRef} onClick={closeModel}>
      <animated.div  style={modalAnimation}className="container">
        {children}
      </animated.div>
    </div>
  );
}

export default Modal
