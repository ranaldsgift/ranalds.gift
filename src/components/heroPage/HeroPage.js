import React, {Component} from 'react';
import './HeroPage.css';
import '../../assets/css/Layouts.css';
import HeroSelect from '../heroSelect/HeroSelect';
import HeroTalents from '../heroTalents/HeroTalents';
import HeroDetails from '../heroDetails/HeroDetails';
import 'simplebar/dist/simplebar.min.css';
import { AppContext } from '../../stores/Store';
import Inventory from '../inventory/Inventory';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import BuildSummary from '../buildPage/BuildSummary';

class HeroPage extends Component {
  static contextType = AppContext;

  render() {
    const [state, updateState] = this.context;
    this.careerId = state.careerId;

    if (state.careerId === 0) {
      if (typeof this.props.match.params.careerId != "undefined") {
        updateState({
          type: "INIT_STATE_FROM_URL", 
          payload: { 
            careerId: this.props.match.params.careerId,
            talents: this.props.match.params.talents,
            melee: this.props.match.params.melee,
            range: this.props.match.params.range,
            necklace: this.props.match.params.necklace,
            charm: this.props.match.params.charm,
            trinket: this.props.match.params.trinket
          }
        });
      } else {
        updateState({type: "UPDATE_CAREER", payload: 1});
      }
      return null;
    }

    if (this.props.match.params.careerId !== state.careerId && state.careerId === 0) {
      this.careerId = this.props.match.params.careerId;
    }
    if (!this.careerId) {
      this.careerId = 1;
    }
    

    this.talents = state.talents;
    if(this.props.match.params.talents && this.talents[0] < 0) {
      this.talents = this.props.match.params.talents.substring(0,6).split('').map((talent) => { return parseInt(talent); });
      updateState({type: "UPDATE_ALL_TALENTS", payload: this.talents});
    }

    var urlState = `${state.careerId}/${Object.values(state.talents).join('')}/${state.meleeId},${state.properties[0]},${state.properties[1]},${state.traits[0]}/${state.rangeId},${state.properties[2]},${state.properties[3]},${state.traits[1]}/${state.properties[4]},${state.properties[5]},${state.traits[2]}/${state.properties[6]},${state.properties[7]},${state.traits[3]}/${state.properties[8]},${state.properties[9]},${state.traits[4]}`

    return (
      <div className="hero-page">
        <HeroSelect careerId={this.careerId} updateStateType="UPDATE_HERO_CAREER" heroSelectionChanged={this.heroSelectionChanged}></HeroSelect>
        <div className={`hero-container hero-career-${this.careerId}`}>
          <Tabs className="container-tabs">
            <TabList className="container-tabs-list">
              <Tab>Hero Overview</Tab>
              <Tab style={{display: 'none'}}>Builds</Tab>
              <Tab style={{display: 'none'}}>Gameplay Videos</Tab>
            </TabList>
            <TabPanel className="hero-summary-tab">
              <div className="hero-overview-container">
                <HeroDetails careerId={this.careerId}></HeroDetails>
                <BuildSummary></BuildSummary>
              </div>
              <span className="hero-page-url-state" onClick={this.copyUrlStateToClipboard.bind(this)}></span>
              <HeroTalents contextActionType="UPDATE_HERO_TALENTS" careerId={this.careerId} talents={this.talents}></HeroTalents>
            </TabPanel>
            <TabPanel className="hero-builds-tab">
              
            </TabPanel>
            <TabPanel className="hero-videos-tab">
              
            </TabPanel>
          </Tabs>
        </div>
        <Inventory></Inventory>
      </div>
    );
  }

  copyUrlStateToClipboard() {
    const [state] = this.context;
    var urlState = `https://www.ranaldsgift.com/${state.careerId}/${Object.values(state.talents).join('').replace(/-1/g, '0')}/${state.meleeId},${state.properties[0]},${state.properties[1]},${state.traits[0]}/${state.rangeId},${state.properties[2]},${state.properties[3]},${state.traits[1]}/${state.properties[4]},${state.properties[5]},${state.traits[2]}/${state.properties[6]},${state.properties[7]},${state.traits[3]}/${state.properties[8]},${state.properties[9]},${state.traits[4]}`

    navigator.clipboard.writeText(urlState).then(function() {
      /* clipboard successfully set */
    }, function() {
      /* clipboard write failed */
    });
  }
}

export default HeroPage;
