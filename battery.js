'use strict';

var _ = require('underscore');

//Easy aliasing
var io;
var battery;

var IO = {
  //Stored array of users
  currentUsers: [],

  //Update a user
  userChanged: function(data){
    _.each(IO.currentUsers, function(v, i) {
      if (v.id === data.id) {
        IO.currentUsers[i].battery[data.type] = data.value;
      }
    });
    IO.usersUpdated();
  },

  //Add a user
  userJoined: function(data){
    IO.currentUsers.push(data);
    IO.usersUpdated();
  },

  //Remove a user
  userQuit: function(data){
    _.each(IO.currentUsers, function(v, i) {
      if (v.id === data.id) {
        IO.currentUsers.splice(i, 1);
      }
    });
    IO.usersUpdated();
  },

  //Trigger an update
  usersUpdated: function() {
    io.emit('usersUpdated', IO.currentUsers);
  }
};

exports.init = function(sio, socket) {
  io = sio;
  battery = socket;

  battery.on('userChanged', IO.userChanged);
  battery.on('userJoined', IO.userJoined);
  battery.on('userQuit', IO.userQuit);

  //Kick it off with the current users
  io.emit('playersUpdated', IO.currentUsers);
};
