var express = require('express');
var mysqldb = require('../mysqldb');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('joinForm',{title: "회원가입"});
});

router.post('/',function(req,res,next){
    var user = {'userid':req.body.userid,
        'name':req.body.name,
        'address':req.body.address};

    mysqldb.function_name(user, function(err, rows) {
        //console.log(err);
        //console.log(rows);
        if(!err) {
            res.json({result:'success'});
        }  else {
            res.json({result:'fail'});
        }
    });
});

module.exports = router;
