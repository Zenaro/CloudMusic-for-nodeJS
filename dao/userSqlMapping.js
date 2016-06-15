/**
 * Created by zenaro on 16-6-13.
 */
// CRUD SQL语句
module.exports = {
    addUser: 'INSERT INTO app_User (email, pwd, regDate, root) VALUES (?, ?, ?, ?)',
    addInfo: "INSERT INTO app_Info (user_id, name, image)VALUES (?, ?, ?)",
    checkLogin: 'SELECT email, pwd, id FROM app_User WHERE email=? and pwd=?',
    getInfo: 'SELECT name, image FROM app_Info WHERE user_id=?',
    checkMusicCol: 'SELECT id FROM app_collection WHERE user_id=? and music_id=?',
    addMusicCol: 'INSERT INTO app_collection (user_id, music_id, colDate) VALUES (?, ?, ?)',
    delMusic: 'DELETE FROM app_collection WHERE user_id=? AND music_id =?',
    queryMusicType: 'SELECT music_id FROM app_Class NATURAL JOIN app_musicRclass NATURAL JOIN app_Music WHERE class_name=? ORDER BY listeners DESC LIMIT 10',
    queryMyMusic: 'SELECT music_id, name, singer_name FROM app_collection NATURAL JOIN app_Music NATURAL JOIN app_singerRmusic NATURAL JOIN app_Singer WHERE user_id=? ORDER BY colDate DESC',
    getFriend: 'SELECT friend_id, name FROM app_friends, app_Info WHERE friend_id=app_Info.user_id AND app_friends.user_id=?',
    findFriend: 'SELECT user_id, friend_id FROM app_friends WHERE user_id=? AND friend_id=?',
    setFriend: 'INSERT INTO app_friends (user_id, friend_id) VALUES (?, ?)',
    setComment: 'INSERT INTO app_comment (user_id, music_id, content, time) VALUES(?, ?, ?, NOW())'
};