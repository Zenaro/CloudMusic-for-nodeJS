/**
 * Created by zenaro on 16-6-13.
 */
// 实现与MySql交互
var mysql = require('mysql');
var util = require('../util/util');
var $conf = require('../conf/db');
var $sql = require('./userSqlMapping');

// 使用链接池，提升性能
var pool = mysql.createPool($conf.mysql);

module.exports = {
    checkLogin: function (req, res) {
        pool.getConnection(function (err, connection) {
            if (err) console.log("POOL ===> " + err);
            var param = req.query || req.params;
            connection.query($sql.checkLogin, [param.email, param.pwd], function (err, rows) {
                if (rows.length > 0) {
                    util.jsonWrite(res, rows);
                } else {
                    res.json({'err': '1'});
                }
                connection.release();
            });
        })
    },
    checkReg: function (req, res) {
        pool.getConnection(function (err, connection) {
            if (err) console.log("POOL ===> " + err);
            var param = req.query || req.params;
            var date = new Date();
            connection.query($sql.addUser, [param.email, param.pwd, date, 0], function (err, rows) {
                if (rows.affectedRows == 1) {
                    var temp = [rows.insertId, param.name, '/image/profile.jpg'];
                    connection.query($sql.addInfo, temp, function (e, r) {
                        if (r.affectedRows == 1) {
                            res.json({id: rows.insertId});
                        } else
                            util.jsonWrite(res);
                    });
                } else {
                    util.jsonWrite(res);
                }
                connection.release();
            });
        })
    },
    getInfo: function (req, res) {
        pool.getConnection(function (err, connection) {
            if (err) console.log("POOL ===> " + err);
            // 截取前台页面传过来的参数
            var param = req.query || req.params;
            // 建立链接，向表中插入值
            connection.query($sql.getInfo, param.id, function (err, rows) {
                if (err) console.log(err);
                util.jsonWrite(res, rows);  // 以json形式，把操作结果返回给前台
                connection.release();
            });
        });
    }
};
