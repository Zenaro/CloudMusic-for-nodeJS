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
            connection.query($sql.checkLogin, [param.user, param.pwd], function (err, rows) {
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
                    var temp = [rows.insertId, param.name, '/images/poster/profile.jpg'];
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
    },
    colMusic: function (req, res) {
        pool.getConnection(function (err, connection) {
            if (err) console.log(err);
            var param = req.query || req.params;
            if (param.mid) {
                connection.query($sql.checkMusicCol, [param.uid, param.mid], function (err, rows) {
                    if (rows.length <= 0) {
                        connection.query($sql.addMusicCol, [param.uid, param.mid, new Date()], function (e, r) {
                            if (e) console.log(e);
                            res.json({'status': 'succ', 'info': '收藏成功'});
                        })
                    } else {
                        res.json({'status': 'err', 'info': '该歌曲已被收藏'});
                    }
                    connection.release();
                });
            } else {
                connection.query($sql.queryMusicType, param.type, function (error, rows) {
                    if (error) console.log(error);
                    for (var i in rows) {
                        connection.query($sql.checkMusicCol, [param.uid, rows[i].music_id], function (err, result) {
                            if (err) console.log(err);
                            if (result.length <= 0) {   // 不存在则插入
                                connection.query($sql.addMusicCol, [param.uid, rows[i].music_id, new Date()], function (e, r) {
                                    if (e) console.log(e);
                                });
                            }
                        });
                    }
                    res.json({'status': 'succ', 'info': '收藏成功'});
                    connection.release();
                });

            }

        })
    },
    delMusic: function (req, res) {
        pool.getConnection(function (err, connection) {
            if (err) console.log("POOL === > " + err);
            var param = req.query || req.params;
            connection.query($sql.delMusic, [param.uid, param.mid], function (err, rows) {
                if (err) console.log(err);
                if (rows.affectedRows == 1) {
                    res.json({'status': 'succ', 'info': '删除成功'});
                }
                connection.release();
            })
        })
    },
    getMusic: function (req, res) {
        pool.getConnection(function (err, connection) {
            if (err) console.log("POOL === > " + err);
            var param = req.query || req.params;
            connection.query($sql.queryMyMusic, param.id, function (err, rows) {
                if (err) console.log(err);
                util.jsonWrite(res,rows);
                connection.release();
            })
        })
    },
    getFriend: function (req, res) {
        pool.getConnection(function (err, connection) {
            if (err) console.log("POOL === > " + err);
            var param = req.query || req.params;
            connection.query($sql.getFriend, param.id, function (err, rows) {
                if (err) console.log(err);
                util.jsonWrite(res,rows);
                connection.release();
            })
        })
    },
    setFriend: function (req, res) {
        pool.getConnection(function (err, connection) {
            if (err) console.log("POOL === > " + err);
            var param = req.query || req.params;
            connection.query($sql.findFriend, [param.uid, param.fid], function (err, rows) {
                if (err) console.log(err);
                if (rows.length == 0) {
                    connection.query($sql.setFriend, [param.uid, param.fid], function (e, result) {
                        if (e) console.log(e);
                        res.json({'status': 'succ', 'info': '添加成功'});
                    });
                } else {
                    res.json({'status': 'err', 'info': '对方已是您的好友'});
                }
                connection.release();
            })
        })
    },
    setComment: function (req, res) {
        pool.getConnection(function (err, connection) {
            if (err) console.log("POOL === > " + err);
            var param = req.query || req.params;
            connection.query($sql.setComment, [param.uid, param.mid, param.com, new Date()], function (err, rows) {
                if (err) console.log(err);
                if (rows.affectedRows == 1) {
                    res.json({'status': 'succ', 'info': '发布成功'});
                } else {
                    res.json({'status': 'err', 'info': '提交失败，请稍后重试'});
                }
                connection.release();
            })
        })
    }
};
