import React, {useContext} from 'react';
import HeroTalents from '../heroTalents/HeroTalents'
import Inventory from '../inventory/Inventory'
import './EditBuildPage.css';
import HeroDetails from '../heroDetails/HeroDetails';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import BuildOptions from './BuildOptions';
import BuildSummary from './BuildSummary';
import { AppContext } from '../../stores/Store';
import HeroSelect from '../heroSelect/HeroSelect';
import { useParams, useRouteMatch } from 'react-router';
import { auth, db } from '../../utils/Firebase';
import * as Constants from '../../data/Constants';
import history from '../../utils/History';
import { UserContext } from '../../stores/UserStore';
import { Link } from 'react-router-dom';
import BuildInformation from './BuildInformation';

function EditBuildPage() {

        const [state, updateState] = useContext(AppContext);
        const userState = useContext(UserContext);

        const { path } = useRouteMatch();
        var paths = path.split('/');

        var currentPath = paths[paths.length-1];
        console.log('current path ' + currentPath);

        if (currentPath === 'edit') {
            if (state.readonly) {
                updateState({
                    type: "UPDATE_READONLY", 
                    payload: false
                });
            }
        } 
        else if (currentPath === 'view') {
            if (!state.readonly) {
                updateState({
                    type: "UPDATE_READONLY", 
                    payload: true
                });
            }
        }
        else if (currentPath === 'create') {
            if (!state.createBuild) {
                updateState({
                    type: "UPDATE_CREATE_BUILD_STATE",
                    payload: true
                });
            }
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
        root.dataset.pageName = 'editBuildPage';

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
                    //history.push('/build/create');

                    //update state to indicate no build available in DB
                    return;
                }

                console.log('build loaded from db:');
                console.log(build.data());

                updateState({
                    type: 'INIT_STATE_FROM_DATA', 
                    payload: build
                });
            }).catch((error) => {
                console.error('Error retrieving data from DB:', error);
            });

        }

        function handleDescriptionChanged(e) {
            updateState({
                type: "UPDATE_DESCRIPTION", 
                payload: e.currentTarget.value
            });
        }

        function handleNameChange(e) {
            updateState({
                type: "UPDATE_NAME", 
                payload: e.currentTarget.value
            });
        }

        function saveBuild() {
            if (!auth.currentUser) {
                alert('Can\'t save or create builds when not authenticated.');
                return;
            }

            if (!state.dirty) {
                console.log('Not saving build, no changes have been made.');
                return;
            }

            console.log('saving build to database build id ' + state.buildId + ' for user id ' + auth.currentUser.uid);

            if (state.buildId === 0) {
                //creating new build then forward to build edit page

                alert('creating new build');

                db.collection('builds').add({
                    careerId: state.careerId,
                    meleeId: state.meleeId,
                    meleeProperty1: state.properties[Constants.MELEE_PROPERTY1_INDEX],
                    meleeProperty2:state.properties[Constants.MELEE_PROPERTY2_INDEX],
                    meleeTrait: state.traits[Constants.MELEE_TRAIT_INDEX],
                    rangeId: state.rangeId,
                    rangeProperty1: state.properties[Constants.RANGE_PROPERTY1_INDEX],
                    rangeProperty2: state.properties[Constants.RANGE_PROPERTY2_INDEX],
                    rangeTrait: state.traits[Constants.RANGE_TRAIT_INDEX],
                    necklaceProperty1: state.properties[Constants.NECKLACE_PROPERTY1_INDEX],
                    necklaceProperty2: state.properties[Constants.NECKLACE_PROPERTY2_INDEX],
                    necklaceTrait: state.traits[Constants.NECKLACE_TRAIT_INDEX],
                    charmProperty1: state.properties[Constants.CHARM_PROPERTY1_INDEX],
                    charmProperty2: state.properties[Constants.CHARM_PROPERTY2_INDEX],
                    charmTrait: state.traits[Constants.CHARM_TRAIT_INDEX],
                    trinketProperty1: state.properties[Constants.TRINKET_PROPERTY1_INDEX],
                    trinketProperty2: state.properties[Constants.TRINKET_PROPERTY2_INDEX],
                    trinketTrait: state.traits[Constants.TRINKET_TRAIT_INDEX],
                    talent1: state.talents[Constants.TALENT_TIER_1],
                    talent2: state.talents[Constants.TALENT_TIER_2],
                    talent3: state.talents[Constants.TALENT_TIER_3],
                    talent4: state.talents[Constants.TALENT_TIER_4],
                    talent5: state.talents[Constants.TALENT_TIER_5],
                    talent6: state.talents[Constants.TALENT_TIER_6],
                    name: state.name,
                    description: state.description,
                    difficulty: state.difficulty,
                    mission: state.mission,
                    potion: state.potion,
                    roles: state.roles,
                    likes: [],
                    dateCreated: new Date(),
                    dateModified: new Date(),
                    userId: auth.currentUser.uid,
                    username: auth.currentUser.displayName,
                    videos: state.videos
                }).then((docRef) => {
                    console.log("Document written with ID: ", docRef.id);
                    history.push('/build/' + docRef.id + '/edit');

                    //redirect to build edit page here

                }).catch((error) => {
                    console.error("Error adding document: ", error);
                });
            }
            else {

                console.log('updating build, current state:');
                console.log(state);

                if (state.userId !== auth.currentUser.uid) {
                    alert('You can\'t edit a build you didn\'t create.');
                    return;
                }

                let buildDataRef = db.collection('builds').doc(state.buildId);

                buildDataRef.update({
                    careerId: state.careerId,
                    meleeId: state.meleeId,
                    meleeProperty1: state.properties[Constants.MELEE_PROPERTY1_INDEX],
                    meleeProperty2:state.properties[Constants.MELEE_PROPERTY2_INDEX],
                    meleeTrait: state.traits[Constants.MELEE_TRAIT_INDEX],
                    rangeId: state.rangeId,
                    rangeProperty1: state.properties[Constants.RANGE_PROPERTY1_INDEX],
                    rangeProperty2: state.properties[Constants.RANGE_PROPERTY2_INDEX],
                    rangeTrait: state.traits[Constants.RANGE_TRAIT_INDEX],
                    necklaceProperty1: state.properties[Constants.NECKLACE_PROPERTY1_INDEX],
                    necklaceProperty2: state.properties[Constants.NECKLACE_PROPERTY2_INDEX],
                    necklaceTrait: state.traits[Constants.NECKLACE_TRAIT_INDEX],
                    charmProperty1: state.properties[Constants.CHARM_PROPERTY1_INDEX],
                    charmProperty2: state.properties[Constants.CHARM_PROPERTY2_INDEX],
                    charmTrait: state.traits[Constants.CHARM_TRAIT_INDEX],
                    trinketProperty1: state.properties[Constants.TRINKET_PROPERTY1_INDEX],
                    trinketProperty2: state.properties[Constants.TRINKET_PROPERTY2_INDEX],
                    trinketTrait: state.traits[Constants.TRINKET_TRAIT_INDEX],
                    talent1: state.talents[Constants.TALENT_TIER_1],
                    talent2: state.talents[Constants.TALENT_TIER_2],
                    talent3: state.talents[Constants.TALENT_TIER_3],
                    talent4: state.talents[Constants.TALENT_TIER_4],
                    talent5: state.talents[Constants.TALENT_TIER_5],
                    talent6: state.talents[Constants.TALENT_TIER_6],
                    name: state.name,
                    description: state.description,
                    difficulty: state.difficulty,
                    mission: state.mission,
                    potion: state.potion,
                    roles: state.roles,
                    likes: state.likes,
                    dateModified: new Date(),
                    userId: auth.currentUser.uid,
                    username: auth.currentUser.displayName,
                    videos: state.videos    
                }).then(() => {
                    console.log("Document updated with ID: ", state.buildId);
                    
                    updateState({
                        type: "UPDATE_DIRTY", 
                        payload: false
                    });

                    var buildSaveIndicator = document.getElementById('buildSaveIndicator');
                    buildSaveIndicator.classList.add('saved');
                    setTimeout(() => { buildSaveIndicator.classList.remove('saved'); }, 4000);

                }).catch((error) => {
                    console.error("Error updating document: ", error);
                });
            }
        }

        //get build id param
        //if empty, load nothing from DB
        //if not empty, load build from DB and updatestate

        //saving builds with /create/ url saves new db item and redirects to /buildId/edit page
        //saving builds with /edit/ url just updates the record in the db

        if (!state.isFromDb && !state.createBuild) {
            return (
                <div className="edit-build-page" data-readonly={state.readonly} data-dirty={state.dirty}>
                    <p>No build found</p>
                </div>);
        }

        if (!auth.currentUser) {
            return (
                <div className="edit-build-page" data-readonly={state.readonly} data-dirty={state.dirty}>
                    <p>You must be logged in to edit builds</p>
                </div>);
        }

        if (!state.createBuild && state.userId !== auth.currentUser.uid) {
            return (
                <div className="edit-build-page" data-readonly={state.readonly} data-dirty={state.dirty}>
                    <p>Cannot edit build that you didn't create</p>
                </div>);
        }

        return (
            <div className="edit-build-page build-page" data-liked={state.isLiked} data-readonly={state.readonly} data-dirty={state.dirty} data-fresh={state.createBuild}>
                <span id="buildSaveIndicator" className="border-03 background-18">Build saved...</span>
                <div className="build-left-container">
                    <div className="build-buttons-container">
                        <span id="saveBuildButton" className="button-01 border-04" onClick={saveBuild.bind(this)}>Save Build</span>
                    </div>                    
                    <HeroSelect careerId={state.careerId}></HeroSelect>
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
                                <input type="text" className="build-name-input border-02 background-18" placeholder="Name your build" value={state.name} onChange={handleNameChange.bind(this)}></input>
                                <textarea className="input-build-description border-02 background-18" wrap="hard" placeholder="Describe your build" value={state.description} onChange={handleDescriptionChanged.bind(this)}></textarea>
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

export default EditBuildPage;