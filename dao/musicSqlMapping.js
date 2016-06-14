/**
 * Created by zenaro on 16-6-14.
 */
var music = {
    selectById: 'SELECT name, singer_name, src, music_id FROM app_singerRmusic NATURAL JOIN app_Music NATURAL JOIN app_Singer WHERE music_id=?',
    selectBySrc: 'SELECT name, singer_name, src, music_id FROM app_singerRmusic NATURAL JOIN app_Music NATURAL JOIN app_Singer WHERE src=?',
    select10rows: 'SELECT name, music_id, src FROM app_musicRclass NATURAL JOIN app_Music NATURAL JOIN app_Class WHERE class_id=? ORDER BY listeners DESC LIMIT 10',
    selectLikeByName: "SELECT name, music_id, singer_name, src FROM app_singerRmusic NATURAL JOIN app_Singer NATURAL JOIN app_Music where (name LIKE ?) OR (singer_name LIKE ?) ORDER BY name, singer_name DESC LIMIT 10",
    selectLrc: 'SELECT lyric FROM app_singerRmusic NATURAL JOIN app_Music NATURAL JOIN app_Singer WHERE music_id=?',
    selectComm: 'SELECT name, content, user_id FROM app_comment NATURAL JOIN app_Info WHERE music_id = ? ORDER BY time DESC'
};
module.exports = music;