var mysql = require('mysql');
var pool  = mysql.createPool({
    connectionLimit : 100,
    host            : 'localhost',
    port            : 3306,
    user            : 'root',
    password        : ' ',
    database        : 'test'
});

exports.function_name = function(user, callback) {
    pool.getConnection(function(err, connection) {
        // Use the connection
        var sql = 'insert into users (userid, name, address) values (?, ?, ?)',
            data = [user.userid, user.name, user.address],
            query;

        query = connection.query(sql, data, function(err, rows) {
            console.log(query); //query result
            //console.log(err);  //err
            //console.log(rows); //result
            connection.release();
            callback(err, rows);
            // Don't use the connection here, it has been returned to the pool.
        });
    });
};
//이미지 게시판
exports.function_name2 = function(curPage, callback) {
    pool.getConnection(function(err, connection) {
        // Use the connection
        //가장 최근(첫페이지)의 6개 항목을 가져온다라고 할때는...
        //다음 페이의 20개는 SELECT * FROM test ORDER BY id desc LIMIT 6, 6
        var sql = 'select * from board order by id desc LIMIT ?, 6;',
            data = [ 6*(curPage.currentPage-1) ],
            query;
        console.log(data);
        query = connection.query(sql, data, function(err, rows) {
            //console.log(query); //query result
            //console.log(err);  //err
            //console.log(rows); //result
            connection.release();
            callback(err, rows);
            // Don't use the connection here, it has been returned to the pool.
        });
    });
};

//이미지 내용보기
exports.function_name3 = function(idx ,callback) {
    pool.getConnection(function(err, connection) {
        // Use the connection
        var sql = 'SELECT * FROM board where id = (?)' ,
            data = [idx],
            query;

        query = connection.query(sql, data, function(err, rows) {
            //console.log(query); //query result
            //console.log(err);  //err
            //console.log(rows); //result
            connection.release();
            callback(err, rows);
            // Don't use the connection here, it has been returned to the pool.
        });
    });
};