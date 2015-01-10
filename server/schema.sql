CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  /* Describe your table here.*/
  id integer(3),
  userid integer(3),
  roomid integer(3),
  content varchar(250)
);

/* Create other tables and define schemas for them here! */
CREATE TABLE users (
  id integer(3), name varchar(30)
);

CREATE TABLE rooms (
  id integer(3), name varchar(50)
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

