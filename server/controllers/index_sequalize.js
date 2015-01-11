var models = require('../models');
var bluebird = require('bluebird');
var mysql = require('mysql');



// var findHighestID = function(table, connection, callback){
//   var args = Array.prototype.slice.call(arguments,3);

//   connection.query(findHighestQuery + table, function(err, result) {
//     if (err) {
//       console.log('failing in findHighestID');
//       throw err;
//     }else{
//       callback(result[0]['MAX(id)'], args);
//     }
//   });
// }

// var isInDatabase = function(table, name, connection, callback){
//   var args = Array.prototype.slice.call(arguments,4);

//   connection.query(isInQuery1 + table + isInQuery2 + "'"+name+"'", function(err, result){
//     if (err){
//       findHighestID(table, connection, callback);
//     }
//     else{
//       if(result.length>0){
//         callback(result[0].id, args);
//       } else{
//         findHighestID(table, connection, callback);
//       }
//     }
//   })
// }


module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get(function(results){
        module.exports.users.get();
        module.exports.rooms.get();
        res.json(results);
      });
      // console.log('in classes/messages');
    }, // a function which handles a get request for all messages
    post: function (req, res) {

      // console.log('posting in classes/messages');
      var data = '';
      req.on('data', function(chunk){
        data+=chunk;
      });
      req.on('end', function(){
        data = JSON.parse(data);

        var params = [ data.username, data.roomname, data.text];
        models.messages.post(params, function(results){
          module.exports.users.post(data);
          module.exports.rooms.post(data);
          res.json(results);
        })
      });

    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function () {
      models.users.get(function(results){
      });
    },
    post: function (data) {

        var params = [ data.username ];
        models.users.post(params, function(results){
        });
    }
  },

  rooms: {
    // Ditto as above
    get: function () {
      models.rooms.get(function(results){
      });
    },
    post: function (data) {
        var params = [ data.roomname ];
        models.rooms.post(params, function(results){
        });
    }
  },


};

