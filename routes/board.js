var express = require('express');
var mysqldb = require('../mysqldb');
var router = express.Router();

router.get('/',function(req,res,next){
    console.log("hear2");
    console.log(req.query.page);
    var currentPage;

    if(req.query.page <= 0 || req.query.page === undefined){
        currentPage = 1;
    }else{
        currentPage = req.query.page;
    }

    var data = { 'currentPage':currentPage };
    mysqldb.function_name2(data,function(err, rows) {
        //console.log(err);
        console.log(rows);
        //  if(!err) {
        //      res.send(rows);
        //  }  else {
        //      res.json({result:'fail'});
        //  }d
        //res.render('board', { rows: rows,pageCount: 10, currentPage:1 });
        res.render('board', {  rows: rows, pageCount: 5, currentPage:currentPage, maxPage: 10 });
    });
    console.log(currentPage);

});

router.get('/:idx',function(req,res,next){
    console.log("hear3");
    const idx = parseInt(req.params.idx,10);

    if(!idx){
        return res.status(400).json({error: 'Incorrect id'});
    }

    mysqldb.function_name3(idx, function (err, rows) {
        console.log(rows.length);
        //res.json(rows);
        if(rows.length > 0) {
            res.render('contents', {rows: rows});
        }else{
            console.log("heara");
            return res.status(200).json({error: 'Unknown user'});
        }
    });
});

module.exports = router;

