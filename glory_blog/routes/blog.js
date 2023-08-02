var express = require('express');
var router = express.Router();

var db = require('../models/index');
var moment = require('moment');


var sequelize = db.sequelize;
const { QueryTypes } = require("sequelize");

var multer = require('multer');

//파일 저장위치지정
var storage = multer.diskStorage({  
    destination(req,file,cb){
        cb(null,'public/upload');
    },
    filename(req,file,cb){
        cb(null, `${moment(Date.now()).format('YYYYMMDDHHmmss')}__${file.originalname}`);
    }
})

//일반 업로드 처리 객체 생성
var upload = multer({storage:storage})



//포스트 전체 게시글 목록 조회 페이지 : http://localhost:3000/blog
router.get('/', async(req, res, next)=> {

    var v ={
        categoryList : [],
        postInfo : []
    };

    var sqlQuery=`SELECT 
    P.*,
    C.CATEGORY_NAME
    FROM 
    BLOG_CATEGORY C INNER JOIN  BLOG_POST P 
    ON C.CATEGORY_ID = P.CATEGORY_ID 
    WHERE P.POST_ID > 0 ORDER BY POST_ID DESC`

    var categoryList = await db.CATEGORY.findAll();

    var postInfo = await sequelize.query(sqlQuery,{
      raw: true,
      type: QueryTypes.SELECT
    });

    v.categoryList=categoryList;
    v.postInfo=postInfo;

    res.render('blog/bmain',{v,moment});
});



//카테고리 생성 페이지 : http://localhost:3000/blog/category
router.get('/category', async(req, res, next)=> {
    res.render('blog/category');
});

router.post('/category', async(req, res, next)=> {
    var categoryInfo={
        CATEGORY_NAME:req.body.category_name
    }
    await db.CATEGORY.create(categoryInfo)

    res.redirect('/blog');
});


//포스트 작성 페이지 : http://localhost:3000/blog/cre
router.get('/cre', async(req, res, next)=> {

    var v ={
        categoryList : []
    };

    var categoryList = await db.CATEGORY.findAll();

    v.categoryList=categoryList;

  res.render('blog/cre',{v});
});

router.post('/cre', async(req, res, next)=> {
    var category_id = req.body.category_id
    var title = req.body.title
    var contents = req.body.contents

    var postInfo ={
        CATEGORY_ID:category_id,
        TITLE:title,
        CONTENTS:contents,
        VIEW_COUNT:1,
        REG_DATE:Date.now()
    }

    await db.POST.create(postInfo);
    

  res.redirect('/blog');
});



//포스트 수정 페이지 : http://localhost:3000/blog/mod
router.get('/mod/:mid', async(req, res, next)=> {

    var postId=req.params.mid;

    var v={
        postInfo:[],
        categoryList:[]
    }

    var categoryList = await db.CATEGORY.findAll();

    var sqlQuery=`SELECT 
    P.*,
    C.CATEGORY_NAME
    FROM 
    BLOG_CATEGORY C INNER JOIN  BLOG_POST P 
    ON C.CATEGORY_ID = P.CATEGORY_ID 
    WHERE POST_ID=${postId}`


    var postInfo = await sequelize.query(sqlQuery,{
      raw: true,
      type: QueryTypes.SELECT
    });

    v.postInfo=postInfo[0];
    v.categoryList=categoryList;

    res.render('blog/mod',{v,moment});
});



router.post('/mod/:mid', async(req, res, next)=> {
    
    var v={
        postInfo:[],
        categoryList:[]
    }

    var postId=req.params.mid;
    var category_id = req.body.category_id
    var title = req.body.title
    var contents = req.body.contents

    var postInfo ={
        CATEGORY_ID:category_id,
        TITLE:title,
        CONTENTS:contents,
        REG_DATE:Date.now()
    }

    var postInfoUpdate = await db.POST.update(postInfo,{where:{POST_ID:postId}});

    var categoryList = await db.CATEGORY.findAll();


    v.postInfo=postInfo;
    v.categoryList=categoryList;


    res.redirect('/blog');
});



//포스트 단일 게시글 조회 페이지
router.get('/view/:pid', async(req, res, next)=> {

    var postId = req.params.pid

    var v={
        postInfo:[]
    }

    var postInfo = await db.POST.findOne({where:{POST_ID:postId}});
    await db.POST.update({VIEW_COUNT:postInfo.VIEW_COUNT+1},{where:{POST_ID:postId}});

    v.postInfo=postInfo;

    res.render('blog/view',{v,moment});
});
  
//카테고리별 게시글 목록 조회 페이지
router.get('/:cid', async(req, res, next)=> {

    var categoryId = req.params.cid;

    var v={
        postInfo:[],
        categoryList:[]
    };

    var categoryList = await db.CATEGORY.findAll();

    var postInfo = await db.POST.findAll({where:{CATEGORY_ID:categoryId}})
    
    v.postInfo=postInfo;
    v.categoryList=categoryList

   res.render('blog/bmain',{v,moment});
});


// 포스트 삭제
router.get('/del/:did', async(req, res, next)=> {

    var delPostId= req.params.did;

    const delPost = await db.POST.destroy({
        where:{POST_ID:delPostId}
    })
    res.redirect('/blog');
});



module.exports = router;
