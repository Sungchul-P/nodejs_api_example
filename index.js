var express = require('express');
var app = express();
var morgan = require('morgan');
var user = require('./api/user/index');

// 환경변수 설정에 따라 로그 레벨을 설정한다.
if (process.env.NODE_ENV === 'test') {
  app.use(morgan('dev'));
}

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use('/users', user);

/*
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
*/

module.exports = app;