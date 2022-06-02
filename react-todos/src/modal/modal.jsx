// importation of axios package 
import axios from "axios";

import { useNavigate } from "react-router-dom";

import { useState } from "react";

import "./modal.css";

// function ShowModal({ open, onClose }) {

function ShowModal({ open }) {
        
    const redirect = useNavigate();

    const [error, setError] = useState(false);
    
    const reSendCode = async (e) => {

        e.preventDefault();

        try{

            const Response =await axios.put(`user/${JSON.parse(localStorage.getItem("id"))}/reSendNewOp`);

            console.log(Response)

            const { data } = Response;

            if (data) {
                
                redirect("confirm_email",{replace:true})
            } else {
                setError(true);
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
                        <p>{ error}</p>
                    
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
