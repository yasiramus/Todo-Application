const jwt = require('jsonwebtoken'); //requiring json web token
    
    // generating jsonwebtoken function
    const generateToken = (id) => {
                    
        return jwt.sign( { id }, process.env.JWT_SECRET, {

            expiresIn: 2 * 24 * 60 * 60 * 1000
            
        })
    };

module.exports = { generateToken }
