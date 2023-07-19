const express = require('express')


const route = express.Router()

let { loadContent } = require('../controller/category/load')

route.get('/', loadContent)

module.exports = route;
