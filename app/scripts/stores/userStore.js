'use strict';

var assign = require('object-assign');
var Dispatcher = require('../dispatcher');
var EventEmitter = require('events').EventEmitter;
var socket = io();

var USERS = [];


var userStore = assign({}, EventEmitter.prototype, {
    addChangeListener: function (callback) {
        this.on('change', callback);
    },
    removeChangeListener: function (callback) {
        this.off('change', callback);
    },
    getAll: function () {
        return USERS;
    }
});

userStore.dispatchToken = Dispatcher.register(function (payload) {
  // Dispatcher.waitFor([
  //   OtherStore.dispatchToken,
  //   AndAnotherStore.dispatchToken
  // ]);
  var actions = {
      addUser: function (payload) {
          USERS.push(payload.action);
          userStore.emit('change');
      }
  };

  actions[payload.action.type] && actions[payload.action.type](payload);

});

socket.on('usersUpdated', (data)=>{
  USERS = data;
  userStore.emit('change');
});

module.exports = userStore;
