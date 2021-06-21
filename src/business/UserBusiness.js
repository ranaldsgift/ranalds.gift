import { auth, db, firebase } from "../utils/Firebase";
import history from '../utils/History';


export class UserBusiness {
    static registerUser = (username, email, password, passwordVerify) => {
        var userStatsRef = db.collection('stats').doc('users');
        var registeredSuccessfully = false;

        db.runTransaction(async transaction => {

                    // Get user list, check if user is available and then register user
            
            if (password !== passwordVerify) {
                alert("Your passwords don't match");
                return;
            }
            
            if (!username || username.length < 3) {
                alert("Username must be at least 3 characters");
                return;
            }

            let userStats = await transaction.get(userStatsRef);

            if (this.isUsernameTaken(userStats, username)) {
                alert('The username is already taken.')
                return;
            }
            
            await auth.createUserWithEmailAndPassword(email, password).then(function(userCredential) {
                if (!userCredential) {
                    alert("Problem creating user account.");
                    return;
                }
                registeredSuccessfully = true;

                let dateCreated = new Date();

                var usernames = userStats.data().usernames;
                var userDocRef = db.collection('users').doc(userCredential.user.uid);

                transaction.set(userDocRef, {
                    username: username,
                    steam: '',
                    twitch: '',
                    discord: '',
                    youtube: '',
                    userRating: 0,
                    authoredBuildsCount: 0,
                    authoredBuilds: [],
                    likedBuilds: [],
                    roles: [],
                    dateCreated: dateCreated,
                    dateModified: dateCreated
                });

                usernames.push({id: userCredential.user.uid, username: username});

                transaction.update(userStatsRef, {
                    usernames: usernames,
                    count: firebase.firestore.FieldValue.increment(1)
                });
            });

        }).then(() => {              
            if (registeredSuccessfully) {
                alert('Thanks for creating a user account! You will now be redirected to your user page where you can edit your user details.');
                var user = auth.currentUser;
                setTimeout(() => { history.push(`/user/${user.uid}/view`); }, 500);
            }
        }).catch((error) => {
            console.error("Error updating document: ", error);
            alert(error);
        });
    }

    static isUsernameTaken = (userStats, username, userId) => {
        if (userId) {
            return userStats && userStats.data().usernames && userStats.data().usernames.some((user) => { return user.username === username && user.id !== userId; });
        }
        return userStats && userStats.data().usernames && userStats.data().usernames.some((user) => { return user.username === username; });
    }

    static updateUser = (userId, username, steam, discord, youtube, twitch) => {
        if (userId !== auth.currentUser.uid) {
            alert('You can only update your own user account');
        }

        var userDocRef = db.collection('users').doc(userId);
        var userStatsRef = db.collection('stats').doc('users');
        var updatedSuccessfully = false;

        db.runTransaction(async transaction => {
            // Get user list, check if user is available and then register user            
            if (!username || username.length < 3) {
                alert("Username must be at least 3 characters");
                return;
            }

            let userStats = await transaction.get(userStatsRef);
            let userDoc = await transaction.get(userDocRef);

            if (this.isUsernameTaken(userStats, username, userId)) {
                alert('The username is already taken.')
                return;
            }

            // Check if the username has changed and then update all user created builds to reflect new username
            // Update user stats data so that user id maps to new username
            if (userDoc && userDoc.data().username !== username) {
                
                await db.collection('builds').where("userId", "==", userId).get().then((querySnapshot) => {
                    if (querySnapshot.docs.length > 0) {
                        querySnapshot.docs.forEach((build) => {
                            transaction.update(build.ref, {
                                username: username
                            });
                        });
                    }
                });

                var usernames = userStats.data().usernames;
                var user = usernames.find((user) => { return user.id === userId; });
                if (user) {
                    user.username = username;
                }
                else {
                    usernames.push({id: userId, username: username});
    
                    transaction.update(userStatsRef, {
                        count: firebase.firestore.FieldValue.increment(1)
                    });
                }
    
                transaction.update(userStatsRef, {
                    usernames: usernames
                });

            }

            transaction.update(userDocRef, {
                username: username,
                steam: steam,
                twitch: twitch,
                discord: discord,
                youtube: youtube,
                dateModified: new Date()
            });

            updatedSuccessfully = true;

        }).then(() => {              
            if (updatedSuccessfully) {
                var saveIndicator = document.getElementById('saveIndicator');
                saveIndicator.classList.add('saved');
                setTimeout(() => { saveIndicator.classList.remove('saved'); }, 4000);
            }
        }).catch((error) => {
            console.error("Error updating document: ", error);
            alert(error);
        });
        
    }
}