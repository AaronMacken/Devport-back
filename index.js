// ---------------- REQUIREMENT VARS --------------- //
const express = require("express"),
    app = express(),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    errorHandler = require("./handlers/error"),
    resumeRoute = require('./routes/resume'),
    nodeMailer = require('./routes/nodeMailer');

// ---------------- SERVER CONFIG --------------- //    
require("dotenv").config();
// allows cross origin requests
app.use(cors());
// body parser config
app.use(bodyParser.json());

// app.post('/mail', function(req, res) {
//     console.log(req.body);
// })


// ---------------- ROUTES --------------- //
// download resume route
app.use('/resume', resumeRoute);
// node mailer route
app.use('/nodeMailer', nodeMailer);


// ---------------- ERROR HANDLING --------------- //
// if none of the above routes are reached, display this error
app.use(function(req, res, next) {
    let err = new Error("404 not Found");
    err.status = 404;
    next(err);
});
// if the route was reached but there was an issue,
// use this errorHandler to format the error
app.use(errorHandler);


app.listen(process.env.PORT || 3001, () => {
    console.log(`Server is listening on port ${PORT}`);
});