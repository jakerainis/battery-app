'use strict';

var $ = require('jquery');

function <%= constructor %> ($el) {
  this.$el = $el;
}

<%= constructor %>.prototype = {
  method: function() {}

};

module.exports = <%= constructor %>;
