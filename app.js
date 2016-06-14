/**
 * Created by zenaro on 16-6-13.
 */
const homePath = "/app/Home/";
var express = require('express');
var app = express();
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'music'
});

connection.connect();

connection.query("SELECT * FROM app_Music", function (err, rows, fields) {
    if (err) throw err;
    // console.log("the solution is: ", rows[0]);
});

connection.end();

app.use(express.static('public'));
app.use(express.static('Lib'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.get(homePath + 'index', function (req, res) {
    res.sendFile(__dirname + homePath + "index.html");
});

app.get(homePath + 'search', function (req, res) {
    res.sendFile(__dirname + homePath + "search.html");
});

var server = app.listen(2333, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("应用实例，访问地址为：http://%s:%s", host, port);
});
