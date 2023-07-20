// express 웹프페임워크 참조 
var express = require('express');
const { route } = require('.');

// express 객체의 Router() 메소드(기능)을 호출해서 사용자 요청과 응답을 처리할 라우터 객체를 생성
var router = express.Router();

// 회원 가입 페이지 요청 라우팅 메소드 (비동기 방식)
// 요청 방식: get 
// 응답형식: 웹페이지 
// 호출주소: http://localhost:3000/member/register
router.get('/register', async(req, res, next) => {
    res.render('register.ejs');
});

// 회원가입 페이지에서 전달되는 회원가입 정보를 추출해서 회원정보를 등록처리 요청에 응답하는 라우팅 메소드 
// 응답 방식: post
// 호출주소: http://localhost:3000/member/register
router.post('/register', async(req, res, next) => {
    // 사용자가 회원가입 form에서 입력한 데이터를 추출해서, DB에 저장하고, 
    // 저장을 완료하면, 특정 웹페이지로 브라우저 웹페이지를 이동시킨다.


    // form 태그에 post 방식으로 전달되면 form 데이터는 req 객체의 body 속성으로 추출할 수 있다.
    // req는 httpRequest 객체로 웹브라우저에서 넘어오는 모든 정보를 서버에서 추출할 수 있다.
    // req.body.form태그내 html 요소의 name 속성값으로 해당 html 요소의 입력값을 추출한다. 
    // req.body.email = <input type="text" name="email" />
    var email = req.body.email;
    var name = req.body.name;
    var password = req.body.password;
    var confirmPassword = req.body.confirmPassword;

    // 현재 DB에 저장은 모델을 통해 DB에 저장했다고 가정한다. 

    // 회원가입 후에는 메인페이지로 사용자 브라우저를 이동시키려고 함.
    // res 객체의 redirect('이동시킬 url주소정의' -> 주의: 여기에 절대 뷰파일주소를 넣으면 안됨!!)
    res.redirect('/member/login');
})

// 회원 로그인 페이지 요청 라우팅 메소드 (비동기 방식)
// 요청 방식: get 
// 응답형식: 웹페이지 
// 호출주소: http://localhost:3000/member/login
router.get('/login', async(req, res, next) => {
    res.render('login.ejs');
});

router.post('/login', async(req, res, next) => {
    var name = req.body.name;
    var password = req.body.password;

     // 현재 DB에 저장은 모델을 통해 DB에 저장했다고 가정한다. 

    // 회원가입 후에는 메인페이지로 사용자 브라우저를 이동시키려고 함.
    // res 객체의 redirect('이동시킬 url주소정의' -> 주의: 여기에 절대 뷰파일주소를 넣으면 안됨!!)
    res.redirect('/');
})

// Router file은 해당 Router file에 정의된 router를 외부로 반환
module.exports = router;