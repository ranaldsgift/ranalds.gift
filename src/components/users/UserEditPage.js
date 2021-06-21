import React, {Component, useContext} from 'react';
import { UserBusiness } from '../../business/UserBusiness';
import { AppContext } from '../../stores/Store';
import { UserContext } from '../../stores/UserStore';
import { UserViewContext } from '../../stores/UserViewStore';
import { auth, db } from '../../utils/Firebase';
import './UserEditPage.css';

function UserEditPage() {
  const [state, updateState] = useContext(AppContext);
  const [userAuthState] = useContext(UserContext);

  if (!auth.currentUser) {
    return (
        <div className="user-edit-page user-page background-20 border-02">
            <span>You must be logged in to edit your user account.</span>
        </div>
    );
  }

  if (auth.currentUser.uid !== state.userId) {
    return (
        <div className="user-edit-page user-page background-20 border-02">
            <span>You cannot edit a user account that is not your pwn.</span>
        </div>
    );
  }

  return (
      <div className="user-edit-page user-page background-20 border-02">
        <span id="saveIndicator" className="border-03 background-18">User saved...</span>
        <div className="user-info-container background-14 border-08">
          <span type="text">Username</span>
          <input className="text-box" type="text" value={state.username} onChange={handleUsernameChanged.bind(this)}></input>
          <span type="text">Steam Friend Code</span>
          <input className="text-box" type="text" value={state.steam} onChange={handleSteamChanged.bind(this)}></input>
          <span type="text">Discord Username</span>
          <input className="text-box" type="text" value={state.discord} onChange={handleDiscordChanged.bind(this)}></input>
          <span type="text">Twitch Username</span>
          <input className="text-box" type="text" value={state.twitch} onChange={handleTwitchChanged.bind(this)}></input>
          <span type="text">Youtube URL</span>
          <input className="text-box" type="text" value={state.youtube} onChange={handleYoutubeChanged.bind(this)}></input>
        </div>
        <button className="button-01" onClick={handleSaveChanges}>Save</button>
      </div>
  );

  function fixStats() {      
    let buildStatsRef = db.collection('stats').doc('builds');
    db.runTransaction(async (transaction) => {
        alert('fixing stats');
        var buildStats = await transaction.get(buildStatsRef);
        var buildStatsData = buildStats.data();

        var careers = [], charmProperties = [], charmTraits = [], necklaceProperties = [], necklaceTraits = [], trinketProperties = [], trinketTraits = [], weapons = [], weaponProperties = [], weaponTraits = [];

        buildStatsData.careers.forEach((career) => {
            var careerId = parseInt(career.id);
            var newCareer = careers.find((item) => {return item.id === parseInt(careerId);});

            if (newCareer) {
                newCareer.count += career.count;
            }
            else {
                careers.push({
                    id: careerId,
                    count: career.count
                });
            }
        });
        fixPropertyOrTraitsOrWeapon(buildStatsData.charmProperties, charmProperties);
        fixPropertyOrTraitsOrWeapon(buildStatsData.charmTraits, charmTraits);
        fixPropertyOrTraitsOrWeapon(buildStatsData.necklaceProperties, necklaceProperties);
        fixPropertyOrTraitsOrWeapon(buildStatsData.necklaceTraits, necklaceTraits);
        fixPropertyOrTraitsOrWeapon(buildStatsData.trinketProperties, trinketProperties);
        fixPropertyOrTraitsOrWeapon(buildStatsData.trinketTraits, trinketTraits);
        fixPropertyOrTraitsOrWeapon(buildStatsData.weapons, weapons);
        fixWeaponPropertyOrTraits(buildStatsData.weaponProperties, weaponProperties);
        fixWeaponPropertyOrTraits(buildStatsData.weaponTraits, weaponTraits);
        
        transaction.update(buildStatsRef, { careers: careers, 
                                            weapons: weapons,
                                            weaponProperties: weaponProperties,
                                            weaponTraits: weaponTraits,
                                            necklaceProperties: necklaceProperties,
                                            necklaceTraits: necklaceTraits,
                                            charmProperties: charmProperties,
                                            charmTraits: charmTraits,
                                            trinketProperties: trinketProperties,
                                            trinketTraits: trinketTraits });

    }).then(() => {
        console.log('Successfully fixed stats');

    });


  }
  function fixWeaponPropertyOrTraits(oldCollection, newCollection) {
    oldCollection.forEach((property) => {
        var careerId = parseInt(property.careerId);
        var propertyId = parseInt(property.id);
        var weaponId = parseInt(property.weaponId);
        var newProperty = newCollection.find((item) => {return item.id === propertyId && item.weaponId === weaponId && item.careerId === careerId;});

        if (newProperty) {
            newProperty.count += property.count;
        }
        else {
            newCollection.push({
                id: propertyId,
                careerId: careerId,
                weaponId: weaponId,
                count: property.count
            });
        }
    });

  }

  function fixPropertyOrTraitsOrWeapon(oldCollection, newCollection) {
    oldCollection.forEach((property) => {
        var careerId = parseInt(property.careerId);
        var propertyId = parseInt(property.id);
        var newProperty = newCollection.find((item) => {return item.id === propertyId && item.careerId === careerId;});

        if (newProperty) {
            newProperty.count += property.count;
        }
        else {
            newCollection.push({
                id: propertyId,
                careerId: careerId,
                count: property.count
            });
        }
    });

  }

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

  function handleYoutubeChanged(e) {
      updateState({
          type: "UPDATE_YOUTUBE", 
          payload: e.currentTarget.value
      });
  }

  function handleSaveChanges() {
    if(!auth.currentUser) {
        alert('You must be logged in to save changes to your user account.')
        return;
    }

    if (state.userId !== auth.currentUser.uid) {
        alert('You cannot edit an account that does not belong to you.')
        return;
    }

    UserBusiness.updateUser(auth.currentUser.uid, state.username, state.steam, state.discord, state.youtube, state.twitch);
    return;
  }
}

export default UserEditPage;