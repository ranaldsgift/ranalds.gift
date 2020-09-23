import React, {Component} from 'react';
import './BuildListFilters.css';

class BuildListFilters extends Component {
  render() {
    return (
      <div className="build-list-filters border-01 background-34">
        <div className="build-list-filter" style={{display:'none'}}>
            <input type="text" className="input-build-name-filter" placeholder="Search by build name"></input>
        </div>
        <div className="build-list-filter" style={{display:'none'}}>
            <input type="text" className="input-build-author-filter" placeholder="Search by author name"></input>
        </div>
        <div className="build-list-filter">
            <select defaultValue="Sort By" className="select-sortby-filter border-13">
                <option disabled hidden>Sort By</option>
                <option value="any">Date Modified</option>
                <option value="dps">Likes</option>
                <option value="tank">Views</option>
            </select>
        </div>
        <div className="build-list-filter" style={{display:'none'}}>
            <select defaultValue="2.0.4" className="select-build-patch-filter border-13">
                <option disabled hidden>Patch number</option>
                <option value="2.0.4">2.0.4</option>
                <option value="2.0">2.0</option>
                <option value="1.4">1.4</option>
            </select>
        </div>
        <div className="build-list-filter">
            <select defaultValue="Team Role" className="select-build-tag-filter border-13">
                <option disabled hidden>Team Role</option>
                <option value="dps">DPS</option>
                <option value="tank">Tank</option>
                <option value="cc">CC</option>
                <option value="support">Support</option>
                <option value="wellrounded">Well Rounded</option>
            </select>
        </div>
        <div className="build-list-filter">
            <select className="select-difficulty-filter border-13">
                <option hidden defaultValue>Difficulty</option>
                <option value="Cataclysm">Cataclysm</option>
                <option value="Legend">Legend</option>
                <option value="Champion">Champion</option>
                <option value="Veteran">Veteran</option>
                <option value="Recruit">Recruit</option>
            </select>
        </div>
        <div className="build-list-filter">
            <select className="select-mission-filter border-13">
                <option hidden defaultValue>Mission</option>
                <option value="weave1">Weave 1</option>
            </select>
        </div>
        <div className="build-list-filter">
            <select className="select-potion-filter border-13">
                <option hidden defaultValue>Potion Preference</option>
                <option value="speed">Speed Potion</option>
                <option value="strength">Strength Potion</option>
                <option value="concentration">Concentration Potion</option>
            </select>
        </div>
      </div>
    );
  }
}

export default BuildListFilters;