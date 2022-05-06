import "./logIn.css";

// axios 
import axios from "axios";

// hooks 
import { useState } from "react";

import { useNavigate, Link } from "react-router-dom";

// email icon 
import { FaRegEnvelope } from "react-icons/fa";

// password icon
import { MdLockOutline } from "react-icons/md";

// eyes icons 
import { BsEye, BsEyeSlash } from "react-icons/bs"

function Login() {

  const redirect = useNavigate();

  const [email, setEmail] = useState(""); //email useState

  const [password, setPassword] = useState(""); //password useState

  // setting the toggle state 
  const [toggle, setToggle] = useState(false);

// suBmit fxn 
  const suBmit = async (e) => {

    e.preventDefault();

    try {

      const user = {
        email,
        password,
      };

      const response = await axios.post(`/user/login`,user);

      const { data } = response;

    // seeting theid in the local storage 
      window.localStorage.setItem("id", JSON.stringify(data.matches));

      // console.log( window.localStorage.getItem("id", JSON.stringify(data.matches._id)))

      // window.localStorage.setItem("firstName", JSON.stringify(data.matches.firstName));

      // console.log( window.localStorage.getItem("email", JSON.stringify(data.matches.firstName)))
      
      // console.log(window.localStorage.getItem('id'));
      
      // matches is coming from the backend that from the user controller it a variable declared
      // if user exist it should redirect to the todo page
      console.log('match', data.matches)
      if (data.matches) {
        
        // the replace, replaces the browser historys that is the previous datas in the browser
        redirect("/app", { replace: true })

        
      }

     

        // window.localStorage.setItem("name",JSON.stringify())
      // redirection isnt working 
      //  else it should redirect the user to the signup page 
      // else {

      // return redirect("/signup", { replace: true });
      // }
    }
    catch (error) {

      console.log(error.message)

    }

  };

  //show password
  const showPassword = () => {

    if (password === '') {
      return
  }

    setToggle(toggle ? false : true)
    
  };

  return (

    <div id="login_form">

      <form className="loginForm">

        <h1>Login</h1>


        <div className="Row">

          <label htmlFor="email"><FaRegEnvelope className="svg"/> Email <i>*</i></label>

          <input
            type="email"

            id="email"

            autoComplete="off"

            value={email}

            // grabbing values 
            onChange={(e) => setEmail(e.target.value)}

          />

        </div>

        <div className="Row">

          <label htmlFor="password"><MdLockOutline className="svg"/> Password <i>*</i></label>

          <input
            
            type= { toggle ? 'text': 'password'}

            id="password"

            autoComplete="off"

            value={password}

            // grabbing values
            onChange={(e) => setPassword(e.target.value)}

          />

          <div id="toggle" onClick={showPassword}> { toggle ? <BsEye/> : <BsEyeSlash/> }</div>

        </div>

        <div className="noaccount">

          <span>Don't have an account </span> |

          <span>
            <Link to ="/signup"> SignUp </Link>
          </span>

        </div>

        <button type="submit" onClick={suBmit}
          
          disabled={!email || !password }
        >
          login
        </button>

      </form>

    </div>
  );
}

export default Login;  