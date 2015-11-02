/*global io*/
'use strict';

const assign = require('object-assign');
const Dispatcher = require('../dispatcher');
const EventEmitter = require('events').EventEmitter;
const socket = io();

//Persisting array of users
var USERS = [];

//User store methods
const userStore = assign({}, EventEmitter.prototype, {
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

//View actions and store dependencies would live here if we weren't using socket.io
// userStore.dispatchToken = Dispatcher.register((payload) => {
//   Dispatcher.waitFor([
//     OtherStore.dispatchToken,
//     AndAnotherStore.dispatchToken
//   ]);
//   var actions = {
//       addUser: function (payload) {
//           USERS.push(payload.action);
//           userStore.emit('change');
//       }
//   };
//   actions[payload.action.type] && actions[payload.action.type](payload);
// });

//Emit a change whenever users get updated
socket.on('usersUpdated', (data) => {
  USERS = data;
  userStore.emit('change');
});

module.exports = userStore;
