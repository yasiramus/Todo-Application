const jwt = require("jsonwebtoken"); //requiring json web token

// generating jsonwebtoken function
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: 2 * 24 * 60 * 60 * 1000,
  });
};


// getErrors function
const getErrors = (err) => {

  // setting an empty array
  const arrayOfErrors = [];

  console.log(err, 'errr')
  // looping through the err using the parameter set 
  Object.values(err).forEach(({ properties }) => {

    // extracting the message and path properties from the object 
      // the props is user defined 
    const { validator, type, value, ...props } = properties;
      
      arrayOfErrors.push(props); //pushing the prop into the empty arrayoferrors

    //   console.log('b' , props);//this contains  { message: 'enter first name', path: 'firstName' }
      
  });
    
  console.log("arra", arrayOfErrors);

    return arrayOfErrors; //returning the arrayof errors
    
};

module.exports = { generateToken };
