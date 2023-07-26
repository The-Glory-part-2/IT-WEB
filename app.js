var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const db = require('./models/index.js');
const User = db.User;
var cors = require('cors');
var dotenv = require('dotenv');

dotenv.config();


//모델 index.js를 참조해서 SequelizeORM 객체를 참조합니다.
//NODE Application이 최초 실행시 MYSQL DB서버와 연결하고 테이블들을 자동으로 생성합니다. 
//models폴더내 각종 model.js파일들을 이용해 연결된 해당 DB에 물리적 테이블을 생성합니다.(있으면 안생성합니다.)
var sequelize = require('./models/index.js').sequelize;


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var postsRouter = require('./routes/posts');

// auth 라우터 추가
var authRouter = require('./routes/auth');

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
app.use(express.static(__dirname + '/public'));


// passport를 위한 sessionStore 생성. npm i express-mysql-session 설치하고 
// 위에서 require 해오기
// config/config.json 에 있던 db 연결 정보를 그대로 불러오면 됩니다
const sessionStore = new MySQLStore({
  host: process.env.MYSQL_HOST, 
  user: process.env.MYSQL_USERNAME, 
  password: process.env.MYSQL_PASSWORD, 
  database: process.env.MYSQL_DATABASE, 
});


// 세션 및 Passport 설정
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user.user_id); // 세션에 사용자의 고유번호(user_id) 저장
});

passport.deserializeUser((id, done) => {
  User.findByPk(id).then((user) => {
    done(null, user); // 세션에 저장된 고유번호를 사용하여 사용자 정보 조회
  });
});


// 로그인 여부 확인 미들웨어 설정
app.use(authRouter.isLoggedIn);


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);

// auth 라우터 사용 설정
app.use('/', authRouter);


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


// # Port
app.listen(process.env.PORT), () => {
  console.log(`${process.env.PORT}번 포트에서 대기 중`);
};

module.exports = app;
