import React, { useContext } from 'react';
import { UserViewContext } from '../../stores/UserViewStore';
import BuildList from '../buildList/BuildList';
import './UserPage.css';

function UserPage() {
    const [state] = useContext(UserViewContext);

    //show user information from database
    //show list of builds: created by user, liked builds, team builds
    //show total amount of likes from all builds

    return (
      <div className="user-page">
        <div className="user-info-container">
          <span type="text">Username</span>
          <span type="text">{state.username}</span>
          <span type="text">Steam ID</span>
          <span type="text">{state.steam}</span>
          <span type="text">Twitch</span>
          <span type="text">{state.twitch}</span>
          <span type="text">Date Created</span>
          <span type="text">{new Date(state.dateCreated.seconds * 1000).toString().slice(0,10).replace(/-/g,"")}</span>
        </div>
        <div className="build-list-container">
          <BuildList userId={state.userId} builds={state.userBuilds}></BuildList>
          <BuildList builds={state.likedBuilds}></BuildList>
        </div>
      </div>
    );
  }

export default UserPage;