'use strict';

const React = require('react');
const UserStore = require('../stores/userStore');

//Reusable function to get all users
const getAllUsers = ()=> {
    return {
      users: UserStore.getAll()
    };
};

const User = React.createClass({
  componentWillMount() {
      UserStore.addChangeListener(this.onStoreChange);
  },
  componentWillUnmount() {
      UserStore.removeChangeListener(this.onStoreChange);
  },
  getInitialState(){
    return getAllUsers();
  },
  onStoreChange() {
      this.setState(getAllUsers());
  },
  render(){
    var users = this.state.users.map((user)=>{
      var meterColor = '';
      var name = user.user;
      var timer = '';

      //Change Ryan's name
      if(/RYAN/.test(user.user.toUpperCase())){
        name = 'White Ryan';
      }
      if(/COATES/.test(user.user.toUpperCase())){
        name = 'White Ryan';
      }

      //Set appropriate meter color based on battery level
      if(user.battery.level * 100 >= 75){
        meterColor = 'green';
      } else if (user.battery.level * 100 < 75 && user.battery.level * 100 >= 50){
        meterColor = 'yellow';
      } else if (user.battery.level * 100 < 50 && user.battery.level * 100 >= 25){
        meterColor = 'orange';
      } else{
        meterColor = 'red';
      }

      //Display appropriate stats
      if(user.battery.charging){
        if(user.battery.chargingTime){
          timer = `~${user.battery.chargingTime/60} minutes until fully charged.`;
        }
      }else{
        if(user.battery.dischargingTime){
          timer = `~${user.battery.dischargingTime/60} minutes until battery dies.`;
        }
      }
      return (
        <li key={user.id} data-id={user.id}>
          <div className="meter-wrapper">
            <div className={`${meterColor}  meter-wrapper__bar`} style={{width: `${user.battery.level*100}%`}}></div>
            <div className="meter-wrapper__content">
              <h2>{name}: {user.battery.charging ? `Plugged In at ${user.battery.level*100}%` : `Unplugged At ${user.battery.level*100}%`}</h2>
              <p>{timer}</p>
            </div>
          </div>
        </li>
      );
    });
    return(
      <ul>
        {users}
      </ul>
    );
  }
});

module.exports = User;
