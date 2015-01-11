var Sequelize = require('Sequelize');
var orm = new Sequelize('chat','root','');

var User = orm.define('User',{
  username: Sequelize.STRING
});

var Message = orm.define('Message',{
  text: Sequelize.STRING
});

var Room = orm.define('Room',{
  roomname: Sequelize.STRING
});

User.hasMany(Messages);
Messages.belongsTo(User);

Room.hasMany(Messages);
Messages.belongsTo(Room);

User.sync();
Message.sync();
Room.sync();

exports.User = User;
exports.Message = Message;
exports.Room = Room;
