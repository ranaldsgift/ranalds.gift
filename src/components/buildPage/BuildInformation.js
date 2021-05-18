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
        });
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
                            likes: likesList,
                            likeCount: newLikeCount,
                            isLikedByUser: false
                        }
                    });
                }).catch((error) => { 
                    console.error('Error liking build:', error); 
                });
            }
        });
    }

    render() {
        const [state, updateState] = this.context;

        auth.onAuthStateChanged((user) => {
            if (user !== null) {
                var userLikesBuild = state.likes ? state.likes.includes(user.uid) : false;
  
                if (state.isLiked !== userLikesBuild) {
                    updateState({
                        type: "UPDATE_USER_LIKE",
                        payload: userLikesBuild
                    });
                }
            }
  
        });

        return (<div className="build-information-container read-only-container border-02 background-18">
                    <div><span>Created by</span><Link to={'/user/' + state.userId + '/view'}>{state.username}</Link></div>
                    <div><span>Patch</span><span>{state.patch}</span></div>
                    <div class="build-like-container">
                        <span>{state.likeCount}</span>
                        <i class="material-icons like-icon" onClick={this.handleLikeBuild.bind(this)}>star_border</i>
                        <i class="material-icons unlike-icon" onClick={this.handleUnlikeBuild.bind(this)}>star</i>
                    </div>
                </div>);
    }
}

export default BuildInformation;