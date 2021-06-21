import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { auth, db } from '../../utils/Firebase';
import './LoginPage.css';
import { UserContext } from '../../stores/UserStore';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import history from '../../utils/History';
import { UserBusiness } from '../../business/UserBusiness';

class LoginPage extends Component {
  static contextType = UserContext;

  componentDidMount() {
    document.title = "Login | Ranalds.Gift";
  }

  render() {

    return (
        <div className="login-page">
          <Tabs className="container-tabs">
            <TabList className="container-tabs-list">
              <Tab>Login</Tab>
              <Tab>Register</Tab>
            </TabList>
            <TabPanel className="login-page-tab background-22">
              <form>
                <input type="text" id="loginEmail" className="border-03" placeholder="E-MAIL"></input>
                <input type="password" id="loginPassword" className="border-03" placeholder="PASSWORD"></input>
                <button id="loginButton" className="app-navigation-button button-01 border-04" onClick={this.loginUser.bind(this)}>Login</button>
              </form>
            </TabPanel>
            <TabPanel className="register-page-tab background-22">            
              <form>
                <input type="text" id="registerUsername" className="border-03" placeholder="USERNAME"></input>
                <input type="text" id="registerEmail" className="border-03" placeholder="E-MAIL"></input>
                <input type="password" id="registerPassword" className="border-03" placeholder="PASSWORD"></input>
                <input type="password" id="registerPasswordVerify" className="border-03" placeholder="VERIFY PASSWORD"></input>
                <button id="registerButton" className="app-navigation-button button-01 border-04" onClick={this.registerUser.bind(this)}>Register</button>
              </form>
            </TabPanel>
          </Tabs>
        </div>
    );
  }

  registerUser(e) {
    e.preventDefault();
    //alert('Registering user!');

    let username = document.getElementById('registerUsername').value;
		let email = document.getElementById('registerEmail').value;
		let password = document.getElementById('registerPassword').value;
		let passwordVerify = document.getElementById('registerPasswordVerify').value;

    UserBusiness.registerUser(username, email, password, passwordVerify);
    return;
  }

  loginUser(e) {

    e.preventDefault();

    var email = document.getElementById('loginEmail').value;
    var password = document.getElementById('loginPassword').value;

    auth.signInWithEmailAndPassword(email, password).then(function(userCredential) {
        setTimeout(() => { history.push(`/user/${userCredential.user.uid}/view`); }, 1000)
        //console.log(auth.currentUser.uid);
        return;
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        alert(`${errorCode} - ${errorMessage}`);
        return;
    });
  }
}

export default LoginPage;