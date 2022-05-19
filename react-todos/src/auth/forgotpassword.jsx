// axios importation 
import axios from "axios";

// useState importation
import { useState } from "react";

function ForgotPassword() {

    const [email, setEmail] = useState(""); //email state
    const [success, setSuccess] = useState(false); //success state
    const [error, setError] = useState(); //error state

    const forgetPassword = async (e) => {
        e.preventDefault();

        try {
            const forgotpassword = await axios.put(`/user/forgotPassword/${email}`);

            console.log("forgotPassword", forgotpassword);

            setSuccess(true);

            // email(""); //clear the email input fiel

        } catch (error) {
            console.log(error);
            setError("error occured")
        }
    }
    return success ? ( 
        <div className="changePassword">
        <div className=" successmsg">
            <h1>Check email for reset link </h1>
        </div>
        </div>
    
    ) : (
        <div className="changePassword">
                
        <h2 className="reseth2">Forgot Password ? </h2>

          {/* //mainerror */}
          {setError && <div className="mainerror"> {error} </div>}  
          
          <form>
              
              <div className="change_password_row">
                  
                  <label htmlFor="currentPassword">Email</label>
                  
                  <input
                      
                      type="email"
                      
                      id="currentPassword"
                      
                      autoComplete="off"
                      
                      value={email}
                      
                      onChange={(e) => setEmail(e.target.value)}
                      
                  />
                  
              </div>
              
              <div className="btn">
                        
                        <button type="submit" onClick={forgetPassword}>
                            
                            send link
                            
                        </button>
                        
                    </div>
            </form> 
        
        </div>              
     )
}

export default ForgotPassword;