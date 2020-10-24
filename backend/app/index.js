const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require("dotenv").config();

const app = express();

var corsOption = {
  origin: "http://localhost:8081"
};

app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
let links = app._router.stack;

const path = require('path');
app.use('/assets', express.static(path.join(__dirname, 'assets')))
app.use(express.static(path.join(__dirname, 'public')));
/*
app.get("/", (req, res) => {
  res.json({ 
    message: `WELCOME my friend `,    
  }); 
});*/

var greet = express.Router()


require('./helper/routeList')(app);

//Routes
require('./routes/')(app)
//require('./routes/user.route')(app);
//require('./routes/auth.route')(app);
//require('./routes/counter.route')(app);
//require('./routes/service.route')(app);
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'), function(err) {
      if (err) {
        res.status(500).send(err)
      }
    })
});


module.exports = app;