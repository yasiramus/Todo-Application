const verifyJwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    
    const tokenExit = req.cookies.userAdmin;

    // console.log('cookies', tokenExit);

    if (tokenExit) {
        verifyJwt.verify(tokenExit, process.env.JWT_SECRET, (err, decoded ) => {
            
            if (err) {
                console.log(err.message)

                res.send(err.message)
            }
            else {
                console.log(decoded);
                next()
            }
        })
    }
    else {
        console.log("token not found ")
        res.json("token not found")

    }

}

module.exports={ auth }