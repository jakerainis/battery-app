'use strict';
var _ = require('underscore');
var io;
var battery;

var IO = {
  currentUsers: [],
  userChanged: function(data){
    _.each(IO.currentUsers, function(v, i) {
      if (v.id === data.id) {
        IO.currentUsers[i].battery[data.type] = data.value;
      }
    });
    IO.usersUpdated();
  },
  userJoined: function(data) {
    IO.currentUsers.push(data);
    IO.usersUpdated();
  },
  userQuit: function(data){
    _.each(IO.currentUsers, function(v, i) {
      if (v.id === data.id) {
        IO.currentUsers.splice(i, 1);
      }
    });
    IO.usersUpdated();
  },
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

  io.emit('playersUpdated', IO.currentUsers);
};
