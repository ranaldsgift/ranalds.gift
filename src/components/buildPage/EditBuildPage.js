import React, {Component} from 'react';
import HeroTalents from '../heroTalents/HeroTalents'
import BuildList from '../buildList/BuildList'
import Inventory from '../inventory/Inventory'
import './EditBuildPage.css';
import HeroDetails from '../heroDetails/HeroDetails';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import BuildOptions from './BuildOptions';
import BuildSummary from './BuildSummary';
import { AppContext } from '../../stores/Store';

class EditBuildPage extends Component {
    static contextType = AppContext;
    render() {
        const [state] = this.context;

        return (
            <div className="edit-build-page">
                <div className="build-left-container">
                    <div className="build-group-container">
                        <div className="build-group-buttons-container" onClick={this.handleAddNewBuild.bind(this)}>
                            <p>Add new build</p>
                        </div>
                        <BuildList></BuildList>
                    </div>
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
                                <textarea className="input-build-description" wrap="hard" placeholder="Describe your build"></textarea>
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

    handleAddNewBuild() {
        const [state, updateState] = this.context;
        updateState({type: 'SAVE_BUILD', payload: '0'});
    }
}

export default EditBuildPage;