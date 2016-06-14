/**
 * Created by zenaro on 16-6-13.
 */
// var router = require('router');
var express = require('express');
var app = express();
var userDao = require('../dao/userDao');

app.get('/addUser', function (req, res) {
    userDao.add(req, res);
});

app.get('/', function() {

});

var server = app.listen(2333, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("应用实例，访问地址为：http://%s:%s", host, port);
});
