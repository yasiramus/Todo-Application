// importation of axios package 
import axios from "axios";

// useNavigate
import { useNavigate } from "react-router-dom";

// modal css
import "./modal.css";

// function ShowModal({ open, onClose }) {

function ShowModal({ open }) {

        // useNavigate for redirection or navigation or routing
    const redirect = useNavigate();

    // resend code  fxn 
    const reSendCode = async (e) => {

        e.preventDefault();

        try{

            // sendind the  request 
            const Response = await axios.put(`user/${JSON.parse(localStorage.getItem("id"))}/reSendNewOtp`);

            const { data } = Response;

            // redirection to the confirm email page 
            if (data) {
                
                redirect("confirm_email", { replace: true })
                
            } 

        } catch (error) {

            console.log(error.response)
        } 
    }

    if (!open) {
      
        return null;
        
    } else {
        
        return (
        
            <>
                
            <div className="overlay">
                
                    <div className="modalContainer">

                    <p> 
                        
                        Sorry your account hasn't been verified, click on the resend button to verify account
                        
                    </p>
                        
                    {/* <button type="submit" onClick={onClose}>
                        
                        Resend Code
                        
                    </button> */}

                    <button type="submit" onClick={reSendCode}>
                        
                        Resend Code
                        
                    </button>
                     
                </div>
                
            </div>
                
            </>
            
        );
        
    }
    
}

export default ShowModal;
