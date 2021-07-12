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
import { DataHelper } from '../../utils/DataHelper';
import { auth } from '../../utils/Firebase';
import history from '../../utils/History';

class HeroPage extends Component {
  static contextType = AppContext;

  componentDidMount() {
    const [state, updateState] = this.context;

    if (typeof this.props.match.params.careerId != "undefined" && !state.isLoadedFromParams) {
      if (typeof this.props.match.params.primary != "undefined" && this.props.match.params.primary.indexOf(',') >= 0) {
        updateState({
          type: "INIT_STATE_FROM_OLD_URL", 
          payload: { 
            careerId: this.props.match.params.careerId,
            talents: this.props.match.params.talents,
            primary: this.props.match.params.primary,
            secondary: this.props.match.params.secondary,
            necklace: this.props.match.params.necklace,
            charm: this.props.match.params.charm,
            trinket: this.props.match.params.trinket
          }
        });
        return null;
      }
      else {
        updateState({
          type: "INIT_STATE_FROM_URL", 
          payload: { 
            careerId: this.props.match.params.careerId,
            talents: this.props.match.params.talents,
            primary: this.props.match.params.primary,
            secondary: this.props.match.params.secondary,
            necklace: this.props.match.params.necklace,
            charm: this.props.match.params.charm,
            trinket: this.props.match.params.trinket
          }
        });
      }
    }
  }

  render() {
    const [state, updateState] = this.context;
    this.careerId = state.careerId;

    var career = DataHelper.getCareer(state.careerId);

    document.title = `${career.name} - ${career.heroName} - Vermintide 2 Heroes - Vermintide 2 Careers - Vermintide 2 | Ranalds.Gift`;

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
      return null;
    }

    //var urlState = `${state.careerId}/${Object.values(state.talents).join('')}/${state.meleeId},${state.properties[0]},${state.properties[1]},${state.traits[0]}/${state.rangeId},${state.properties[2]},${state.properties[3]},${state.traits[1]}/${state.properties[4]},${state.properties[5]},${state.traits[2]}/${state.properties[6]},${state.properties[7]},${state.traits[3]}/${state.properties[8]},${state.properties[9]},${state.traits[4]}`

    return (
      <div className="hero-page">
        <div className="hero-left-container top-left-shadow">
            <div className="build-buttons-container">
                <span id="createBuildButton" className="button-01" onClick={this.createBuildClick.bind(this)}>Create Build</span>
            </div>                    
            <HeroSelect careerId={state.careerId}></HeroSelect>
        </div>
        <div className={`hero-container hero-career-${this.careerId}`}>
          <Tabs className="container-tabs">
            <TabList className="container-tabs-list">
              <Tab>Hero Overview</Tab>
              <Tab style={{display: 'none'}}>Builds</Tab>
              <Tab style={{display: 'none'}}>Gameplay Videos</Tab>
            </TabList>
            <TabPanel className="hero-summary-tab">
              <div className="hero-overview-container">
                <HeroDetails careerId={state.careerId}></HeroDetails>
                <BuildSummary></BuildSummary>
              </div>
              <span className="hero-page-url-state border-01" onClick={this.copyUrlStateToClipboard.bind(this)}></span>
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

  createBuildClick() {
    if (!auth.currentUser) {
      console.log('You must be logged in to create a new build.');
      return;
    }

    history.push(`/build/create/${this.getUrlString()}`);
  }

  getUrlString() {
    const [state] = this.context;
    return `${state.careerId}/${Object.values(state.talents).join('').replace(/-1/g, '0')}/${state.primaryWeaponId}-${state.properties[0]}-${state.properties[1]}-${state.traits[0]}/${state.secondaryWeaponId}-${state.properties[2]}-${state.properties[3]}-${state.traits[1]}/${state.properties[4]}-${state.properties[5]}-${state.traits[2]}/${state.properties[6]}-${state.properties[7]}-${state.traits[3]}/${state.properties[8]}-${state.properties[9]}-${state.traits[4]}`;
  }

  copyUrlStateToClipboard() {
    const [state] = this.context;
    var urlState = `https://${window.location.host}/heroes/${this.getUrlString()}`

    navigator.clipboard.writeText(urlState).then(function() {
      /* clipboard successfully set */
    }, function() {
      /* clipboard write failed */
    });
  }
}

export default HeroPage;
