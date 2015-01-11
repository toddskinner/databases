CREATE DATABASE chat;

USE chat;

CREATE TABLE users (
  id int auto_increment primary key,
  name varchar(30) UNIQUE
);

CREATE TABLE rooms (
  id int auto_increment primary key,
  name varchar(50) UNIQUE
);

CREATE TABLE messages (
  /* Describe your table here.*/
  id int auto_increment primary key,
  userid int,
  roomid int,
  content varchar(250),

  Foreign Key (userid)
  References users(id),
  Foreign Key (roomid)
  References rooms(id)

);

/* Create other tables and define schemas for them here! */

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

