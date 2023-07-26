var express = require('express');
var router = express.Router();
var Post = require('../models/index').Post; 

router.get('/', async function (req, res, next) {
  try {
    // 전체 글 정보를 DB에서 조회해옵니다.
    var posts = await Post.findAll();

    res.render('index.ejs', { posts: posts }); 
  } catch (error) {
    next(error);
  }
});

module.exports = router;
