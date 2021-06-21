import React, { useContext } from "react";
import './BuildRating.css';
import { AppContext } from "../../stores/Store";
import { UserContext } from "../../stores/UserStore";
import { auth, db, firebase } from "../../utils/Firebase";

function BuildRating(props) {

    const [state, updateState] = useContext(AppContext);
    const [userState, updateUserState] = useContext(UserContext);

    function handleLikeBuild(e) {
        if (!auth.currentUser) {
            console.log('Login to like a build.');
            return;
        }

        var author = e.target.dataset.author;

        if (auth.currentUser.uid === author) {
            console.log('You cannot rate your own build');
            return;
        }

        var buildId = e.target.dataset.buildid;

        var userRef = db.collection('users').doc(auth.currentUser.uid);
        var buildRef = db.collection('builds').doc(buildId);
        var buildAuthorRef = db.collection('users').doc(author);

        db.runTransaction(async transaction => {

            var user = await transaction.get(userRef);
            var build = await transaction.get(buildRef);

            if (!build.exists || !user.exists) {
                return;
            }

            var buildData = build.data();
            var userData = user.data();

            if (userData.likedBuilds && userData.likedBuilds.includes(build.id)) {
                // User already likes the build
                return;
            }

            var likedBuilds = userData.likedBuilds ? userData.likedBuilds : [];
            likedBuilds.push(build.id);
            transaction.set(userRef, { likedBuilds: likedBuilds }, {merge: true});

            var newLikes = buildData.likes;
            if (!newLikes) {
                newLikes = [];
            }
            if (!newLikes.includes(user.id)) {
                newLikes.push(user.id);
            }
            
            transaction.set(buildRef, { likeCount: firebase.firestore.FieldValue.increment(1), likes: newLikes }, {merge: true});
            transaction.set(buildAuthorRef, {userRating: firebase.firestore.FieldValue.increment(1)}, {merge: true});
        }).then(() => {

            console.log('Successfully liked build'); 

            updateUserState({
                type: "ADD_LIKED_BUILD", 
                payload: buildId
            });

            updateState({
                type: "UPDATE_LIKES", 
                payload: {
                    likeCount: state.likeCount + 1,
                    isLikedByUser: true
                }
            });
        }).catch((error) => {
            console.error("Error updating document: ", error);
        });
    }

    function handleUnlikeBuild(e) {
        if (!auth.currentUser) {
            console.log('Login to like a build.');
            return;
        }

        var author = e.target.dataset.author;

        if (auth.currentUser.uid === author) {
            console.log('You cannot rate your own build');
            return;
        }

        var buildId = e.target.dataset.buildid;
        

        var userRef = db.collection('users').doc(auth.currentUser.uid);
        var buildRef = db.collection('builds').doc(buildId);
        var buildAuthorRef = db.collection('users').doc(author);

        db.runTransaction(async transaction => {

            var user = await transaction.get(userRef);
            var build = await transaction.get(buildRef);

            if (!build.exists || !user.exists) {
                return;
            }

            var buildData = build.data();
            var userData = user.data();

            if (!userData.likedBuilds || !userData.likedBuilds.includes(build.id)) {
                // User doesn't like the build
                return;
            }

            var likedBuilds = userData.likedBuilds;
            likedBuilds.splice(likedBuilds.indexOf(build.id), 1);
            transaction.set(userRef, { likedBuilds: likedBuilds }, {merge: true});

            var newLikes = buildData.likes;
            if (!newLikes) {
                newLikes = [];
            }
            if (newLikes.includes(user.id)) {
                newLikes.splice(newLikes.indexOf(user.id));
            }
            transaction.set(buildRef, { likeCount: firebase.firestore.FieldValue.increment(-1), likes: newLikes }, {merge: true});
            transaction.set(buildAuthorRef, {userRating: firebase.firestore.FieldValue.increment(-1)}, {merge: true});
        }).then(() => {

            console.log('Successfully unliked build'); 

            updateUserState({
                type: "REMOVE_LIKED_BUILD", 
                payload: buildId
            });

            updateState({
                type: "UPDATE_LIKES", 
                payload: {
                    likeCount: state.likeCount - 1,
                    isLikedByUser: false
                }
            });
        }).catch((error) => {
            console.error("Error updating document: ", error);
        });
    }

    return (
          <div className="rating">            
            <span className="rating-count" title="Number of ratings">{props.likeCount}</span>
            <div className="rating-icon" title="Rating" data-author={props.author} data-buildid={props.buildId} onClick={handleLikeBuild.bind(this)}></div>
            <div className="rated-icon" title="Rating" data-author={props.author} data-buildid={props.buildId} onClick={handleUnlikeBuild.bind(this)}></div>
          </div>);
}

export default BuildRating;