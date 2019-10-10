
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var errorClass= require("./utils/errClass")
var ficilityRouter = require('./routes/ficilityRoute');
const orderRouter = require("./routes/order")
var transportationRouter = require('./routes/transportRouter');

var foodRouter = require('./routes/food');
var cataRouter = require('./routes/cataRoute');


var usersRouter = require('./routes/users');
var globelError= require("./controllers/errorContollers")

var app = express();
var config = require("./config");
var cors = require('cors')
app.use(cors())
// app.use(cors({
//   credentials: true,
// }));

const mongoose = require("mongoose")



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

mongoose.connect(config.myDburi,
   { useNewUrlParser: true,useUnifiedTopology:true,useCreateIndex:true },
    err => {
  if (err) return console.log(err);
  console.log("DB connected");
});
app.use(express.json())
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'build')));

app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, 'public/uploads')));
app.use('/images', express.static(__dirname + 'public/uploads'));
app.get("/",(req,res,next)=>{
  res.send("hello from server. server working fine")
})
app.use('/api/facility', ficilityRouter);
app.use('/api/users', usersRouter);
app.use('/api/transportation', transportationRouter);
app.use('/api/food', foodRouter);
app.use('/api/catagory', cataRouter);
app.use('/api/order', orderRouter);





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(new errorClass(`Your desire route is not found ${req.originalUrl}`, 404));
});

// error handler
app.use(globelError);

module.exports = app;
