// 实现与MySql交互
var mysql = require('mysql');
var util = require('../util/util');
var $conf = require('../conf/db');
var $sql = require('./musicSqlMapping');

// 使用链接池，提升性能
var pool = mysql.createPool($conf.mysql);

module.exports = {
    getList: function (req, res) {
        pool.getConnection(function (err, connection) {
            if (err) console.log("POOL ===> " + err);
            var param = req.query || req.params;
            // 建立链接，向表中插入值
            connection.query($sql.select10rows, param.data, function (err, rows) {
                if (err) console.log(err);

                // 以json形式，把操作结果返回给前台
                util.jsonWrite(res, rows);
                connection.release();
            });
        });
    },
    getInfo: function (req, res) {
        pool.getConnection(function (err, connection) {
            if (err) console.log("POOL ===> " + err);
            var param = req.query || req.params;
            if (param.id) {
                connection.query($sql.selectById, param.id, function (err, rows) {
                    if (err) console.log(err);
                    util.jsonWrite(res, rows);
                    connection.release();
                });
            } else {
                connection.query($sql.selectBySrc, param.src, function (err, rows) {
                    if (err) console.log(err);
                    util.jsonWrite(res, rows);
                    connection.release();
                });
            }

        })
    },
    getLrc: function (req, res) {
        pool.getConnection(function (err, connection) {
            if (err) console.log("POOL ===> " + err);
            var param = req.query || req.params;
            connection.query($sql.selectLrc, param.id, function (err, rows) {
                if (err) console.log(err);
                util.jsonWrite(res, rows);
                connection.release();
            });
        })
    },
    getComment: function (req, res) {
        pool.getConnection(function (err, connection) {
            if (err) console.log("POOL ===> " + err);
            var param = req.query || req.params;
            connection.query($sql.selectComm, param.id, function (err, rows) {
                if (err) console.log(err);
                util.jsonWrite(res, rows);
                connection.release();
            });
        });
    },
    search: function (req, res) {
        pool.getConnection(function (err, connection) {
            if (err) console.log("POOL ===>" + err);
            var param = req.query || req.params,
                content = '%' + param.content + '%';
            connection.query($sql.selectLikeByName, [content, content], function (err, rows) {
                if (err) console.log(err);
                util.jsonWrite(res, rows);
                connection.release();
            })
        })
    }
};
