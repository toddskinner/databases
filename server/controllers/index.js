var models = require('../models');
var bluebird = require('bluebird');
var mysql = require('mysql');


var isInQuery1 = "SELECT id from ";
var isInQuery2 = " where name=";
var findHighestQuery = "SELECT MAX(id) from ";
var sqlmessages = "INSERT INTO messages (id, userid, roomid, content) VALUES ?";
var sqluser = "INSERT INTO users (id, name) VALUES ?";
var sqlroom = "INSERT INTO rooms (id, name) VALUES ?";

var findHighestID = function(table, connection, callback){
  connection.query(findHighestQuery + table, function(err, result) {
    if (err) throw err;
    else{
      callback(result);
    }
  });
}

var isInDatabase = function(table, name, connection, callback){
  connection.query(isInQuery1 + table + isInQuery2 + "'"+name+"'", function(err, result){
    if (err){
      console.log('failed');
    }
    else{
      callback(result);
    }

  })


}


module.exports = {
  messages: {
    get: function (req, res) {
      console.log('in classes/messages');
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      console.log('posting in classes/messages');

      var data = '';
      req.on('data', function(chunk){
        data+=chunk;
      });
      req.on('end', function(){
        data = JSON.parse(data);
        console.log(data.text);

        var msgValues = [
            [1, 1, 1, data.text],
        ];

        var userValues = [
            [1, data.username],
        ];

        var roomValues = [
            [1, data.roomname],
        ];

        dbConnection = mysql.createConnection({
          user: "root",
          password: "",
          database: "chat"
        });

        dbConnection.connect(function(err) {
          if (err) {
            console.error('error connecting: ' + err.stack);
            return;
          }
          console.log('connected as id ' + dbConnection.threadId);

        });

        dbConnection.query(sqlmessages, [msgValues], function(err, result) {
          if (err) throw err;
        });
        dbConnection.query(sqluser, [userValues], function(err, result) {
          if (err) throw err;
        });
        dbConnection.query(sqlroom, [roomValues], function(err, result) {
          if (err) throw err;
        });
        isInDatabase("users", "Steve", dbConnection, function(result){
          console.log(result);
        });

      dbConnection.end();

      });

    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {}
  }
};

