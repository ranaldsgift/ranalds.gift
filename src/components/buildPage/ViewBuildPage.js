import React, {useContext} from 'react';
import HeroTalents from '../heroTalents/HeroTalents'
import BuildList from '../buildList/BuildList'
import Inventory from '../inventory/Inventory'
import './ViewBuildPage.css';
import HeroDetails from '../heroDetails/HeroDetails';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import BuildOptions from './BuildOptions';
import BuildSummary from './BuildSummary';
import { AppContext } from '../../stores/Store';
import { useParams } from 'react-router';
import { db } from '../../utils/Firebase';
import { UserContext } from '../../stores/UserStore';
import { Link } from 'react-router-dom';
import BuildInformation from './BuildInformation';

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

        console.log(!userState.userId);

/*         if (!userState.userId || userState.userId == '') {
            console.log('props.userId');
            return <div className="error-message">Error loading build for edit</div>;
        }  */
    
        console.log('params build id: ' + params.buildId);
        //console.log(PatchList[0]);

        var root = document.getElementById('root');
        root.dataset.pageName = 'viewBuildPage';

        if (params.buildId && state.buildId !== params.buildId) {
            loadBuild(params.buildId);
        }

        function loadBuild(buildId) {
            console.log('loading build id ' + buildId);
            if (state.buildId !== buildId) {
                state.buildId = buildId;
            }

            db.collection('builds').doc(buildId).get().then((build) => {
                if (!build.data()) {
                    console.log('No build found with ID ' + buildId);
                    return;
                }

                console.log('build loaded from db:');
                console.log(build.data());

                updateState({
                    type: 'INIT_STATE_FROM_DATA', 
                    payload: build
                });

                // TODO: Get similar builds and builds from the user for side bar display
                db.collection('builds').where("careerId", "==", build.data().careerId).get().then((querySnapshot) => {
                    var similarBuilds = [];
                    querySnapshot.forEach((build) => {
                        if (build.id === buildId) {
                            return;
                        }
                        similarBuilds.push({ id: build.id, data: build.data()});
                    });

                    console.log('updating similar builds:');
                    console.log(similarBuilds);
                    updateState({
                      type: "UPDATE_SIMILAR_BUILDS", 
                      payload: similarBuilds
                    }); 
                  });


            }).catch((error) => {
                console.error('Error retrieving data from DB:', error);
            });

        }

        //get build id param
        //if empty, load nothing from DB
        //if not empty, load build from DB and updatestate

        //saving builds with /create/ url saves new db item and redirects to /buildId/edit page
        //saving builds with /edit/ url just updates the record in the db

        if (!state.isFromDb) {
            return (
                <div className="edit-build-page" data-readonly={state.readonly} data-dirty={state.dirty}>
                    <p>No build found</p>
                </div>);
        }

        console.log('build user id: ' + state.userId + ' user context id ' + userState.userId);
        let isAuthor = state.userId === userState.userId;

        return (
            <div className="edit-build-page build-page" data-author={isAuthor} data-liked={state.isLiked}  data-readonly={state.readonly} data-dirty={state.dirty}>
                <span id="buildSaveIndicator" className="border-03 background-18">Build saved...</span>
                <div className="build-left-container">            
                    <BuildList builds={state.similarBuilds} name="Similar Builds"></BuildList>
                </div>
                <div className="build-main-container">
                    <Tabs>
                        <TabList>
                            <Tab>Summary</Tab>
                            <Tab>Videos</Tab>
                            <Tab>Combos</Tab>                        
                        </TabList>
                        <TabPanel className="build-summary-tab">
                            <div className="build-details-container">
                                <HeroDetails careerId={state.careerId}></HeroDetails>
                                <input type="text" className="build-name-input border-02 background-18" placeholder="Name your build" value={state.name} readOnly></input>
                                <Link to={`/build/${state.buildId}/edit`} className="edit-build-button">edit</Link>
                                <textarea className="input-build-description border-02 background-18" wrap="hard" placeholder="Describe your build" value={state.description} readOnly></textarea>
                                <BuildInformation></BuildInformation>
                                <BuildOptions></BuildOptions>
                            </div>
                            <BuildSummary></BuildSummary>
                        </TabPanel>
                        <TabPanel>
                            <div className="build-additional-info">
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="hero-abilities">
                            </div>                        
                        </TabPanel>
                    </Tabs>
                    <div className="build-talents-container">
                        <HeroTalents contextActionType="UPDATE_TALENTS" careerId={state.careerId} talents={state.talents}></HeroTalents>
                    </div>
                </div>
                <div className="build-right-container">
                    <Inventory></Inventory>
                </div>
            </div>
        );
    }

export default ViewBuildPage;