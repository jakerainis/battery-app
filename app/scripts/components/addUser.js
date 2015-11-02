'use strict';

const React = require('react');
const UserActions = require('../actions/userActions');
const socket = io();
const util = require('../util');
const assign = require('object-assign');
var guid = '';

//Unauthenticate a user. NOTE: Needs to live outside of virtual DOM.
window.onunload = () => {
  socket.emit('userQuit', {
    id: guid
  });
};

const AddUser = React.createClass({

  addListeners(){
    navigator.getBattery().then((battery) => {

      guid = this.state.id;

      battery.addEventListener('chargingchange', () => {
        socket.emit('userChanged', {
          id: guid,
          type: 'charging',
          value: battery.charging
        });
      });

      battery.addEventListener('levelchange', () => {
        socket.emit('userChanged', {
          id: guid,
          type: 'level',
          value: battery.level
        });
      });

      battery.addEventListener('chargingtimechange', () => {
        socket.emit('userChanged', {
          id: guid,
          type: 'chargingTime',
          value: battery.chargingTime
        });
      });

      battery.addEventListener('dischargingtimechange', () => {
        socket.emit('userChanged', {
          id: guid,
          type: 'dischargingTime',
          value: battery.dischargingTime
        });
      });
    });
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
    //Sets a temporary user state prior to submit
    this.setState(this.constructUser(null));
  },
  handleSubmit(e){
    e.preventDefault();
    //Get battery API
    navigator.getBattery().then((battery) => {

      //Set it to a synchronous object
      let promObj = {
        charging: battery.charging,
        chargingTime: Infinity,
        dischargingTime: battery.dischargingTime,
        level: battery.level
      };

      //Construct user with the object data
      let user = this.constructUser(promObj);

      //Update user's state
      this.setState(user);

      //Tell socket.io a new user joined
      socket.emit('userJoined', user);

      //Bind listeners to the user (get battery API ipdates)
      this.addListeners();

      //Hide the form
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
