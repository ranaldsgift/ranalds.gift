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
    });

    return (<span>Loading content...</span>);
  }

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