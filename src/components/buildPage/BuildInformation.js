import React, { Component, useContext } from "react"
import { Link } from "react-router-dom";
import { AppContext } from "../../stores/Store";
import { UserContext } from "../../stores/UserStore";
import { auth, db } from "../../utils/Firebase";

function BuildInformation() {

    const [state, updateState] = useContext(AppContext);
    const [userState, updateUserState] = useContext(UserContext);

    function handleLikeBuild() {
        if (!auth.currentUser) {
            console.log('Login to like a build.');
            return;
        }


        var userRef = db.collection('users').doc(auth.currentUser.uid);
        var buildRef = db.collection('builds').doc(state.buildId);

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

            var newLikeCount = buildData.likeCount + 1;
            var newLikes = buildData.likes;
            if (!newLikes) {
                newLikes = [];
            }
            if (!newLikes.includes(user.id)) {
                newLikes.push(user.id);
            }
            transaction.set(buildRef, { likeCount: newLikeCount, likes: newLikes }, {merge: true});
        }).then(() => {

            console.log('Successfully liked build'); 

            updateUserState({
                type: "ADD_LIKED_BUILD", 
                payload: state.buildId
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

/*         db.collection('builds').doc(state.buildId).get().then((build) => {
            if (!build.exists) {
                return;
            }

            if (!build.data().likes || !build.data().likes.includes(auth.currentUser.uid)) {
                var likesList = build.data().likes ? build.data().likes : [];
                var newLikeCount = build.data().likeCount + 1;
                likesList.push(auth.currentUser.uid);

                build.ref.update({
                    likes: likesList,
                    likeCount: newLikeCount
                }).then(() => {
                    console.log('Successfully liked build'); 

                    updateState({
                        type: "UPDATE_LIKES", 
                        payload: {
                            likes: likesList,
                            likeCount: newLikeCount,
                            isLikedByUser: true
                        }
                    });
                }).catch((error) => { 
                    console.error('Error liking build:', error); 
                });
            }
        }); */
    }

    function handleUnlikeBuild() {
        if (!auth.currentUser) {
            console.log('Login to like a build.');
            return;
        }


        var userRef = db.collection('users').doc(auth.currentUser.uid);
        var buildRef = db.collection('builds').doc(state.buildId);

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

            var newLikeCount = buildData.likeCount - 1;
            var newLikes = buildData.likes;
            if (!newLikes) {
                newLikes = [];
            }
            if (newLikes.includes(user.id)) {
                newLikes.splice(newLikes.indexOf(user.id));
            }
            transaction.set(buildRef, { likeCount: newLikeCount, likes: newLikes }, {merge: true});
        }).then(() => {

            console.log('Successfully unliked build'); 

            updateUserState({
                type: "REMOVE_LIKED_BUILD", 
                payload: state.buildId
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
        
/*         db.collection('builds').doc(state.buildId).get().then((build) => {
            if (!build.exists) {
                return;
            }

            if (build.data().likes.includes(auth.currentUser.uid)) {
                var likesList = build.data().likes;
                var newLikeCount = build.data().likeCount - 1;
                likesList.pop(auth.currentUser.uid);
                
                build.ref.update({
                    likes: likesList,
                    likeCount: newLikeCount
                }).then(() => {
                    console.log('Successfully unliked build'); 

                    updateState({
                        type: "UPDATE_LIKES", 
                        payload: {
                            likeCount: newLikeCount,
                            isLikedByUser: false
                        }
                    });
                }).catch((error) => { 
                    console.error('Error liking build:', error); 
                });
            }
        }); */
    }

/*     render() {
        const [state, updateState] = this.context; */
/*         const userState = useContext(UserContext);

        auth.onAuthStateChanged((user) => {
            if (user !== null) {
                var userLikesBuild = state.likes ? state.likes.includes(user.uid) : false;
  
                if (state.isLiked !== this.state.isLikedByUser) {
                    updateState({
                        type: "UPDATE_USER_LIKE",
                        payload: userLikesBuild
                    });
                }
            }
  
        }); */

        return (<div className="build-information-container read-only-container border-02 background-18">
                    <div><span>Created by</span><Link to={'/user/' + state.userId + '/view'}>{state.username}</Link></div>
                    <div><span>Patch</span><span>{state.patch}</span></div>
                    <div className="build-like-container">
                        <span>{state.likeCount}</span>
                        <i className="material-icons like-icon" onClick={handleLikeBuild.bind(this)}>star_border</i>
                        <i className="material-icons unlike-icon" onClick={handleUnlikeBuild.bind(this)}>star</i>
                    </div>
                </div>);
    }
//}

export default BuildInformation;