// 기본 모듈
// const http = require('http');
// http.createServer();

// ===============================================================

// 사용자 정의 모듈
// const math = require('./math.js');
// const result = math.sum(1, 2);
// console.log(result);

// ===============================================================

// 파일 읽기
// const fs = require('fs');
// 동기
// const data = fs.readFileSync('./data.txt', 'utf8');
// console.log(data);
// 비동기
// const data = fs.readFile('./data.txt', 'utf8', function(err, data) {
//     console.log(data)
// });

// ===============================================================

// 익스프레스 JS - 어플리케이션
const express = require('express');
const morgan = require('morgan');
const app = express();

// 미들웨어 정의
function logger(req, res, next) {
    console.log('i am logger');
    next(); // 미들웨어는 마지막에 next() 함수를 호출해야 한다.
}

function logger2(req, res, next) {
    console.log('i am logger2');
    next();
}

function commonmw(req, res, next) {
    console.log('commonmw');
    next(new Error('error occurred')); // 다음 미들웨어에 에러 객체를 전달
}

// 에러 미들웨어 : 에러를 처리하거나 다음 동작으로 넘긴다.
function errormw(err, req, res, next) {
    console.log(err.message);
    next();
}

app.use(logger);
app.use(logger2);
app.use(commonmw);
app.use(errormw);
// morgan은 로깅레벨에 따라 옵션을 줄 수 있다.
// combined, common, dev, short, tiny
app.use(morgan('dev'));

app.listen(3000, function () {
    console.log('Server is running');
})
