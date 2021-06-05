import React, {Component, useContext} from 'react';
import { UserViewContext } from '../../stores/UserViewStore';
import './UserEditPage.css';

function UserEditPage() {
  const [state, updateState] = useContext(UserViewContext);

  return (
      <div className="user-edit-page user-page background-20 border-02">
        <div className="user-info-container background-14 border-08">
          <span type="text">Username</span>
          <input className="text-box" type="text" value={state.username} onChange={handleUsernameChanged.bind(this)}></input>
          <span type="text">Steam ID</span>
          <input className="text-box" type="text" value={state.steam} onChange={handleSteamChanged.bind(this)}></input>
          <span type="text">Twitch</span>
          <input className="text-box" type="text" value={state.twitch} onChange={handleTwitchChanged.bind(this)}></input>
          <span type="text">Discord</span>
          <input className="text-box" type="text" value={state.discord} onChange={handleDiscordChanged.bind(this)}></input>
        </div>
        <button className="button-01" onClick={handleSaveChanges}>Save</button>
      </div>
  );

  function handleUsernameChanged(e) {
      updateState({
          type: "UPDATE_USERNAME", 
          payload: e.currentTarget.value
      });
  }

  function handleSteamChanged(e) {
      updateState({
          type: "UPDATE_STEAM", 
          payload: e.currentTarget.value
      });
  }

  function handleTwitchChanged(e) {
      updateState({
          type: "UPDATE_TWITCH", 
          payload: e.currentTarget.value
      });
  }

  function handleDiscordChanged(e) {
      updateState({
          type: "UPDATE_DISCORD", 
          payload: e.currentTarget.value
      });
  }

  function handleSaveChanges() {
    alert('saving');
  }
}

export default UserEditPage;