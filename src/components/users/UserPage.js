import React, { useContext, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { UserContext } from '../../stores/UserStore';
import { auth, db } from '../../utils/Firebase';
import './UserPage.css';
import BuildsList from '../buildList/BuildsList';
import { AppContext } from '../../stores/Store';

function UserPage(props) {
    const [userState, updateUserState] = useContext(UserContext);
    const [state, updateState] = useContext(AppContext)

    document.title = `${state.username}'s Profile - Vermintide 2 | Ranalds.Gift`;
    
    //TODO show total amount of likes from all builds
    function renderUserDetail(detailName, detailValue, url) {
      var detailsHtml = [];
      if (detailValue.length > 0) { 
        if (url && url.length > 0) {
          detailsHtml.push(<span key='name' type="text">{detailName}</span>);
          detailsHtml.push(<span key='value' type="text"><a target="_blank" rel="noreferrer" href={url}>{detailValue}</a></span>);
          return detailsHtml;
        }
        detailsHtml.push(<span key='name' type="text">{detailName}</span>);
        detailsHtml.push(<span key='value' type="text">{detailValue}</span>);
        return detailsHtml;
      }

      return null;
    }

    return (
      <div className="user-page background-22 border-01 top-left-shadow" data-isauthor={state.userId === userState.userId}>
        <div className="user-info-container background-14 border-08">
            <span type="text">Username</span>
            <span type="text">{state.username}</span>
          {renderUserDetail("Steam Friend Code",state.steam)}
          {renderUserDetail("Discord",state.discord)}
          {renderUserDetail("Twitch",state.twitch, `https://twitch.tv/${state.twitch}`)}
          {renderUserDetail("Youtube",state.youtube, state.youtube)}
          {/* <span type="text">{new Date(state.dateCreated.seconds * 1000).toString().slice(0,10).replace(/-/g,"")}</span> */}          
        </div>
        <div className="button-container background-34 border-01">
          <Link to={`/user/${state.userId}/edit`} className="edit-user-button button-02">edit</Link>
        </div>
        <Tabs className="user-build-lists">
            <TabList className="container-tabs-list">
              <Tab>Builds Created</Tab>
              <Tab className="react-tabs__tab builds-liked-tab">Builds Liked</Tab>
            </TabList>
            <TabPanel className="hero-summary-tab">
              <BuildsList name={`${state.username}'s Builds`} user={{id: state.userId, username: state.username}} 
                      sortBy={state.sortBy} 
                      careerId={state.careerId}
                      difficulty={state.difficulty}
                      mission={state.mission}
                      potion={state.potion}
                      book={state.book}
                      roles={state.roles}
                      twitchMode={state.twitchMode}
                      collapseFilters={state.collapseFilters}></BuildsList>
            </TabPanel>
            <TabPanel>
              { auth.currentUser && auth.currentUser.uid === state.userId ?
              <BuildsList name={`Builds Liked`} likedBy={{id: state.userId, username: state.username}}
                      sortBy={state.sortBy} 
                      careerId={state.careerId}
                      difficulty={state.difficulty}
                      mission={state.mission}
                      potion={state.potion}
                      book={state.book}
                      roles={state.roles}
                      twitchMode={state.twitchMode}
                      collapseFilters={state.collapseFilters}></BuildsList>
                      : <span className="border-01 left-shadow background-11" style={{ display: 'grid', padding: '10px' }}>Ranald stops smiling and flips you the finger.</span>
              }
            </TabPanel>
        </Tabs>
      </div>
    );
  }

export default UserPage;