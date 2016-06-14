/**
 * Created by zenaro on 16-6-13.
 */
// CRUD SQL语句
module.exports = {
    addUser: 'INSERT INTO app_User (email, pwd, regDate, root) VALUES (?, ?, ?, ?)',
    addInfo: "INSERT INTO app_Info (user_id, name, image)VALUES (?, ?, ?)",
    checkLogin: 'SELECT email, pwd, id, root FROM app_User WHERE email=? and pwd=?',
    getInfo: 'SELECT name FROM app_Info WHERE user_id=?',
    checkMusicCol: 'SELECT id FROM app_collection WHERE user_id=? and music_id=?',
    addMusic: 'INSERT INTO app_collection (user_id, music_id, colDate) VALUES (?, ?, ?)',
    queryMyMusic: 'SELECT music_id, name, singer_name FROM app_collection NATURAL JOIN app_Music NATURAL JOIN app_singerRmusic NATURAL JOIN app_Singer WHERE user_id=? ORDER BY colDate DESC'
};