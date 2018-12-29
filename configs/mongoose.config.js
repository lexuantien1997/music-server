// mongoDB for node js
const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();

module.exports = () => {
  // Database config
    mongoose
        .connect(process.env.MONGO_ONLINE, { useNewUrlParser: true }, function(err){
          if(err){
            console.log(err)
          }
          else{
            console.log("Successfully connected to mlab")
          }
        }) //process.env.MONGO_OFFLINE ||
  }