var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var helmet = require('helmet');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var config = require('./config/config');
var crypto = require('crypto');
var fs = require("fs")
var moment = require('moment');
var index = require('./routes/index');
// var cors = require("cors")
var app = express();
mongoose.Promise = global.Promise

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// app.use(cors())
// app.use(function (req, res, next) {

//   if (!req.secure) {
//     return res.redirect("https://" + req.get('Host') + req.url)
//   }
//   next();
// })
//helmet setup
app.use(helmet());  
// app.use(cors())
app.disable('x-powered-by');
// view engine setup
app.set('views', path.join(__dirname, 'build'));
app.set('view engine', "html");

app.engine('html', require('hbs').__express);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'build')));


app.use('/', index);
app.get('*',function(req, res){
  res.sendFile(path.join(process.cwd(),"build/index.html"))
});


var https = require('https')
var http = require('http')
const hskey = fs.readFileSync('./ssl/key.pem', "utf8");
const hscert = fs.readFileSync('./ssl/mycert.pem', "utf8");

const options = {
  key: hskey,
  cert: hscert,
};
var server = http.createServer(app);
var server2 = https.createServer(options, app);

// server2.listen(process.env.PORT ||3005, () => console.log("Server running on port 3004"))
server.listen(process.env.PORT || 80, () => console.log("Server running on port 80"))
// app.listen(process.env.PORT || 3004,()=>console.log("Server running on port 3004"));
module.exports = app;
 
  