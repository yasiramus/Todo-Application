// importing of react, the useState and the createRef
import React, { createRef, useState, useEffect } from "react";
// importation of fontawesome icons from react icon
import { FaTrashAlt } from "react-icons/fa";

// importing of  the todo css
import "./todoCss.css";

// fuctional component
function Todo({ task, Del, update, getcolor }) {
  // setting the useState using array destructing
  const [check, setCheckbox] = useState(false);

  // setting newcolor state
  const [newColor, setColors] = useState("");

  //calling the newcolor whenever a component mount
  useEffect(() => {

    setColors(getcolor())
    
  },[getcolor]);
  // changed from the newcolr to getcolor 

  // setting the createRef method
  const boxRef = createRef();
  // console.log(boxRef);

  // click checkbox to strike through Text
  const strikeText = () => {
    if (check === false) {
      boxRef.current.style.textDecoration = "line-through";
    } else {
      boxRef.current.style.textDecoration = "none";
    }
    setCheckbox(!check);
  };

  return (
    <>
      <div className="mainTodo" style={{ backgroundColor: newColor }}>
        <div className="mainp">
          <input type="checkbox" onClick={strikeText} className="checkbox" />
          <p className="todop" ref={boxRef}>
            
            {task.todo}
          </p>
          {/* <p>{task.content}</p> */}
        </div>

        <div className="btns">
          <button className="todobutton" onClick={() => update(task._id)}>
            {task.status}
          </button>
          {/* <button className='todobtn ' onClick={() => Del(task.id)}> Delete</button> */}
          <span onClick={() => Del( task._id )}>
            <FaTrashAlt
              style={{ color: "red", width: "2rem", height: "2rem"}}
            />
          </span>
        </div>
      </div>
    </>
  );
}

export default Todo;
