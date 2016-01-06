/**
 * Created by C.Y. on 16/1/6.
 */


var  express = require('express');

//post提交过来的数据处理
exports.post = function(req,res){

     var www = req.body.inputWWW;

     var php = req.body.inputPHP;

     var info = req.body.inputInfo;

     var port = req.body.inputPort;

     var url = www+','+php+','+info+','+port;

        res.json({url : url,'status':'connect is ok'});
 };

