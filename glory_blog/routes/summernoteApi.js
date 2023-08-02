var express = require('express');
var router = express.Router();

var moment = require('moment');

var db = require('../models/index');
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




router.post('/',upload.single('file'), function(req, res) {

    var apiResult ={
        code: 200,
        data: null,
        msg: ''
    };

    try{

        //업로드 완료된 파일정보 추출하기
        const uploadFile = req.file;

        var filePath = "/upload/"+uploadFile.filename; //서버에 저장된 파일이름
       
        var fileName = uploadFile.filename;
        var fileOrignalName = uploadFile.originalname; //사용자가 업로드한 오리지널 파일이름
        var fileSize = uploadFile.size; //업로드된 파일 사이즈
        var fileType=uploadFile.mimetype; //업로드된 파일형식
       
        var result ={
            fileName,
            fileOrignalName,
            fileSize,
            fileType,
            filePath
        };

        apiResult.code = 200;
        apiResult.data = result;
        apiResult.msg = "Ok";

    }catch(error){
        apiResult.code = 500;
        apiResult.data = null;
        apiResult.msg = "failed";
    }


    return res.json(apiResult);
});


module.exports = router;
