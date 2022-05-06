import Todo from "./todo";

import './todosCss.css';

function Todos({ tasks, DeleteTodo, update, getcolor }) {
  
    return ( 
      <>
      {
        tasks.length ? (
          
            tasks.map((todo, id) => (
            
            <Todo task={todo} key={id} Del={DeleteTodo} update={update} getcolor= { getcolor}/>
            ))
            
          ):
              <div className = "noContent">Nothing to display</div>
          
      }
      </>
     );
}

export default Todos;