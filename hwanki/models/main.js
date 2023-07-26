var dotenv = require('dotenv');
var mysql = require('mysql');
dotenv.config();


var sql = 'SELECT * FROM posts';
var contents;

// db 연결
const loadContent = () => {
    //db connection
    var connection = mysql.createConnection({
        host     : process.env.DB_HOST,
        user     : process.env.DB_USER,
        password : process.env.DB_PASSWORD,
        database : process.env.DB_DATABASE
    });

    // content load using async/await
    connection.connect();
    connection.query(sql, function(err, rows, fields){
        if(err){
            console.log(err);
        } else {
            contents = rows;
        }
    });
    connection.end();

    // console.log(contents);
    return contents;
    };

module.exports = {    loadContent   }