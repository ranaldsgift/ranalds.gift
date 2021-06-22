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
import { auth, db, firebase } from '../../utils/Firebase';
import { UserContext } from '../../stores/UserStore';
import Editor from '../../utils/TextEditor';
import { BuildBusiness } from '../../business/BuildBusiness';

function EditBuildPage(props) {

        const [state, updateState] = useContext(AppContext);

        if (state.readonly) {
            updateState({
                type: "UPDATE_READONLY", 
                payload: false
            });
        }
        

        if (typeof props.match.params.careerId != "undefined" && parseInt(props.match.params.careerId) !== state.careerId) {
            updateState({
                type: "INIT_STATE_FROM_URL", 
                payload: { 
                careerId: props.match.params.careerId,
                talents: props.match.params.talents,
                primary: props.match.params.primary,
                secondary: props.match.params.secondary,
                necklace: props.match.params.necklace,
                charm: props.match.params.charm,
                trinket: props.match.params.trinket
                }
            });
        }

        let params = useParams();

        if (params.buildId && state.buildId !== params.buildId) {
            if (!state.isLoadingData) {
                loadBuild(params.buildId);
            }
        }

        function loadBuild(buildId) {
            updateState({
                type: 'UPDATE_LOADING_STATE', 
                payload: true
            });
            console.log('Loading build ID ' + buildId);
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
            }).catch((error) => {
                console.error('Error retrieving data from DB:', error);
            });

        }

        function handleDescriptionChanged(description) {
            updateState({
                type: "UPDATE_DESCRIPTION", 
                payload: description
            });
        }

        function handleNameChange(e) {
            updateState({
                type: "UPDATE_NAME", 
                payload: e.currentTarget.value
            });
        }

        function saveBuildCallback() {
            updateState({
                type: 'UPDATE_DIRTY',
                payload: false
            });
        }

        function saveBuildClick() {
            
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
                BuildBusiness.createBuild(state);
                return;
            }
            else {
                BuildBusiness.updateBuild(state, saveBuildCallback);
                return;
            }
        }

        function isBuildReadyForSaving() {
            return !state.talents.some((talent) => { return talent > 3 || talent < 1; }) && state.name.length > 2;
        }

        //get build id param
        //if empty, load nothing from DB
        //if not empty, load build from DB and updatestate

        //saving builds with /create/ url saves new db item and redirects to /buildId/edit page
        //saving builds with /edit/ url just updates the record in the db
    
        

        if (state.createBuild) {
            document.title = "Create A New Build - Vermintide 2 Builds | ranalds.gift";
        }
        else {
            document.title = "Build Editor - Vermintide 2 Builds | ranalds.gift";
        }

        if (state.isLoadingData) {
            return (
                <div className="edit-build-page" data-readonly={state.readonly} data-dirty={state.dirty}>
                    <p>Loading build...</p>
                </div>);
        }

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
            <div className="edit-build-page build-page" data-liked={state.isLiked} data-valid={isBuildReadyForSaving()} data-readonly={state.readonly} data-dirty={state.dirty} data-fresh={state.createBuild}>
                <span id="buildSaveIndicator" className="border-03 background-18">Build saved...</span>
                <div className="build-left-container top-left-shadow">
                    <div className="build-buttons-container">
                        <span id="saveBuildButton" className="button-01 border-04" onClick={saveBuildClick.bind(this)}>Save Build</span>
                        <span className="save-info">Name your build and select all 6 talents to save it</span>
                        <span className="view-build-button button-01"><a href={`/build/${state.buildId}/view`}>View Build</a></span>
                    </div>                    
                    <HeroSelect careerId={state.careerId}></HeroSelect>
                </div>
                <div className="build-main-container">
                    <Tabs>
                        <TabList>
                            <Tab className="tab-button">Summary</Tab>          
                        </TabList>
                        <TabPanel className="build-summary-tab">
                            <div className="build-details-container">
                                <HeroDetails careerId={state.careerId}></HeroDetails>
                                <input type="text" className="build-name-input border-02 background-18" placeholder="Name your build" value={state.name} onChange={handleNameChange.bind(this)}></input>
                                <Editor placeholder="Describe or write a guide for your build (optional)" html={state.description} handleChange={handleDescriptionChanged.bind(this)}></Editor>
                            </div>
                            <BuildOptions></BuildOptions>
                            <BuildSummary></BuildSummary>
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