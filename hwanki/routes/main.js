var express = require('express');
var router = express.Router();

// main content를 로드해서 main.ejs 렌더링
let { loadContent } = require('../models/main')

router.get('/', async function (req, res, next) {
  try {
    var contents = await loadContent();
    console.log('==================content:')
    console.log(contents);
    console.log('==================')
    res.render('main.ejs', { posts: contents }); 
  } catch (error) {
    next(error);
  }
});

module.exports = router;



// var express = require('express');
// var router = express.Router();
// var Post = require('../models/main').Post; 
// var dotenv = require('dotenv');
// var mysql      = require('mysql');
// dotenv.config();

// var connection = mysql.createConnection({
//   host     : process.env.DB_HOST,
//   user     : process.env.DB_USER,
//   password : process.env.DB_PASSWORD,
//   database : process.env.DB_DATABASE
// });

// connection.connect();
// var sql = 'SELECT * FROM posts';
// var contents;
// connection.query(sql, function(err, rows, fields){
//     if(err){
//         console.log(err);
//     } else {
//         contents = rows;
//         // console.log('rows', rows);
//         // console.log('fields', fields);
//     }
// });
// connection.end();

// router.get('/', async function (req, res, next) {
//   try {
//     // 전체 글 정보를 DB에서 조회해옵니다.
//     console.log('rows', contents);
//     res.render('main.ejs', { posts: contents }); 
//   } catch (error) {
//     next(error);
//   }
// });

// module.exports = router;

