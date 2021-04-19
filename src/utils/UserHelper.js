import { auth } from "./Firebase";
import history from './History'

export class UserHelper {
    static loginUser = (email, password) => {
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