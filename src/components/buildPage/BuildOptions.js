import React, {Component} from 'react';
import './BuildOptions.css';

class BuildOptions extends Component {
  render() {
    return (
        <div className="build-options-container">
                                <select>
                                    <option hidden defaultValue>Difficulty</option>
                                    <option>Recruit</option>
                                    <option>Veteran</option>
                                    <option>Champion</option>
                                    <option>Legend</option>
                                    <option>Catacylsm</option>
                                </select>
                                <select>
                                    <option hidden defaultValue>Mission</option>
                                    <option>Helmgart</option>
                                    <option>Weave 1</option>
                                </select>
                                <select>
                                    <option hidden defaultValue>Potion Preference</option>
                                    <option>Strength Potion</option>
                                    <option>Speed Potion</option>
                                    <option>Concentration Potion</option>
                                </select>
                                <select>
                                    <option hidden defaultValue>Add Team Role</option>
                                    <option>Frontliner</option>
                                    <option>Backliner</option>
                                    <option>Horde DPS</option>
                                    <option>Boss DPS</option>
                                    <option>Elite/Special Slayer</option>
                                    <option>Tank</option>
                                    <option>CC</option>
                                    <option>Support</option>
                                    <option>Solo</option>
                                </select>
                            </div>
        );
      }
    }
    
    export default BuildOptions;