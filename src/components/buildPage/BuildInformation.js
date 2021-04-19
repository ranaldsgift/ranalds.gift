import React, { Component } from "react"
import { Link } from "react-router-dom";
import { AppContext } from "../../stores/Store";
import { auth, db } from "../../utils/Firebase";

class BuildInformation extends Component {
    static contextType = AppContext;
    
    constructor(props) {
      super(props);
    }

    handleLikeBuild() {
        const [state, updateState] = this.context;

        if (!auth.currentUser) {
            console.log('Login to like a build.');
            return;
        }

        db.collection('builds').doc(state.buildId).get().then((build) => {
            console.log('liking build');
            if (!build.exists) {
                return;
            }

            if (!build.data().likes.includes(auth.currentUser.uid)) {
                var likesList = build.data().likes;
                likesList.push(auth.currentUser.uid)
                build.ref.update({
                    likes: likesList
                }).then(() => {
                    console.log('Successfully liked build'); 

                    updateState({
                        type: "UPDATE_LIKE_STATE", 
                        payload: {
                            isLiked: true,
                            likes: likesList
                        }
                    });
                }).catch((error) => { 
                    console.error('Error liking build:', error); 
                });
            }
        });

        /* db.collection('buildLikes').where('userId', '==', auth.currentUser.uid).where('buildId', '==', state.buildId).get().then((querySnapshot) => {
            if (querySnapshot.size > 0) {
                console.log('Build like data found');
                console.log(querySnapshot.docs[0].data());
                var buildLikesDoc = querySnapshot.docs[0];
                buildLikesDoc.ref.update({
                    likes: true
                }).then(() => {
                    console.log('Successfully liked build'); 

                    updateState({
                        type: "UPDATE_LIKE_STATE", 
                        payload: true
                    });
                }).catch((error) => { 
                    console.error('Error liking build:', error); 
                });
            } else {
                db.collection('buildLikes').add({
                    userId: auth.currentUser.uid,
                    buildId: state.buildId,
                    likes: true
                }).then((buildLikeRef) => {
                    console.log('Successfully liked build');

                    updateState({
                        type: "UPDATE_LIKE_STATE", 
                        payload: true
                    });
                }).catch((error) => {
                    console.error('Error liking build:', error);
                })
            }
        }).catch((error) => {
            console.error('Error getting data from BuildLikes table:', error);
        }); */
    }

    handleUnlikeBuild() {
        const [state, updateState] = this.context;

        if (!auth.currentUser) {
            console.log('Login to like a build.');
            return;
        }
        
        db.collection('builds').doc(state.buildId).get().then((build) => {
            if (!build.exists) {
                return;
            }

            if (build.data().likes.includes(auth.currentUser.uid)) {
                var likesList = build.data().likes;
                likesList.pop(auth.currentUser.uid)
                build.ref.update({
                    likes: likesList
                }).then(() => {
                    console.log('Successfully unliked build'); 

                    updateState({
                        type: "UPDATE_LIKE_STATE", 
                        payload: {
                            isLiked: false,
                            likes: likesList
                        }
                    });
                }).catch((error) => { 
                    console.error('Error liking build:', error); 
                });
            }
        });

        /* db.collection('buildLikes').where('userId', '==', auth.currentUser.uid).where('buildId', '==', state.buildId).get().then((querySnapshot) => {
            if (querySnapshot.size > 0) {
                console.log('Build like data found');
                console.log(querySnapshot.docs[0].data());
                var buildLikesDoc = querySnapshot.docs[0];
                buildLikesDoc.ref.update({
                    likes: false
                }).then(() => {
                    console.log('Successfully unliked build'); 

                    updateState({
                        type: "UPDATE_LIKE_STATE", 
                        payload: false
                    });
                }).catch((error) => { 
                    console.error('Error liking build:', error); 
                });
            }
        }).catch((error) => {
            console.error('Error getting data from BuildLikes table:', error);
        }); */
    }

    render() {
        const [state, updateState] = this.context;

/*         db.collection('buildLikes').where('buildId', '==', state.buildId).where('likes', '==', true).get().then((querySnapshot) => {
            if (querySnapshot.size >= 0) {
                if (querySnapshot.size !== state.likes) {
                    updateState({
                        type: "UPDATE_LIKES", 
                        payload: querySnapshot.size
                    });
                }
            }
        }); */

        auth.onAuthStateChanged((user) => {
            if (user !== null) {
                var userLikesBuild = state.likes.includes(user.uid);
  
                if (state.isLiked !== userLikesBuild) {
                    updateState({
                        type: "UPDATE_LIKE_STATE",
                        payload: {
                            isLiked: userLikesBuild,
                            likes: state.likes
                        }
                    });
                }
            }
  
        });

        return (<div className="build-information-container read-only-container border-02 background-18">
                    <div><span>Created by</span><Link to={'/user/' + state.userId + '/view'}>{state.username}</Link></div>
                    <div><span>Patch</span><span>{state.patch}</span></div>
                    <div class="build-like-container">
                        <span>{state.likes.length}</span>
                        <i class="material-icons like-icon" onClick={this.handleLikeBuild.bind(this)}>star_border</i>
                        <i class="material-icons unlike-icon" onClick={this.handleUnlikeBuild.bind(this)}>star</i>
                    </div>
                </div>);
    }
}

export default BuildInformation;