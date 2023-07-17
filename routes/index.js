// localhost:3000/landing
var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({ dest: 'uploads/' }); 
var fs = require('fs');
var path = require('path');
var SFTPClient = require('ssh2-sftp-client');

// GET Meta4Cut Landing Page
router.get('/', async(req, res)=>{
    res.render('index.ejs')
})


// GET Contact Page
router.get('/contact', async(req, res)=>{
    res.render('contact.ejs')
})

router.get('/about', async(req, res)=>{
  res.render('about.ejs')
})

// GET Login Page
router.get('/login', async(req, res)=>{
  res.render('login.ejs')
})

// GET Register Page
router.get('/register', async(req, res)=>{
  res.render('register.ejs')
})

// Get Privacy Policy Page
router.get('/privacy_policy', async(req, res)=>{
  res.render('privacy_policy.ejs')
})

// Get Privacy Policy Page
router.get('/post_sample', async(req, res)=>{
  res.render('post_sample.ejs')
})

// Upload image (ap-northeast-2)
router.post('/upload', upload.single('myImage'), async (req, res) => {
    try {
      console.log(req.file);

      // SFTP 접속 정보
      const privateKeyPath = '/app/';
      const config = {
        host: '', 
        port: '22', 
        username: 'root', 
        privateKey: fs.readFileSync(privateKeyPath)
      };
  
      // 우분투 서버에 전송할 파일의 경로를 지정합니다.
      const localFilePath = req.file.path;
      const originalFilename = req.file.originalname
      const sanitizedFilename = originalFilename.replace(/[^\w\s.-]/gi, '').replace(/\s+/g, '_');
      const remoteFilePath = '/m4c_img/' + sanitizedFilename; // target path and filename

      // create SFTP client
      const sftp = new SFTPClient();
      await sftp.connect(config);
  
      // file transfer & connection end
      await sftp.put(localFilePath, remoteFilePath);
      await sftp.end();
  
      res.send('Image has been uploaded and sent.');
  
    } catch (error) {
      console.log(error);
      res.send('Error while uploading image.');
    }
  });  

module.exports = router;
