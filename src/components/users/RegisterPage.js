import React, {Component} from 'react';
import { auth, db } from '../../utils/Firebase';
import './RegisterPage.css';

class RegisterPage extends Component {
  render() {
    var root = document.getElementById('root');
    root.dataset.pageName = 'registerPage';

    return (
        <div className="register-page">
          <form>
            <input type="text" id="registerUsername" className="border-03" placeholder="USERNAME"></input>
            <input type="text" id="registerEmail" className="border-03" placeholder="E-MAIL"></input>
            <input type="password" id="registerPassword" className="border-03" placeholder="PASSWORD"></input>
            <input type="password" id="registerPasswordVerify" className="border-03" placeholder="VERIFY PASSWORD"></input>
            <button id="registerButton" className="app-navigation-button button-01 border-04" onClick={this.registerUser.bind(this)}>Register</button>
          </form>
        </div>
    );
  }

  registerUser(e) {
    e.preventDefault();
    alert('Registering user!');

    let username = document.getElementById('registerUsername').value;
		let email = document.getElementById('registerEmail').value;
		let password = document.getElementById('registerPassword').value;
		let passwordVerify = document.getElementById('registerPasswordVerify').value;
		
		if (password !== passwordVerify) {
			alert("Passwords don't match");
			return;
		}
		
		if (!username || username.length < 3) {
			alert("Username must be at least 3 characters");
			return;
		}
		
		auth.createUserWithEmailAndPassword(email, password).then(function() {
			let user = auth.currentUser;
			
			if (!user) {
				alert("could not update user information");
				return;
			}

			user.updateProfile({
				displayName: username
			}).then(() => {
				console('updated profile display name');

				let dateCreated = new Date();
			
				db.collection('users').doc(user.uid).set({
					username: username,
					steam: '',
					twitch: '',
					dateCreated: dateCreated,
					dateModified: dateCreated
				}).then(() => {
					console.log("User updated successfully!");
					//setTimeout(() => { history.push('/home'); }, 2000)
				}).catch((error) => { 
					console.error("Error writing document: ", error)
				});

			}).catch((error) => {
				console.error("Error writing document: ", error)
			});

			

					
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

export default RegisterPage;