import './resetpassword.css'; //css

import axios from 'axios';//axios

import { useState } from "react";
    
function ResetPassword() {

    const [password, setPassword] = useState("");//password

    const [newPassword, setNewPassword] = useState("");//new password

    const [confirmPassword, setConfirmPassword] = useState("");//confirm psaaword
    console.log(password);

    // password reset 
    const resetPassword = async (e) => {
        e.preventDefault();

        try {
            const Data = {
                password,
                newPassword
        }
            const passwordReset = await axios.put("/user/resetPassword", Data);

            console.log(passwordReset.data, 'res');

            // const { data } = passwordReset;

            // console.log(data,'data');
    } catch (error) {
       console.log(error.response.data,'reset error'); 
    }
}

    return ( 
            <div className="changePassword">
            <h2 className="reseth2">Change Password</h2>
            <form>
                <div className="change_password_row">
                <label htmlFor="currentPassword">Current Password</label>
                    <input type="password" id="currentPassword" autoComplete="off" value={password} onChange={ e => setPassword(e.target.value)}/>
                </div>
                
                <div className="change_password_row">
                <label htmlFor="newPassword">New Password</label>
                    <input type="password" id="newPassword" autoComplete="off" placeholder="at least 6 characters"
                        value={newPassword} onChange={ e => setNewPassword(e.target.value)}/>
                </div>
                
                <div className="change_password_row">
                <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" id="confirmPassword" autoComplete="off" placeholder="at least 6 characters"
                        value={confirmPassword} onChange={ e => setConfirmPassword(e.target.value)}/>
                </div>
                
                <div className="btn">
                <button type="submit" onClick={resetPassword}>Update password</button>
               </div>

            </form>
        </div>

             );
}

export default ResetPassword;