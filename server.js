const express = require('express');
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');

// LOCAL IMPORT
const routes = require("./routes"); // handle all routes
const mongooseConfig = require("./configs/mongoose.config"); // for mongo
// Init express
// Express is a minimal and flexible Node.js web application framework 
// Provides a robust set of features for web and mobile applications.
const app = express();

// It's header
// we should remove it because it will tell the client know what's the framework you are using
app.disable('x-powered-by');

// Use gzip compression
// Gzip compressing can greatly decrease the size of the response body and hence increase the speed of a web app
// Use the compression middleware for gzip compression in your express app
app.use(compression());

// cors
app.use(cors());

// This is middleware to handle HTTP post request, json, text and encode url
// Way to format data JSON - XML - URL - FORM DATA
// Body parser return a function activate like middleware . Listen data form client and get from request.body
// To get data from Form we need bodyParser
// @param extended : false => value can be string or array
// @param extended : true => value can be any type
app.use(bodyParser.json({limit: '50mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ===============================================
dotenv.config(); // dotenv to connect environment
//sseConfig(); 
mongooseConfig();
// ===============================================


// route splitting
routes(app);

app.listen( process.env.PORT, () => console.log('Server running on port: ' + process.env.PORT));
