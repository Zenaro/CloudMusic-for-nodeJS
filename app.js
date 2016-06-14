/**
 * Created by zenaro on 16-6-13.
 */
const homePath = "/views/Home/";
var express = require('express');
var app = express();
var musicDao = require('./dao/musicDao');
var userDao = require('./dao/userDao');
var newsDao = require('./dao/newsDao');

app.use(express.static('public'));
app.use(express.static('Lib'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.get(homePath + 'index', function (req, res) {
    res.sendFile(__dirname + homePath + "index.html");
});

app.get(homePath + 'login', function (req, res) {
    res.sendFile(__dirname + homePath + "login.html");
});

app.get(homePath + 'my', function (req, res) {
    res.sendFile(__dirname + homePath + "my.html");
});

app.get(homePath + 'reg', function (req, res) {
    res.sendFile(__dirname + homePath + "reg.html");
});

app.get(homePath + 'result', function (req, res) {
    res.sendFile(__dirname + homePath + "result.html");
});

// user 接口
app.get('/controller/checkLogin', function (req, res) {
    userDao.checkLogin(req, res);
});
app.get('/controller/checkReg', function (req, res) {
    userDao.checkReg(req, res);
});
app.get('/controller/getMusic', function (req, res) {
    userDao.getMusic(req, res);
});
app.get('/controller/colMusic', function (req, res) {
    userDao.checkLogin(req, res);
});
app.get('/controller/delMusic', function (req, res) {
    userDao.checkLogin(req, res);
});
app.get('/controller/getUInfo', function (req, res) {
    userDao.getInfo(req, res);
});
app.get('/controller/getFriend', function (req, res) {
    userDao.getRank(req, res);
});
app.get('/controller/setFriend', function (req, res) {
    userDao.getRank(req, res);
});
app.get('/controller/setComment', function (req, res) {
    userDao.getRank(req, res);
});

// music接口
app.get('/controller/getMInfo', function (req, res) {
    musicDao.getInfo(req, res);
});
app.get('/controller/getList', function (req, res) {
    musicDao.getList(req, res);
});
app.get('/controller/getComment', function (req, res) { // 歌曲评论
    musicDao.getComment(req, res);
});
app.get('/controller/getLrc', function (req, res) {
    musicDao.getLrc(req, res);
});
app.get('/controller/searchMusic', function (req, res) {
    musicDao.search(req, res);
});

// 获取
app.get('/controller/getNews', function (req, res) {    // 推送
    newsDao.queryAll(req, res);
});



var server = app.listen(2333, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("应用实例，访问地址为：http://%s:%s", host, port);
});
