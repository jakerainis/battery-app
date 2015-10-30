'use strict';

var React = require('react');
var UserActions = require('../actions/userActions');
var socket = io();
var util = require('../util');
var assign = require('object-assign');


var AddUser = React.createClass({
  addListeners(){
    navigator.getBattery().then((battery) => {

      var guid = this.state.id
      battery.addEventListener('chargingchange', function() {
        socket.emit('userChanged', {
          id: guid,
          type: 'charging',
          value: battery.charging
        });
      });

      battery.addEventListener('levelchange', function() {
        socket.emit('userChanged', {
          id: guid,
          type: 'level',
          value: battery.level
        });
      });

      battery.addEventListener('chargingtimechange', function() {
        socket.emit('userChanged', {
          id: guid,
          type: 'chargingTime',
          value: battery.chargingTime
        });
      });

      battery.addEventListener('dischargingtimechange', function() {
        socket.emit('userChanged', {
          id: guid,
          type: 'dischargingTime',
          value: battery.dischargingTime
        });
      });
    });
    window.onunload = function() {
      socket.emit('userQuit', {
        id: guid
      });
    };
  },
  constructUser(batteryObj){
    let user = this.refs.user.value;
    let id = util.generateGUID();
    let battery = batteryObj;
    return {
      user, id, battery
    };
  },
  getInitialState(){
    return{
      user: '',
      id: '',
      battery: '',
      formVisible: 'visible'
    };
  },
  handleFormChange(){
    this.setState(this.constructUser(null));
  },
  handleSubmit(e){
    e.preventDefault();
    navigator.getBattery().then((battery) => {
      let promObj = {
        charging: battery.charging,
        chargingTime: Infinity,
        dischargingTime: battery.dischargingTime,
        level: battery.level
      }
      let user = this.constructUser(promObj);
      this.setState(user);
      socket.emit('userJoined', user);
      this.addListeners();
      this.setState({formVisible: 'hidden'});
    });
  },
  render(){
    return(
      <form className={this.state.formVisible} onSubmit={this.handleSubmit}>
        <input onChange={this.handleFormChange} ref="user" placeholder="Name" value={this.state.user} />
        <button onClick={this.handleSubmit} ref="submit">Submit</button>
      </form>
    );
  }
});

module.exports = AddUser;
