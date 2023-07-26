// dotenv 환경설정 패키지를 참조하고 환경구성정보를 불러옴 (from .env파일)
require('dotenv').config();

// 단일 객체 변환 
module.exports = {
    "development": {
        "username": process.env.DB_USER,
        "password": null,
        "database": process.env.DB_NAME,
        "host": process.env.DB_HOST,
        "dialect": "mysql"
    },
    "test": {
        "username": process.env.TEST_USER,
        "password": null,
        "database": process.env.TEST_NAME,
        "host": process.env.TEST_HOST,
        "dialect": "mysql"
    },
    "production": {
        "username": process.env.PRODUCTION_USER,
        "password": null,
        "database": process.env.PRODUCTION_NAME,
        "host": process.env.PRODUCTION_HOST,
        "dialect": "mysql"
    }
}