'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var AddUserFormView = require('./components/addUser');
var UserView = require('./components/user');

var App = React.createClass({

  render(){

    return(
      <div>
        <UserView/>
        <AddUserFormView/>
      </div>
    );
  }
});

ReactDOM.render(<App/>, document.getElementById('app'));
