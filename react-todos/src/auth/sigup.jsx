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

  const [error, setError] = useState("");

  const [error1, setError1] = useState("");

  const [emailMaxLenth, setEmailMaxLength] = useState("");

  const [passwordMaxLength, setPasswordMaxLength] = useState("");

  // function to get individual error
  // const displayIndividualErrors = (errofArrays, b) => {
  //     return (errofArrays.filter(a => {
  //       if (a.path === b) {
  //         setFirstNameError(a.message)
  //       }
  //     })
  //     )
  // }

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

        const Response = await axios.post(`/user/`, SignUser);

        const { data } = Response;

        console.log(data, "data");

        // setting of id in the local storage 
        window.localStorage.setItem("id", JSON.stringify(data));
        
        // if user details has been saved it shold redirect the user to the login page
        if (data) {

          redirect("/confirm_email", { replace: true });

        }

      } catch (error) {
        console.log(error.response, " : errormessage");

        // displayIndividualErrors(error.response.data)//invoking the displayIndividualErrors

        // input field error handling
        if (error?.response?.data === "enter first name") {
          return setFirstNameError(error.response.data);
        }

        if (error.response.data === "enter last name") {
          return setLastNameError(error.response.data);
        }

        if (error.response.data === "enter email") {
          return setEmailError(error.response.data);
        }

        if (error.response.data === "enter last name") {
          return setPasswordError(error.response.data);
        }

        //  duplicate error message for email
        if (error.message.includes(409)) {
          return setDuplicateEmailError(
            "Sorry can't use this email, use a different one"
          );
        }

        //  maxlength and min length error handling
        if (
          error.response.data === "first name character should not exceed 9."
        ) {
          setError(error.response.data);
        } else if (
          error.response.data === "first name character should not be below 2."
        ) {
          setError(error.response.data);
        }

        //  maxlength and min length error handling for last name
        if (

          error.response.data === "last name character should not exceed 14."

        )
         {

          setError1(error.response.data);

        } else if (
          error.response.data === "last name character should not be below 2."
        ) {
          setError1(error.response.data);
        }     
        //  maxlength error handling for email
        if (error.response.data === "email character should not exceed 29.") {

          return setEmailMaxLength(error.response.data);

        }

         //  maxlength error handling for password

      if (error.response.data === "password should be above 5 characters.") {

        return setPasswordMaxLength(error.response.data);

        }

        
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

          {firstName.length < 9 || (
            <div className="duplicateEmailError">{error}</div>
          )}
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

          <div className="duplicateEmailError">{error1}</div>
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

          {/* duplicate email  */}
          {!EmailError && (
            <div className="duplicateEmailError">{duplicateEmailError}</div>
          )}

          {/* empty email input field  */}
          {!email && <div className="duplicateEmailError">{EmailError}</div>}

          {/* emailMaxLenth */}
          <div className="duplicateEmailError">{emailMaxLenth}</div>
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

          {/* empty password field  */}
          {!password && (
            <div className="duplicateEmailError">{passwordError}</div>
          )}

          <div className="duplicateEmailError">{passwordMaxLength}</div>
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
