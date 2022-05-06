import React, { useEffect, useState, useCallback } from "react";

import Todos from "./components/todos";

import { useNavigate } from "react-router-dom";
 
import { BsClipboardCheck, BsJournalCheck } from "react-icons/bs"; //icons

// importation axios
import axios from "axios";

import "./App.css"; //app.css

function App() {

  const Redirect = useNavigate();
  
  // the input and setInput state
  const [input, setInput] = useState("");

  // textarea  state
  const [textarea, setTextarea] = useState("");

  // todos state
  const [todos, setTodos] = useState([]);

  // complete state
  const [complete, setComplete] = useState(0);

  // the loading state
  const [loading, setLoading] = useState(false);

  // setting variaties of colors to main card  in for todo.jsx
  const [color] = useState([
    "blue",
    "orange",
    "pink",
    "brown",
    "violet",
    "chocolate",
    "black",
    "green",
    "seagreen",
    "olive",
    'gold'
  ]);

  //getting colors function
  const getcolor = useCallback( () => {

    const randomNumber = color[ Math.floor(Math.random() * color.length) ];

    return randomNumber;
  },[ color ]);

  // a fxn to make a request to backend and save data
  const AddItems = async (event) => {
    event.preventDefault();

    try {
      setLoading(true); //setLoading state

      const newTodos = {
        todo: input,
        content: textarea,
        user:JSON.parse(localStorage.getItem('id'))
      };

      // req to the database
      const add = await axios.post(`/api/todo/${JSON.parse(localStorage.getItem('id'))}`, newTodos);

      console.log(add.data,'datas');
      
      if (add.data === "token not found") {

        Redirect('/', { replace: true })
      
      }


      // clearing the input field after the user submit data
      setInput("");
      setTextarea("");
        
        setLoading(false)
        
    } catch (error) {
      console.log(error.message);
    }
  };

  //using the useeffect to fetch info
  useEffect(() => {

    const fetchTodos = async () => {

      try {

        // fetch info from the database
        // const todos = await axios.get(`http://localhost:5000/api/todo/`);

        const todo = await axios.get(`/user/populateUser/${JSON.parse(localStorage.getItem("id"))}`);
        
        const { data } = todo; //accessing the data object
          
          
          console.log(data, 'hk');
    
        setTodos(data.todos); //displaying of todos info to the user

      } catch (error) {
        console.log(error.message);
      }
    }

    fetchTodos(); //revoke the fetchTodos fxn

    // set the loading state to
  }, [loading] );



  // cancel button to clear the input field
  const Cancel = (e) => {
    e.preventDefault();

    setInput("");
    setTextarea("")

  };

  // deletion of the todo 
  const DeleteTodo = async (id) => {

    try {
     
    setLoading(true)

      // const todo =
     const del = await axios.delete(`/api/todo/${id}/${JSON.parse(localStorage.getItem('id'))} `);
      
      if (del.data === "token not found") {

        Redirect('/', { replace: true })
      
      }

      setLoading(false)
      
   } catch (error) {
     console.log(error.message)
   }
    
  };

  //updating a todo list
  const update = async (Id) => {

    try {
      setLoading(true) //refresh the browser

      // this for fectching a single todo 
      const todo = await axios.get(`/api/todo/${Id}`)

      if (todo.data === "token not found") {

        Redirect('/', { replace: true })
      
      }

      const { data } = todo; //destruing data

      const endpoint = `/api/todo/${Id}`; //update endpoint

      // updating based on status 
      data.status === 'pending' ? await axios.put(endpoint, { status: 'done' }) : await axios.put(endpoint, { status: 'pending' })
      
      setLoading(false)
      
    } catch (error) {
      console.log(error.message);

    }
   
  };
  

  //completion of task
  // fxn to filter through the status 
  const getCompleteTask = useCallback (newStatus => {

    const done = todos.filter(todo => {
      return todo.status === newStatus;

    });
    
    setComplete(done.length);

  },[todos]);

  //using useEffect to re render the function anytime a task is added
  useEffect(
    
    () => {

      getCompleteTask("done");
    },

    // dependancy array is use to prevent reoccuring of event
    // when the pending buttion is clicked
    [getCompleteTask, complete]

  );

  return (
    <>
      <div id="main">
        <div>
          <div className="mainh2">
            <BsJournalCheck
              style={{ color: "#77b559", width: "2rem", height: "2rem" }}
            />
            <h2 className="h2"> A Todo App</h2>
          </div>
          {/* <p>Welcome <strong>{JSON.parse(localStorage.getItem("name"))}</strong></p> */}
          <form onSubmit={AddItems} className='form'>
            <div>
              <div className="main-form">
                <div id="makeatask">
                  <BsClipboardCheck
                    style={{
                      width: "2rem",
                      height: "2rem",
                      marginRight: 10,
                      color: "greenyellow",
                    }}
                  />
                  <h3 className="makeatask">What the task for today ?</h3>
                </div>
                <div className="form-row">
                  <label>New Task</label>
                  <input
                    type="text"
                    placeholder="Type todos here... "
                    value={input}
                    className="appInput"
                    maxLength={30}
                    onChange={(event) => setInput(event.target.value)}
                    required
                  />
                </div>
                <div className="form-row">
                  <label className="label">Content</label>
                  <textarea
                    required="required"
                    placeholder="Describe task..."
                    className="appInput"
                    maxLength={50}
                    value={textarea}
                    onChange={(event) => setTextarea(event.target.value)}
                  ></textarea>
                </div>
              </div>

              <div id="btn">
                <button
                  // onClick={AddItems}

                  disabled={!input
                    && !textarea
                  }
                  className="appButton"
                >
                  Create A Task
                </button>
                <button
                  className="cancel"
                  disabled={!input
                    && !textarea
                  }
                  onClick={Cancel}
                >
                  Cancel Task
                </button>
              </div>
            </div>
          </form>
        </div>

        { loading && (
          <div style={{ color: 'red', textAlign: 'center' }}>data loading... </div>
        )}


        <div>
          {todos.length > 0 && (
            <>
              <p className="taskComplete">
                {complete} {complete > 1 ? "tasks" : "task"} completed out of {" "}
                {todos.length}
              </p>

              <div style={{ display: "flex", gap: "36rem" }}>

                <h4 className="taskcreated">Task Created</h4>
                <span className="taskcreated">
                  View All Task Created
                </span>

              </div>

            </>
          )}

          {/* calling the todos component here  */}
          <Todos
            tasks={todos}

            DeleteTodo={DeleteTodo}

            update={update}

            getcolor={getcolor}

          />
        </div>
      </div>
    </>
  );
}

export default App;
