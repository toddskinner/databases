var db = require('../db');

// var isInQuery1 = "SELECT id from ";
// var isInQuery2 = " where name=";
// var findHighestQuery = "SELECT MAX(id) from ";
// var sqlmessages = "INSERT INTO messages (content) VALUES ?";
// var sqluser = "INSERT IGNORE INTO users (name) VALUES ?";
// var sqlroom = "INSERT IGNO  RE INTO rooms (name) VALUES ?";



// dbConnection.query(sqlmessages, [msgValues], function(err, result) {
//   if (err) throw err;
// });
// dbConnection.query(sqluser, [userValues], function(err, result) {
//   if (err) throw err;
// });
// dbConnection.query(sqlroom, [roomValues], function(err, result) {
//   if (err) throw err;
// });

// var msgValues = [
//     [data.text],
// ];

// var userValues = [
//     [data.username],
// ];

// var roomValues = [
//     [data.roomname],
// ];

module.exports = {
  messages: {
    get: function (callback) {
      var queryStr= 'Select messages.id, messages.userid, messages.roomid, messages.content \
                     from messages \
                     left outer join users on (messages.userid=users.id)\
                     left outer join rooms on (messages.roomsid=rooms.id)';
      db.query(queryStr, function(err, results){
        if (err) throw err;
        callback(results);
      });
    },
    post: function (params, callback) {
      var queryStr = 'Insert into messages(userid, roomid, content) values \
                      ((select id from users where name = ?), (select id from \
                        rooms where name = ?), ?)';
      db.query(queryStr, params, function(err, results){
        if (err) throw err;
        callback(results);
      });
    }
  },

  users: {
    // Ditto as above.
    get: function (callback) {
      var queryStr = 'Select * from users';
      db.query(queryStr, function(err, results){
        if(err) throw err;
        callback(results);
      });
    },

    post: function (params, callback) {
      var queryStr = 'Insert ignore into users (name) values (?)';
      db.query(queryStr, params, function(err, results){
        if (err) throw err;
        callback(results);
      });
    }
  },

  rooms: {
    // Ditto as above.
    get: function (callback) {
      var queryStr = 'Select * from rooms';
      db.query(queryStr, function(err, results){
        if(err) throw err;
        callback(results);
      });
    },

    post: function (params, callback) {
      var queryStr = 'Insert ignore into rooms (name) values (?)';
      db.query(queryStr, params, function(err, results){
        if (err) throw err;
        callback(results);
      });
    }
  }
};

