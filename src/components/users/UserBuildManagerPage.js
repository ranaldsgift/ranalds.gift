import React, { useContext } from 'react';
import { UserContext } from '../../stores/UserStore';
import { auth, db } from '../../utils/Firebase';
import './UserPage.css';
import { AppContext } from '../../stores/Store';
import { BuildBusiness } from '../../business/BuildBusiness';

function UserBuildManagerPage(props) {
    const [userState, updateUserState] = useContext(UserContext);
    const [state, updateState] = useContext(AppContext)
    //const [selectedBuilds, updateSelectedBuilds] = useState([]);

    document.title = `${state.username}'s Build Manager - Vermintide 2 | Ranalds.Gift`;

/*  TODO: Add functionality to pick specific builds for updating   

    useEffect(() => {
      console.log(document.querySelector('.build-list'));
      console.log(selectedBuilds);
      selectedBuilds.forEach((buildId) => {
        console.log(document.querySelector(`.build-list .build-list-item[data-build='${buildId}']`));


        if (document.querySelector(`.build-list .build-list-item[data-build='${buildId}']`)) {
          alert('found selected build');
          console.log(document.querySelector(`.build-list-item[data-build='${buildId}']`));
          document.querySelector(`.build-list-item[data-build='${buildId}']`).parentElement.classList.add('selected');
        }
      });

      document.querySelector('.user-builds-bulk-updater').onclick = function (e) {
        if ( e.target.className.toString().indexOf('build-list-item-container') >= 0 ) {
          var buildId = e.target.querySelector('.build-list-item').dataset.build;
          alert(buildId);

          var selectedBuildList = selectedBuilds;
          console.log(selectedBuildList);
          if (selectedBuildList && selectedBuildList.includes(buildId)) {
            selectedBuildList = selectedBuildList.filter((id) => id !== buildId) 
            e.target.classList.remove('selected');
          }
          else {
            selectedBuildList.push(buildId);
            e.target.classList.add('selected');            
          }

          updateSelectedBuilds(selectedBuildList);
          //updateSelectedBuilds(selectedBuildList && selectedBuildList.includes(buildId) ?  selectedBuildList.filter((id) => id !== buildId) : selectedBuildList.push(buildId));
        }
      };
    }); */

    function updateAllBuilds() {

      //TODO add a check so this can only be used once per patch by each user
          
        if (!auth.currentUser) {
            alert('Can\'t update builds when not authenticated.');
            return;
        }

        if (window.confirm('Are you sure you want to update ALL of your builds to the latest patch?')) {
            BuildBusiness.updateAllBuildsForUser(state.userId, updateAllBuildsCallback);
        }
    }

    function updateAllBuildsCallback() {
        alert('Your builds have been updated successfully!');
    }

    return (
      <div className="user-page background-22 border-01 top-left-shadow" data-isauthor={state.userId === userState.userId}>
        
        { auth.currentUser && auth.currentUser.uid === state.userId ?
          <span className="update-builds-button button-02" onClick={updateAllBuilds.bind(this)}>Update All Builds To Latest Patch</span> : '' }

{/*       TODO: Add additional functionality to pick specific builds for updating

          <Tabs className="user-builds-bulk-updater">
            <TabList className="container-tabs-list">
              <Tab>Builds Created</Tab>
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
                      collapseFilters={state.collapseFilters}
                      builds={state.userBuilds}
                      firstBuildDoc={state.firstBuildDocUserBuilds}
                      lastBuildDoc={state.lastBuildDocUserBuilds}
                      currentPage={state.currentPageUserBuilds}
                      isLastPage={state.isLastPageUserBuilds}
                      isLoadingData={state.isLoadingDataUserBuilds}
                      isDataLoaded={state.isDataLoadedUserBuilds}
                      updateCommand={'UPDATE_USER_BUILDS'}></BuildsList>
            </TabPanel>
        </Tabs> */}
      </div>
    );
  }

export default UserBuildManagerPage;