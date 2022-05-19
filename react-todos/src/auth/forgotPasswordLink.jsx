import axios from "axios"; //axios

import { useState } from "react"; //useState for setting state

import { useNavigate, useParams } from "react-router-dom"; //useNavigate for redirection

function ForgotPasswordReset() {
  //usenavigate
  const redirect = useNavigate();

  const [success, setSuccess] = useState(false); //success state

  const [mainError, setMainError] = useState(); //main error

  const [newPassword, setNewPassword] = useState(""); //new password state

  const [confirmPassword, setConfirmPassword] = useState(""); //confirm psaaword

  const [error, setError] = useState(); //main error

  const [error1, setError1] = useState();

  const { resetToken } = useParams();

  const forgotPasswordReset = async (e) => {
    e.preventDefault();

    if (!newPassword) {
      return setError("Enter new password");
    } else if (!confirmPassword) {
      return setError1("Confirm password");
    } else if (newPassword !== confirmPassword) {
      return setError1("Passwords don't match");
    } else {
      try {
        const Response = await axios.put(
          `user/${resetToken}/resetforgotPassword`,
          { newPassword }
        );

        console.log(Response.data);

        setSuccess(true);

        // setting timer for rediection to the login page to occur
        window.setTimeout(() => {
          redirect("/", { replace: true });
        }, 5000);
      } catch (error) {
        console.log(error.response);
        setMainError("something went wrong");
      }
    }
  };

  // conditional rendering
  return success ? (
    <div className="changePassword">
      <div className=" successmsg">
        <h1>Congratulations Password has been reset</h1>

        <p>LogIn with new password</p>
      </div>
    </div>
  ) : (
    <div className="changePassword">
      <h2 className="reseth2">Reset Password</h2>

      {/* //mainerror */}
      {setMainError && <div className="mainerror"> {mainError} </div>}

      <form>
        <div className="change_password_row">
          <label htmlFor="newPassword">New Password</label>

          <input
            type="password"
            id="newPassword"
            autoComplete="off"
            placeholder="**********"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          {!newPassword && <div className="mainerror"> {error} </div>}
        </div>

        <div className="change_password_row">
          <label htmlFor="confirmPassword">Confirm Password</label>

          <input
            type="password"
            id="confirmPassword"
            autoComplete="off"
            placeholder="**********"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {/* {!confirmPassword && <div className="mainerror"> {error1} </div>}  */}

          {!confirmPassword ? (
            <div className="mainerror"> {error1} </div>
          ) : (
            <div className="mainerror"> {error1} </div>
          )}
        </div>

        <div className="btn">
          <button type="submit" onClick={forgotPasswordReset}>
            Reset Password
          </button>
        </div>
      </form>
    </div>
  );
}

export default ForgotPasswordReset;
