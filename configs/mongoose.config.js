// mongoDB for node js
const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();

module.exports = () => {
  // Database config
    mongoose
        .connect(process.env.MONGO_ONLINE || process.env.MONGO_OFFLINE, { useNewUrlParser: true }, function(err){
          if(err){
            console.log(err)
          }
          else{
            console.log("Successfully connected to mlab || OFFLINE")
          }
        }) //process.env.MONGO_OFFLINE ||
  }