/**
 * Created by zenaro on 16-6-14.
 */
// 向前台返回JSON方法的简单封装
var util = {
    jsonWrite: function (res, ret) {
        if (typeof ret === 'undefined') {
            res.json({
                code: '1',
                msg: '操作失败'
            });
        } else {
            res.json(ret);
        }
    }
};
module.exports = util;