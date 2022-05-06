const mongoose = require("mongoose"); //requiring the mongoose package

require("dotenv").config(); //requring of the dotenv package

// dbConnection function
const dbConnection = () => {
    
  //setting the database connection
  // database url
  const Url = process.env.mongoUrl;

  // connection string
  mongoose
    .connect(Url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((success) => {
      if (success) {
        console.log("mongodb connection has been established successfully");
      }
    })
    .catch((err) => console.log(err.message));
};


// exporting the dbConnection function 
module.exports = { dbConnection };
