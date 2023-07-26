// c,r,u,d 관련 model을 호출하여 페이지 렌더링

var express = require('express');
var router = express.Router();
var Post = require('../models/main').Post;
const { format } = require('date-fns');


// 게시글 조회
router.get('/list', async function (req, res, next) {
  try {
    // 전체 게시글 정보를 DB에서 조회해옵니다.
    var posts = await Post.findAll();

    res.render('posts/list.ejs', { posts: posts });
  } catch (error) {
    next(error);
  }
});



// 글 작성 페이지를 렌더링합니다.
router.get('/create', function (req, res, next) {
  res.render('posts/create.ejs');
});

// 글 작성 요청을 처리합니다.
router.post('/create', async function (req, res, next) {
  try {
    // 요청 데이터에서 제목과 내용을 추출합니다.
    var { title, content } = req.body;

    // 글을 생성합니다.
    var newPost = await Post.create({
      title: title,
      content: content,
      view_count: 0,
    });

    // 글 작성 완료 후 리다이렉트합니다.
    res.redirect('/');
  } catch (error) {
    next(error);
  }
});


// 글 상세 페이지를 렌더링합니다.
router.get('/detail/:id', async function (req, res, next) {
  try {
    var postId = req.params.id;

    // 해당 ID의 글을 조회합니다.
    var post = await Post.findByPk(postId);

    if (!post) {
      throw new Error('글을 찾을 수 없습니다.');
    }

    // 날짜 형식 변환
    var formattedCreatedAt = format(post.createdAt, 'yyyy/MM/dd a hh:mm');

    // 조회수를 1 증가시킵니다.
    post.view_count++;
    await post.save();

    res.render('posts/detail.ejs', { post, formattedCreatedAt });
  } catch (error) {
    next(error);
  }
});


// 글 수정 페이지를 렌더링합니다.
router.get('/edit/:id', async function (req, res, next) {
  try {
    var postId = req.params.id;

    // 해당 ID의 글을 조회합니다.
    var post = await Post.findByPk(postId);

    if (!post) {
      throw new Error('글을 찾을 수 없습니다.');
    }

    res.render('posts/edit.ejs', { post: post });
  } catch (error) {
    next(error);
  }
});

// 글 수정 요청을 처리합니다.
router.post('/edit/:id', async function (req, res, next) {
  try {
    var postId = req.params.id;
    var { title, content } = req.body;

    // 해당 ID의 글을 조회하고 업데이트합니다.
    var post = await Post.findByPk(postId);
    if (!post) {
      throw new Error('글을 찾을 수 없습니다.');
    }

    post.title = title;
    post.content = content;
    await post.save();

    res.redirect('/');
  } catch (error) {
    next(error);
  }
});



// 글 삭제 요청을 처리합니다.
router.delete('/delete/:id', async function (req, res, next) {
  try {
    var postId = req.params.id;

    // 해당 ID의 글을 조회합니다.
    var post = await Post.findByPk(postId);

    if (!post) {
      throw new Error('글을 찾을 수 없습니다.');
    }

    // 글을 삭제합니다.
    await post.destroy();

    res.sendStatus(200); // 삭제 성공 응답
  } catch (error) {
    next(error);
  }
});


module.exports = router;
