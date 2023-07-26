const path = require('path');
const Sequelize = require('sequelize');

//개발모드 환경설정
const env = process.env.NODE_ENV || 'development';

//DB연결 환경설정정보 변경처리//관련정보 수정
// const config = require(path.join(__dirname,'..','config','config.json'))[env];
const config= require(__dirname + '/../config/config.js')[env]

//데이터 베이스 객체
const db= {};

//DB연결정보로 시퀄라이즈 ORM 객체 생성
const sequelize = new Sequelize(config.database,config.username,config.password,config);

//DB 처리 객체에 시퀄라이즈 정보 맵핑처리
//이후 DB객체를 통해 데이터 관리가능해짐
db.sequelize = sequelize; //DB연결정보를 포함한 DB제어 객체속성(CRUD)
db.Sequelize = Sequelize; //Sequelize팩키지에서 제공하는 각종 데이터 타입 및 관련 객체정보를 제공함


//회원모델 모듈파일 참조하고 db속성정의하기
db.User = require('./users.js')(sequelize,Sequelize);
db.Post = require('./posts.js')(sequelize,Sequelize);


// 관계 설정
// Post 는 하나의 유저를 할당받을 수 있고
// User 는 여러개의 글을 할당받을 수 있다는 뜻입니다?
db.Post.belongsTo(db.User, { foreignKey: 'user_id' });
db.User.hasMany(db.Post, { foreignKey: 'user_id' });


//db객체 외부로 노출하기 
module.exports = db;