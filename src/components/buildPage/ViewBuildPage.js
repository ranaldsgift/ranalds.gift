import React, {useContext} from 'react';
import HeroTalents from '../heroTalents/HeroTalents'
import BuildsList from '../buildList/BuildsList'
import './ViewBuildPage.css';
import HeroDetails from '../heroDetails/HeroDetails';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import BuildOptions from './BuildOptions';
import BuildSummary from './BuildSummary';
import { AppContext } from '../../stores/Store';
import { useParams } from 'react-router';
import { db, firebase } from '../../utils/Firebase';
import { UserContext } from '../../stores/UserStore';
import BuildHeader from './BuildHeader';
import BuildGuide from './BuildGuide';
import { DataHelper } from '../../utils/DataHelper';

function ViewBuildPage() {

        const [state, updateState] = useContext(AppContext);
        const [userState, updateUserState] = useContext(UserContext);

        if (!state.readonly) {
            updateState({
                type: "UPDATE_READONLY", 
                payload: true
            });
        }

        let params = useParams();

        if (params.buildId && state.buildId !== params.buildId) {
            loadBuild(params.buildId);
            return (<span>Loading build...</span>);
        }

        var career = DataHelper.getCareer(state.careerId);
        document.title = `${state.name} - ${career.name} ${career.heroName} Build - Vermintide 2 | ranalds.gift`;

        function loadBuild(buildId) {
            console.log('Loading build ID ' + buildId);

            db.collection('builds').doc(buildId).get().then((build) => {
                if (!build.data()) {
                    console.log('No build found with ID ' + buildId);
                    return;
                }

                updateState({
                    type: 'INIT_STATE_FROM_DATA', 
                    payload: build
                });


            }).catch((error) => {
                console.error('Error retrieving data from DB:', error);
            });

        }

        if (!state.isFromDb) {
            return (
                <div className="edit-build-page" data-readonly={state.readonly} data-dirty={state.dirty}>
                    <p>No build found</p>
                </div>);
        }

        let isAuthor = state.userId === userState.userId;
        let isLiked = userState.likedBuilds ? userState.likedBuilds.includes(state.buildId) : false;
        var career = DataHelper.getCareer(state.careerId);

        return (
            <div className="view-build-page build-page" data-author={isAuthor} data-liked={isLiked}  data-readonly={state.readonly} data-dirty={state.dirty}>
                <span id="buildSaveIndicator" className="border-03 background-18">Build saved...</span>
                <div className="build-left-container top-left-shadow">         
                
                <BuildsList name={`More ${career.name} Builds`}
                        careerId={state.careerId}
                        hideFilters={true}
                        hidePages={true}
                        pageLimit={3}
                        filters={[{ field: 'userId', comparison: '!=', value: state.userId }]}
                        builds={state.similarBuilds}
                        firstBuildDoc={state.firstBuildDocSimilarBuilds}
                        lastBuildDoc={state.lastBuildDocSimilarBuilds}
                        currentPage={state.currentPageSimilarBuilds}
                        isLastPage={state.isLastPageSimilarBuilds}
                        isLoadingData={state.isLoadingDataSimilarBuilds}
                        isDataLoaded={state.isDataLoadedSimilarBuilds}
                        updateCommand={'UPDATE_SIMILAR_CAREER_BUILDS_DATA'}></BuildsList>   
                <BuildsList name={`Similar Builds by ${state.username}`} 
                        careerId={state.careerId}
                        user={{id: state.userId, username: state.username}}
                        hideFilters={true}
                        hidePages={true}
                        pageLimit={3}
                        filters={[{ field: firebase.firestore.FieldPath.documentId(), comparison: '!=', value: state.buildId }]}
                        builds={state.userBuilds}
                        firstBuildDoc={state.firstBuildDocUserBuilds}
                        lastBuildDoc={state.lastBuildDocUserBuilds}
                        currentPage={state.currentPageUserBuilds}
                        isLastPage={state.isLastPageUserBuilds}
                        isLoadingData={state.isLoadingDataUserBuilds}
                        isDataLoaded={state.isDataLoadedUserBuilds}
                        updateCommand={'UPDATE_SIMILAR_USER_BUILDS_DATA'}></BuildsList>
                </div>
                <div className="build-main-container">
                    <Tabs>
                        <TabList>
                            <Tab>Summary</Tab>                
                        </TabList>
                        <TabPanel className="build-summary-tab">
                            <div className="build-main-summary-container">
                                <BuildHeader></BuildHeader>
                                <HeroDetails careerId={state.careerId}></HeroDetails>
                                <BuildSummary></BuildSummary>
                                <BuildOptions hideEmpty={true}></BuildOptions>
                                <BuildGuide description={state.description}></BuildGuide>
                            </div>
                        </TabPanel>
                    </Tabs>
                            <div className="build-talents-container">
                                <HeroTalents contextActionType="UPDATE_TALENTS" readonly={true} careerId={state.careerId} talents={state.talents}></HeroTalents>
                            </div>
                </div>
            </div>
        );
    }

export default ViewBuildPage;