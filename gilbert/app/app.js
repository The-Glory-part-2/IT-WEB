var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// 개발자가 정의한 라우터의 파일을 참조
// 회원 정보 관리 웹페이지 요청과 응답 전용 라우터 파일 참조 
var memberRouter = require('./routes/member');

// dotenv 환경설정 패키지를 참조하고 환경구성정보를 불러옴 (from .env파일)
require('dotenv').config();

// 모델 index.js를 참조해서 sequelizeORM 객체를 참조 
// node application이 최초 실행시 Mysql DB 서버와 연결하고 테이블들을 자동으로 생성 
// model 폴더내 각종 model.js 파일들을 이용해 연결된 해당 DB에 물리적인 테이블을 생성 (만약 테이블이 있다면 재생성하지 않음.)
var sequelize = require('./models/index.js').sequelize;

var app = express();

//mysql과 자동연결처리 및 모델기반 물리 테이블 생성처리제공
sequelize.sync();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 각종 라우터파일의 기본 주소체계를 정의하는 곳
app.use('/', indexRouter);
app.use('/users', usersRouter);

// memberRouter 파일의 기본주소 체계를 localhost:3000/member... 로 정의
app.use('/member', memberRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
