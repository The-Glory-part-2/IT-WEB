const nunjucks = require('nunjucks');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan'); // 디버깅
const helmet = require('helmet'); // 보안

const categoryRouter = require('./routes/category.js');

const app = express();
app.set('view engine','html');

nunjucks.configure('template', {
    autoescape: true,
    express: app,
    watch: true
})
// template를 인식하고 사용하겠다
// autoescape는 보안상 true (false일 경우 html 태그 허용, DBD 공격 가능)
// express : app, 사용할 객체 지정
// watch: true 옵션을 사용하면 HTML파일이 변경될 때 템플릿 엔진 다시 렌더링

app.use(express.json());
app.use(helmet());
app.use(morgan('tiny'));

app.use('/category', categoryRouter);

app.get('/', (req, res) => {
    res.render('index.html');
});

app.use((req, res, next) => {
    res.sendStatus(404);
})

app.use((err, req, res, next) => {
    console.log('에러났음!')
    console.log(err);
    res.sendStatus(500);
})

let PORT = 8080;

app.listen(PORT, () => console.log(`local ${PORT}`))
