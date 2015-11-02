'use strict';

const React = require('react');
const ReactDOM = require('react-dom');

//View components
const AddUserFormView = require('./components/addUser');
const UserView = require('./components/user');

const App = React.createClass({
  render(){
    return(
      <div>
        <UserView/>
        <AddUserFormView/>
      </div>
    );
  }
});

//Render to DOM
ReactDOM.render(<App/>, document.getElementById('app'));
