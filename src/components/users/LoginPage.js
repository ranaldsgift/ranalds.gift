import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../utils/Firebase';
import './LoginPage.css';
import { UserContext } from '../../stores/UserStore';

class LoginPage extends Component {
  static contextType = UserContext;

  render() {
    var root = document.getElementById('root');
    root.dataset.pageName = 'loginPage';

    return (
        <div className="login-page">
          <form>
            <input type="text" id="loginEmail" className="border-03" placeholder="E-MAIL"></input>
            <input type="password" id="loginPassword" className="border-03" placeholder="PASSWORD"></input>
            <button id="loginButton" className="app-navigation-button border-04" onClick={this.loginUser.bind(this)}>Login</button>
            <button className="app-navigation-button border-04" data-pagename="registerPage"><Link to="/register">Register</Link></button>
          </form>
        </div>
    );
  }

  loginUser(e) {

    e.preventDefault();
    alert('Logging in!');

    var email = document.getElementById('loginEmail').value;
    var password = document.getElementById('loginPassword').value;

    auth.signInWithEmailAndPassword(email, password).then(function() {
        alert('logged in!');
        console.log(auth.currentUser);
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