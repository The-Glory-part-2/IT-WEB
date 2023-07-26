const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const crypto = require('crypto');
const db = require('../models/index.js');
const User = db.User;
const router = express.Router();


passport.use(
  new LocalStrategy(
    {
      // login ejs 에서 어떤 항목으로 로그인하느냐에 따라 달라짐.
      // 저는 email 과 password 로 로그인하는 방법이기 때문에 
      // usernameField 에 email 을 넣어줬습니다.
      usernameField: 'email',
      passwordField: 'password',
    },
    async (username, password, done) => {
      try {
        // 위에서 username = email 을 넣어줬기 때문에 User 데이터베이스에서 같은 email을 찾습니다
        const user = await User.findOne({ where: { email: username } });

        // 해당하는 유저가 없다면 에러 처리
        if (!user) {
          console.log('이메일 혹은 비밀번호가 일치하지 않습니다', );
          return done(null, false, { message: '이메일 혹은 비밀번호가 일치하지 않습니다' });
        }


        // user 객체에서 salt 값을 추출하여 verifyPassword 함수에 넘겨줍니다.
        const isValidPassword = await verifyPassword(user, password);

        // 비밀번호가 일치하지 않으면 에러 처리
        if (!isValidPassword) {
          console.log('이메일 혹은 비밀번호가 일치하지 않습니다', );
          return done(null, false, { message: '이메일 혹은 비밀번호가 일치하지 않습니다' });
        }

        // 여기까지 오면 로그인 성공
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);


// 비밀번호 검증하는 함수
async function verifyPassword(user, password) {
  return new Promise((resolve, reject) => {
    // 비밀번호를 입력받고 해독
    crypto.pbkdf2(password, user.salt, 310000, 32, 'sha256', (err, hashedPassword) => {
      if (err) {
        resolve(false);
      } else {
        resolve(crypto.timingSafeEqual(Buffer.from(user.password, 'hex'), hashedPassword));
      }
    });
  });
}


// 세션에 사용자 정보를 저장하는 함수
passport.serializeUser((user, done) => {
  done(null, user.user_id); // 세션에 사용자의 user_id만 저장
});


// 세션에서 user_id를 기반으로 사용자 정보를 가져오는 함수
passport.deserializeUser(async (user_id, done) => {
  try {
    const user = await User.findByPk(user_id);
    done(null, user); // 세션에 저장된 사용자 정보를 req.user에 저장
  } catch (error) {
    done(error);
  }
});


// 로그인 여부 확인 
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.isAuthenticated = true;
    res.locals.user = req.user;
  } else {
    res.locals.isAuthenticated = false;
    res.locals.user = null; // 로그인하지 않은 경우 사용자 정보를 null로 설정
  }
  next();
}



// 로그인 페이지 조회 처리
router.get('/login', function(req, res, next) {
  res.render('auth/login');
});


// 로그인 처리
// local 방식을 선택했기 때문에 local을 던져줍니다
router.post('/login/password', passport.authenticate('local', {
  successRedirect: '/', // 로그인 성공 시 이동할 경로
  failureRedirect: '/login', // 로그인 실패 시 이동할 경로
}));


// 로그아웃 처리
router.get('/logout', function(req, res) {
  req.logout(function(err) {
    if (err) {
      // 에러 처리
      return next(err);
    }
    res.redirect('/'); // 로그아웃 처리 후 여기로 돌려보냅니다
  });
});


// 회원가입 페이지 조회 처리
router.get('/register', function(req, res, next) {
  res.render('auth/register');
});


// 회원가입 처리
router.post('/register', async (req, res, next) => {
  // req에서 email, username, password 추출
  // 이렇게 괄호안에서 한꺼번에 추출할 수 있습니다
  // const email = req.body.email
  // const username = req.body.username 
  // 이런식으로 할당됩니다
  const { email, username, password } = req.body;

  try {
    // 이메일 중복 체크
    const existingUser = await User.findOne({ where: { email } });

    // 이미 가입된 이메일이면 에러 처리
    if (existingUser) {
      return res.status(409).json({ message: '이미 사용 중인 이메일입니다.' });
    }

    // 패스워드 암호화
    // crypto 패키지를 이용합니다 
    const salt = crypto.randomBytes(16).toString('hex');

    // 유저가 입력한 password + salt(암호화된 문자열) = hashedPassword
    const hashedPassword = crypto.pbkdf2Sync(password, salt, 310000, 32, 'sha256').toString('hex');

    // 사용자 생성
    // 생성할때 salt 값도 넘겨줘야합니다
    // user db 모델할때 salt가 들어갈 자리도 미리 마련해야합니다
    // 이거 까먹고 했을시 user table drop 하고 다시 서버를 켜줍니다
    const newUser = await User.create({ email, username, password: hashedPassword, salt });

    // 회원가입 성공 시 세션 발급
    // 여기까지 성공하면 브라우저 cookie에 새로운 쿠키가 추가됩니다
    req.login(newUser, (err) => {
      if (err) {
        return next(err);
      }
      return res.redirect('/');
    });
  } catch (error) {
    return next(error);
  }
});


module.exports = router;

// 로그인 여부 확인 함수를 app.js에서 쓸 수 있게 export 해줍니다
module.exports.isLoggedIn = isLoggedIn;