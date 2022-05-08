// axios
import axios from "axios";

// useState
import { useState } from "react";

// import usenavigate
import { useNavigate } from "react-router-dom";

// importing person icons
import { BiUser, BiGroup } from "react-icons/bi";

// email icon
import { FaRegEnvelope } from "react-icons/fa";

// password icon
import { MdLockOutline } from "react-icons/md";

function SignUp() {
  //usenavigate
  const redirect = useNavigate();

  // setting all input fields state
  const [firstName, setFirstName] = useState("");

  const [firstNameError, setFirstNameError] = useState("");

  const [lastName, setLastName] = useState("");

  const [lastNameError, setLastNameError] = useState("");

  const [otherName, setOtherName] = useState("");

  const [email, SetEmail] = useState("");

  const [EmailError, setEmailError] = useState("");

  const [duplicateEmailError, setDuplicateEmailError] = useState("");

  const [password, setPassword] = useState("");

  const [passwordError, setPasswordError] = useState("");

  const [confirm_password, setConfirmPassword] = useState("");

  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  //const [confirmPasswordEmpty, setConfirmPasswordEmpty] = useState('');
    
    const [error, setError] = useState('')

  // submit form function
  const SubmitForm = async (e) => {
    e.preventDefault();

    // if password doent match it shold not allow to user to register
    if (password !== confirm_password) {
      setConfirmPasswordError("Password don't match");
    }

    // if it matches users details should be saved to the database
    else {
      try {
        const SignUser = {
          firstName,

          lastName,

          otherName,

          email,

          password,

          confirm_password,
        };

        const response = await axios.post(`/user/`, SignUser);

        const { data } = response;

        console.log(data, "data");

        if (data === "enter first name") {
          return setFirstNameError(data);
        }

        //   maxlength error handling 
        if (data === "first name character should not exceed 9.") {
            // console.log(firstName.length === 9);
                return setError(data);
          }

        if (data === "enter last name") {
          return setLastNameError(data);
        }

        if (data === "enter email") {
          return setEmailError(data);
        }

        if (data === "enter password") {
          return setPasswordError(data);
        }

        // if (!confirm_password) {
        //   setConfirmPasswordEmpty("Please re enter password");
        // }

        // if user details has been saved it shold redirect the user to the login page
        if (data) {
          redirect("/", { replace: true });
        }
      } catch (error) {
        console.log(error.message, " : errormessage");

        if (error.message.includes(409)) {
          setDuplicateEmailError(
            "Sorry can't use this email, use a different one"
          );
        }

        // if (error.message.includes(422)) {
        //   setLastNameError("Please enter last Name");
        // }

        // if (error.message.includes(422)) {
        //   setFirstNameError("hj");
        // }
      }
    }
  };

  return (
    <div id="signup_form">
      <form className="loginForm">
        <h1>SignUp</h1>

        <div className="Row">
          <label htmlFor="firstName">
            <BiUser /> First Name <i>*</i>
          </label>

          <input
            type="text"
            id="firstName"
            autoComplete="off"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          {/* setting a conditional statement where the error message disapperimdiatelythe user start typing  */}
          {!firstName && (
            <div className="duplicateEmailError">{firstNameError}</div>
          )}

            { firstName.length < 9 && <div className="duplicateEmailError">{error}</div> }
                  
        </div>

        <div className="Row">
          <label htmlFor="lastName">
            <BiGroup /> Last Name <i>*</i>
          </label>

          <input
            type="text"
            id="lastName"
            autoComplete="off"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          {/* setting a conditional statement where the error message disapperimdiatelythe user start typing  */}
          {!lastName && (
            <div className="duplicateEmailError">{lastNameError}</div>
          )}
        </div>

        <div className="Row">
          <label htmlFor="otherName">
            <BiUser /> Other Name
          </label>

          <input
            type="text"
            id="otherName"
            autoComplete="off"
            value={otherName}
            onChange={(e) => setOtherName(e.target.value)}
          />
        </div>

        <div className="Row">
          <label htmlFor="Email">
            <FaRegEnvelope className="svg" /> Email <i>*</i>
          </label>

          <input
            type="email"
            id="Email"
            autoComplete="off"
            value={email}
            onChange={(e) => SetEmail(e.target.value)}
          />

          {!EmailError && (
            <div className="duplicateEmailError">{duplicateEmailError}</div>
          )}

          {!email && <div className="duplicateEmailError">{EmailError}</div>}
        </div>

        <div className="Row">
          <label htmlFor="Password">
            <MdLockOutline /> Password <i>*</i>
          </label>

          <input
            type="password"
            id="Password"
            autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {!password && (
            <div className="duplicateEmailError">{passwordError}</div>
          )}
        </div>

        <div className="Row">
          <label htmlFor="confirm_password">
            <MdLockOutline /> Confirm Password<i> *</i>
          </label>

          <input
            type="password"
            id="confirm_password"
            autoComplete="off"
            value={confirm_password}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {!confirm_password && (
            <div className="duplicateEmailError">{confirmPasswordError}</div>
          )}

          {/* <div className='duplicateEmailError' >{ confirmPasswordEmpty}</div> */}
        </div>

        <button type="submit" onClick={SubmitForm}>
          signUp
        </button>
      </form>
    </div>
  );
}

export default SignUp;
