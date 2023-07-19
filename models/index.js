const path = require('path');
const Sequelize = require('sequelize');

// 개발모드에 대한 환경 설정: .env파일 내에 NODE_ENV 키값을 추출, 모드 확인(development, test, production)
const env = process.env.NODE_ENV || 'development';
// const config = require(path.join(__dirname,'..','config','config.json'))[env];

// 자바 모듈 기반으로 config 가져오기 
const config = require('../config/config.js')[env]

// DB Object
const db= {};
// Sequelize ORM object 
const sequelize = new Sequelize(config.database,config.username,config.password,config);

// Sequelize mapping 
db.sequelize = sequelize; //DB연결정보를 포함한 DB제어 객체속성(CRUD)
db.Sequelize = Sequelize; //Sequelize팩키지에서 제공하는 각종 데이터 타입 및 관련 객체정보를 제공함

//회원모델 모듈파일 참조하고 db속성정의하기
// db.Member = require('./member.js')(sequelize, Sequelize);

// 게시글 모듈 파일 참조하고 db 속성 정의하기 
db.Article = require('./article.js')(sequelize, Sequelize);

// 관리자 계정 모듈 파일 참조하고 db 속성 정의하기 
// db.Admin = require('./admin.js')(sequelize, Sequelize);

//db객체 외부로 노출하기
module.exports = db;