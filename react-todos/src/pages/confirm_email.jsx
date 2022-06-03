import "./verify.css"

// axios importation
import axios from "axios";

// usenavigate 
import { useNavigate } from "react-router-dom";

// useState importation
import { useState } from "react";

function Verify_Email() {
    const redirect = useNavigate();

  const [number, setNumber] = useState(''); //code state

  const [error, setError] = useState(); //error state

  const continueBTN = async (e) => {
    e.preventDefault();

    try {
      const confirm_email = await axios.post(`/user/verifyEmail/${JSON.parse(localStorage.getItem("id"))}`,{OTP:number});
        const { data } = confirm_email;

        console.log("confirm_email", data);
        
        if (data) {

            redirect("/", { replace: true });
  
        }
        
    } catch (error) {
        console.log(error.response.data);
        
        if (error.response.data === "Invalid request") {
            return setError(error.response.data)
        } else if(error.response.data === "Please provide a valid token") {
            
            return setError(error.response.data);
            
        } else if (error.response.data === "This account has been varified already!") {
            return setError(error.response.data);
            
        } else if (error.response.data === "Sorry no user with this token") {

            return setError(error.response.data);
            
        }
    }
  };

  return(

      <div className="changePassword">
          
          <h2 className="reseth2">Confirm your account </h2>
          
    <form>
              <div className="change_password_row">
                  
                  <div className="verifyEmail">
                      
                      <p>We sent you a 4-digit code to you email address </p>
                      
                      <p>Enter that code to confirm account</p>
                      
                  </div>                 

        <input
          type="text"
          id="code"
          placeholder="Enter Code"
          autoComplete="off"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />

    {error && <div className="mainerror"> {error} </div>}
                  
      </div>

      <div className="btn">
        <button type="submit" onClick={continueBTN}>Continue</button>
      </div>
    </form>
        </div>
  )
}

export default Verify_Email;
