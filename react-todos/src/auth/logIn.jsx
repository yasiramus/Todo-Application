import "./logIn.css";

// import { ShowModal } from "../modal/modal";

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

import ShowModal from "./../modal/modal";

function Login() {

  const redirect = useNavigate();

  const [email, setEmail] = useState(""); //email useState

  const [unRegisteredemail, setUnRegisteredEmail] = useState(''); //unregistered email

  const [password, setPassword] = useState(""); //password useState

  const [incorrectPassword, setIncorrectPassword] = useState(""); //incorrect password

  // setting the toggle state 
  const [toggle, setToggle] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const [, setVerify] = useState("");

// suBmit fxn 
  const suBmit = async (e) => {

    e.preventDefault();

    try {

      const user = {
        email,
        password,
      };

      const response = await axios.post(`/user/login`, user);

      const { data } = response;

      // // setting of id in the local storage 
      //   window.localStorage.setItem("id", JSON.stringify(data.matches));
      
      // matches is coming from the backend that from the user controller it a variable declared
      // if user exist it should redirect to the todo page
      // console.log('match', data.matches)

      if (data.matches) {
        
        // the replace, replaces the browser historys that is the previous datas in the browser
        redirect("/app", { replace: true })

      }

    }
    catch (error) {

      console.log(error.response.data);

      //incorrect password
      if (error.response.data === "incorrect password") {
        return setIncorrectPassword(error.response.data)
      }

      // unregistered email
      if (error.response.data.errors === "Authentication failed") {
        
        return setUnRegisteredEmail(error.response.data.errors)
      };

      if(error.response.data === "sorry your email hasn't been verified, click on the resend button"){
        return setVerify(setIsOpen(true))
      }
  }    

  };

  //show password
  const showPassword = () => {

    // if the password input field is empty the toggling warningOnce;t work 
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

          {email && <div className="duplicateEmailError">{unRegisteredemail}</div>}

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

            {/* error message for incorrect password */}
          {password && <div className="duplicateEmailError">{incorrectPassword}</div>}
          
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

        <div type="submit" id="btnLink">
          
          <Link to="/forgotpassword">Forgot Password ?</Link>
          
        </div>          
        
        <ShowModal open={isOpen} onClose={() => { setIsOpen(false) }} />
        
      </form>
      

    </div>
  );
}

export default Login;  