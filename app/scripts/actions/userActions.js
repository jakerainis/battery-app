'use strict';

var Dispatcher = require('../dispatcher');
var assign = require('object-assign');

var userActions = {
  addUser: (user)=>{
    var newUserObj = assign({type:'addUser'}, user);
    Dispatcher.handleViewAction(newUserObj);
  }
};

module.exports = userActions;
