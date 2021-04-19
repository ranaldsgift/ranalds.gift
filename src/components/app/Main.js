import React, {Component} from 'react';
import './App.css';
import '../../assets/css/Talents.css';
import '../../assets/css/Weapons.css';
import '../../assets/css/Icons.css';
import '../../assets/css/Heroes.css';
import '../../assets/css/Layouts.css';
import "react-tabs/style/react-tabs.css";
import { UserContext } from '../../stores/UserStore';
import App from './App';

class Main extends Component {

  render() {  

    return (
      <UserContext>
        <App/>
      </UserContext>
    )
  }
}

export default Main;
