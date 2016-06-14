/**
 * Created by zenaro on 16-6-13.
 */
// 实现与MySql交互
var mysql = require('mysql');
var $conf = require('../conf/db');
var $sql = require('./newsSqlMapping');

// 使用链接池，提升性能
var pool = mysql.createPool($conf.mysql);

// 向前台返回JSON方法的简单封装
var jsonWrite = function (res, ret) {
    if (typeof ret === 'undefined') {
        res.json({
            code: '1',
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};

module.exports = {
    add: function (req, res) {
        pool.getConnection(function (err, connection) {
            if (err) console.log("POOL ===> " + err);
            // 建立链接，向表中插入值
            connection.query($sql.queryAll, function (err, rows) {
                if (err) console.log(err);

                // 以json形式，把操作结果返回给前台
                jsonWrite(res, rows);
                connection.release();
            });
        });
    }
};
