var express = require('express');
var router = express.Router();

var db = require('../models/index');

var sequelize = db.sequelize;
const { QueryTypes } = require("sequelize");

/* GET home page. */
router.get('/', async(req, res, next)=> {
  res.render('main');
});

router.get('/contact', async(req, res, next)=> {
  res.render('contact');
});

router.get('/about', async(req, res, next)=> {
  res.render('about');
});


module.exports = router;
