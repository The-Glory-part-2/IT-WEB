const express = require('express')

const blogs = require('../../database/connector')
const route = express.Router()


// db 연결
const loadContent = async (req, res) => {
     console.log(req.query);
    
    // 3. blogs 안에 있는 blogs로 filter/return값 변경하기
    
    const section = req.query.section;
    const data = section ?
    blogs.filter(blog => blog.section === section) :
    blogs;
    res.status(200).json(data);
}

module.exports = {
    loadContent
}

// 메인페이지 정보 load (메뉴이름, 최신 게시글 정보)

