import React, { useContext } from 'react';
import { Route, Switch, useParams, useRouteMatch } from 'react-router';
import { AppContext } from '../../stores/Store';
import { UserViewContext } from '../../stores/UserViewStore';
import { auth, db } from '../../utils/Firebase';
import UserEditPage from './UserEditPage';
import UserPage from './UserPage';
import './UserPage.css';

function UserPageContainer() {
  const [state, updateState] = useContext(AppContext);

  const { path } = useRouteMatch();
  let params = useParams();

  if (state.userId !== params.userId) {
    
    var userId = params.userId;

    db.collection('users').doc(userId).get().then((doc) => {

      updateState({
        type: "UPDATE_USER_INFO", 
        payload: { 
          userId: userId,
          username: doc.data().username,
          steam: doc.data().steam,
          discord: doc.data().discord,
          twitch: doc.data().twitch,
          youtube: doc.data().youtube,
          dateCreated: doc.data().dateCreated,
          dateModified: doc.data().dateModified
        }
      });
      
      db.collection('builds').where("userId", "==", userId).where('isDeleted', '==', false).orderBy('dateModified', 'desc').limit(10).get().then((querySnapshot) => {
        var userBuilds = [];
        querySnapshot.forEach((build) => {
          userBuilds.push({ id: build.id, data: build.data()});
        });

        updateState({
          type: "UPDATE_USER_BUILDS", 
          payload: {
            builds: userBuilds,
            lastDoc: querySnapshot.docs[querySnapshot.docs.length-1],
            currentPage: 1,
            totalPages: Math.round(querySnapshot.size / 10) + 1
          }
        }); 
      });

      if (auth.currentUser && auth.currentUser.uid === userId) {
        // Load additional build list for liked builds

        db.collection('builds').where("likes", "array-contains", userId).where('isDeleted', '==', false).orderBy('dateModified', 'desc').limit(10).get().then((querySnapshot) => {
          var likedBuilds = [];
          querySnapshot.forEach((build) => {
            likedBuilds.push({ id: build.id, data: build.data()});
          });

          updateState({
            type: "UPDATE_LIKED_BUILDS", 
            payload: {
              builds: likedBuilds,
              lastDoc: querySnapshot.docs[querySnapshot.docs.length-1],
              currentPage: 1,
              totalPages: Math.round(querySnapshot.size / 10) + 1
            }
          }); 
        });
      }
    });

    return (<span>Loading content...</span>);
  }

    //console.log('params uid: ' + state.userId);

    return (
      <Switch>
        <Route path={`${path}/view`}>
          <UserPage userId={state.userId}></UserPage>
        </Route>
        <Route path={`${path}/edit`}>
          <UserEditPage></UserEditPage>
        </Route>
      </Switch>
    );
  }

export default UserPageContainer;