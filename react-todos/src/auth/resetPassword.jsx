import "./resetpassword.css"; //css

import axios from "axios"; //axios

import { useState } from "react"; //useState for setting state

import { useNavigate } from "react-router-dom"; //useNavigate for redirection

function ResetPassword() {

  //usenavigate
  const redirect = useNavigate();

  const [password, setPassword] = useState(""); //password state

  const [passwordError, setPasswordError] = useState(""); //password error state

  const [newPassword, setNewPassword] = useState(""); //new password state

  const [newPasswordError, setNewPasswordError] = useState(""); //new password error state

  const [confirmPassword, setConfirmPassword] = useState(""); //confirm psaaword state

  const [confirmPasswordError, setConfirmPasswordError] = useState(""); //confirm psaaword error state

  const [emptyPasswordField, setEmptyPasswordField] = useState(""); //emptyPasswordField state

  const [emptyNewPasswordField, setEmptyNewPasswordField] = useState("");

  const [emptyConfirmNewPasswordField, setEmptyConfirmNewPasswordField] = useState("");

    const [success, setSuccess] = useState(false); //success state 
    
    const [mainError, setMainError] = useState(false); //main error

  // password reset
    const resetPassword = async (e) => {
      
    e.preventDefault();

    // input field empty error handling
      if (!password) {
        
          return setEmptyPasswordField("Please enter current password");
          
      } else if (!newPassword) {
          
          setEmptyNewPasswordField("Please enter new password");
          
      } else if (!confirmPassword) {
          
          setEmptyConfirmNewPasswordField("Please confirm new password");
          
      } else if (newPassword !== confirmPassword) {
          
          setConfirmPasswordError("Passwords don't match");
          
    } else {
          try {
          
        const Data = {
          password,
          newPassword,
        };

        const passwordReset = await axios.put("/user/resetPassword", Data); //axios endpoint

        // console.log(passwordReset.data, "res");

        setSuccess(true);//setting success msg to true that is if user has change password

        //   settime out for navigating to the login page after the successmsg is show to the user 
        setTimeout(() => {
          if (passwordReset) {
            window.localStorage.removeItem("id"); //remove id

            redirect("/", { replace: true }); //redirect to the home page
          }
        }, 4000); //setting it to 5 sec

        
          } catch (error) {
              
        console.log(error.response.data, "reset error");

        //   error hangling for incorrect old password 
        if (error.response.data === "incorrect old password") {
           setPasswordError(error.response.data);
        }

          //not allowing usage of old password for the new password field
         else if (error.response.data === "usage of previous password not allowed") {
                 setNewPasswordError(error.response.data);
        } else {
            //general error
            setMainError("Something went wrong")
        }
      }
    }
  };

    // conditional rendering 
    return success ? (
      
        <div className=" successmsg">
            
            <h1>Password has been changed successfully</h1>
            
            <p>Please logIn with your new password</p>
            
        </div>
        
        ) : (
            
            <div className="changePassword">
                
              <h2 className="reseth2">Change Password</h2>

              {/* //mainerror */}
                {setMainError && <div className="mainerror"> {mainError} </div>}  
                
                <form>
                    
                    <div className="change_password_row">
                        
                        <label htmlFor="currentPassword">Current Password</label>
                        
                        <input
                            
                            type="password"
                            
                            id="currentPassword"
                            
                            autoComplete="off"
                            
                            value={password}
                            
                            onChange={(e) => setPassword(e.target.value)}
                            
                        />

                        {!password && <div className="reseterror">{emptyPasswordField}</div>}   
                        
                        <div className="reseterror">{passwordError}</div>
                        
                    </div>
                    

                    <div className="change_password_row">
                        
                        <label htmlFor="newPassword">New Password</label>
                        
                        <input
                            
                            type="password"
                            
                            id="newPassword"
                            
                            autoComplete="off"
                            
                            placeholder="at least 6 characters"
                            
                            value={newPassword}
                            
                            onChange={(e) => setNewPassword(e.target.value)}
                            
                        />
                        

                        {!newPassword ? (
                            
                            <div className="reseterror">{emptyNewPasswordField}</div>
                            
                        ) : (
                                
                                <div className="reseterror">{newPasswordError}</div>
                                
                        )}
                        
                    </div>
                    

                    <div className="change_password_row">
                        
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        
                        <input
                            
                            type="password"
                            
                            id="confirmPassword"
                            
                            autoComplete="off"
                            
                            placeholder="at least 6 characters"
                            
                            value={confirmPassword}
                            
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            
                        />
                        

                        {/* check this and correct it later  */}
                        
                        {!(confirmPassword === newPassword) && (
                            
                            <div className="reseterror">{emptyConfirmNewPasswordField}</div>
                            
                        )}
                        

                        <div className="reseterror">{confirmPasswordError}</div>
                        
                    </div>
                    

                    <div className="btn">
                        
                        <button type="submit" onClick={resetPassword}>
                            
                            Update password
                            
                        </button>
                        
                    </div>
                    
                </form>
                
            </div>
        
    );
}

export default ResetPassword;
