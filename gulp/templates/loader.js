'use strict';

function loader($el) {
  <% if ( typeof(async) !== 'undefined' ){ %>
  require.ensure([], function(require) {
    <% } %>
    var Module = require('./<%= name %>.main');
    new Module($el);
    <% if ( typeof(async) !== 'undefined' ){ %>
  });
  <% } %>
}

module.exports = loader;
