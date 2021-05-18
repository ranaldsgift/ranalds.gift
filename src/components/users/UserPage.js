import React, { useContext, useEffect, useRef } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { UserViewContext } from '../../stores/UserViewStore';
import { db } from '../../utils/Firebase';
import BuildList from '../buildList/BuildList';
import BuildListContainer from '../buildList/BuildListContainer';
import PagedBuildList from '../buildList/PagedBuildList';
import './UserPage.css';

function UserPage(props) {
  useTraceUpdate(props);
    const [state, updateState] = useContext(UserViewContext);

    //show user information from database
    //show list of builds: created by user, liked builds, team builds
    //show total amount of likes from all builds

    function userBuildsNextPage(e) {
      alert('next page');
      alert(`current page ${state.userBuildsCurrentPage} total pages ${state.userBuildsPageCount}`)

      if (state.userBuildsCurrentPage >= state.userBuildsPageCount) {
        alert('Current page is already last page');
        return; // Current page is already last page
      }

      db.collection('builds').where("userId", "==", state.userId).orderBy('dateModified').startAfter(state.userBuildsLastDoc).limit(10).get().then((querySnapshot) => {
        var userBuilds = [];
        querySnapshot.forEach((build) => {
          userBuilds.push({ id: build.id, data: build.data()});
        });

        var currentPage = state.userBuildsCurrentPage + 1;

        updateState({
          type: "UPDATE_USER_BUILDS", 
          payload: {
            builds: userBuilds,
            lastDoc: querySnapshot.docs[querySnapshot.docs.length-1],
            currentPage: state.userBuildsCurrentPage + 1,
            totalPages:  state.userBuildsPageCount
          }
        }); 
      });
    }
    function userBuildsPreviousPage(e) {
      alert('previous page');
    }
    function likedBuildsNextPage(e) {
      alert('liked next page');
    }
    function likedBuildsPreviousPage(e) {
      alert('liked previous page');
    }

    return (
      <div className="user-page background-20 border-02">
        <div className="user-info-container background-14 border-08">
          <span type="text">Username</span>
          <span type="text">{state.username}</span>
          <span type="text">Steam ID</span>
          <span type="text">{state.steam}</span>
          <span type="text">Twitch</span>
          <span type="text">{state.twitch}</span>
          <span type="text">Date Created</span>
          <span type="text">{new Date(state.dateCreated.seconds * 1000).toString().slice(0,10).replace(/-/g,"")}</span>
        </div>
{/*               <PagedBuildList></PagedBuildList>
              <BuildList builds={state.likedBuilds} handleNextPage={likedBuildsNextPage.bind(this)} handlePreviousPage={likedBuildsPreviousPage.bind(this)} handleFilterChange={''} filters={state.userFilters}></BuildList> */}
{/*               <BuildListContainer filters={state.userFilters}></BuildListContainer>
              <BuildListContainer filters={state.userFilters}></BuildListContainer> */}
        <Tabs className="user-build-lists">
            <TabList className="container-tabs-list">
              <Tab>My Builds</Tab>
              <Tab>Liked Builds</Tab>
            </TabList>
            <TabPanel className="hero-summary-tab">
              {/* <PagedBuildList></PagedBuildList> */}
              <BuildList name="My Builds" userId={state.userId} handleNextPage={userBuildsNextPage.bind(this)} handlePreviousPage={userBuildsPreviousPage.bind(this)} builds={state.userBuilds} filters={state.userFilters}></BuildList>
            </TabPanel>
            <TabPanel>              
              <BuildList name="Liked Builds" builds={state.likedBuilds} handleNextPage={likedBuildsNextPage.bind(this)} handlePreviousPage={likedBuildsPreviousPage.bind(this)} handleFilterChange={''} filters={state.userFilters}></BuildList>
            </TabPanel>
        </Tabs>
      </div>
    );
  }

  function useTraceUpdate(props) {
    const prev = useRef(props);
    useEffect(() => {
      const changedProps = Object.entries(props).reduce((ps, [k, v]) => {
        if (prev.current[k] !== v) {
          ps[k] = [prev.current[k], v];
        }
        return ps;
      }, {});
      if (Object.keys(changedProps).length > 0) {
        console.log('Changed props:', changedProps);
      }
      prev.current = props;
    });
  }

export default UserPage;