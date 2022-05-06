const bcrypt = require('bcrypt'); //requirng  the bcrypt which is use for hashing the password

const { User } = require('../model/user'); //requirng the User model using the destructing form

// requiring the generateToken function
const { generateToken } = require('../helper/gettoken');

// sending or saving data to the database using the signUp 
const sendData = async (req,  res ) => {
  
    try {
        
        const {
            firstName,
            lastName,
            otherName,
            email,
            password
        } = req.body;
    
        const Data = {
            firstName,
            lastName,
            otherName,
            email,
            password
        }
        
        
        // if (Data.firstName === "") {
        //     return res.json({'message':'enter first name'})
        // }

        const saveData = await User( Data).save();   //save data
            
         res.status(201).json(saveData._id) // returns a user id 

    }

    catch (error) {

        // console.log(error, 'saving');
        

        // if (error.message.includes("User validation failed")) {
        //     Object.values(error.errors).forEach(({ properties }) => {
        //        return res.json({'message':error.errors[properties.path] = properties.message})
            
        //     })
        // } 
        
        if (error.errors.firstName.properties.path === 'firstName') {
             console.log(error.errors.firstName.properties.message)
        }
        
//         if (error.errors.firstName.properties.path === 'firstName') {
//             return res.json({"message": error.errors.firstName.properties.message })
// }

        
//         if (error.errors.lastName.properties.path === 'lastName') {
//             console.log(error.errors.lastName.properties.message)
//             return res.json({ message: error.errors.lastName.properties.message })

//         }

        
    //     if (error.errors.email.properties.path === 'email') {
    //        return res.json(error.errors.email.properties.message)
    //    }

    //     if (error.errors.password.properties.path === 'password') {
    //        return res.json(error.errors.password.properties.message)
    //     }

      
        // duplicate email error
        if (error.code === 11000) {
            
               res.status(409).json(error)
        }
    }
};


// sending or saving data to the database using the logIn 
const userLogIn = async (req,  res) => {

    try {

        const {
            email,
            password
        } = req.body;

        const user = await User.findOne({ email }); //finding a user using the registered email when signing up
        
        //if user exit
        if ( user ) {
            
            const matches = await bcrypt.compare( password, user.password); //compare the current password to the registered password
            
            // if password matches 
            if (matches) {

                    // passing the user id to the generateToken function 
                const token = generateToken(user._id);
                
                // setting cookie for subsequent request
                // httpOnly prevent an intruder from accessing the cookie using javaScript and also 
                // the httpOnly here means the cooking should only be access when a request is sent using only http 
                  res.cookie('userAdmin', token, { maxAge: 2 * 24 * 60 * 60 * 1000, httpOnly: true })
                
                 res.status(201).json({ matches: user._id } ) //matches:user._id returns the user id that is if the password and email matches
            }

            else {
                // error message for password
                  res.status(401).json('incorrect password')

            }

        }
        else {
            // error message for both password and email
            // the status code 403 means forbidden
             res.status(400).json({ errors: "Authentication failed" })
            
        }
        
    } catch (error) {

        console.log(error.message)
         res.send(error.message)
        
    }

};

// populating of all todos within the user model 
const populateTodo =async (req,  res) => { 
    try {
        
        const { id } = req.params; //setting of id

        // populating of todo using the user id 
        const todo = await User.findById(id).populate('todos');
        
        todo? res.status(200).json(todo) : res.status(500).json("sorry no user with such  " + id)

    } catch (error) {

        console.log(error.message);
        res.send(error.message)
        
    }
}

// exportation of variables declared
module.exports = {
    sendData,
    userLogIn,
    populateTodo,
    
}