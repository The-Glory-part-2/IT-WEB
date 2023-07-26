// 파일위치 제어 - 경로 설정 
const path = require('path');

// ORM 객체 참조 
const Sequelize = require('sequelize');

// 개발모드 환경설정 - 공통적인 개발환경 설정 가능!
// 여기서 development는 config.json에 있는 mysql DB 정보 
// 환경 설정 파일인 .env 파일내에 NODE_ENV 키값을 추출해서 개발 모드인지 테스트 모드인지 프로덕션 모드인지 확인함.
const env = process.env.NODE_ENV || 'development';

// DB연결 환경설정정보 변경처리//관련정보 수정 - config 파일 
//const config = require(path.join(__dirname,'..','config','config.json'))[env];

// config.js 모듈에서 DB 정보를 가져옴
const config = require('../config/config')[env];

// 데이터 베이스 객체
const db= {};

// DB연결정보로 시퀄라이즈 ORM 객체 생성
const sequelize = new Sequelize(config.database,config.username,config.password,config);

// DB 처리 객체에 시퀄라이즈 정보 맵핑처리
// 이후 DB객체를 통해 데이터 관리가능해짐
db.sequelize = sequelize; // DB연결정보를 포함한 DB제어 객체속성(CRUD)
db.Sequelize = Sequelize; // Sequelize팩키지에서 제공하는 각종 데이터 타입 및 관련 객체정보를 제공함

// 회원모델 모듈파일 참조하고 db속성정의하기
db.Member = require('./member.js')(sequelize,Sequelize);

// db객체 외부로 노출하기
module.exports = db;