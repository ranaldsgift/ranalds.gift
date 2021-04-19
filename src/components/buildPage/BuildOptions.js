import React, {Component} from 'react';
import { AppContext } from '../../stores/Store';
import { Multiselect } from 'multiselect-react-dropdown';
import './BuildOptions.css';

class BuildOptions extends Component {
    static contextType = AppContext;

    constructor(props) {
      super(props);
      this.difficultySelectChange = this.difficultySelectChange.bind(this);
      this.missionSelectChange = this.missionSelectChange.bind(this);
      this.potionSelectChange = this.potionSelectChange.bind(this);
      this.roleSelected = this.roleSelected.bind(this);
      this.roleRemoved = this.roleRemoved.bind(this);
    }
    
  render() {
    const [state] = this.context;

    const rolesData = [ 'Frontliner', 'Backliner', 'Horde Focus', 'Boss Focus', 'Elite Focus', 'Special Focus', 'Tank', 'CC', 'Support', 'Solo' ];

    return (
        <div className="build-options-container">
                                <select value={state.difficulty} onChange={this.difficultySelectChange}>
                                    <option defaultValue hidden>Difficulty</option>
                                    {this.getDifficultyOptions()}
                                </select>
                                <select value={state.mission} onChange={this.missionSelectChange}>
                                    <option hidden defaultValue>Mission</option>
                                    {this.getMissionOptions()}
                                </select>
                                <select value={state.potion} onChange={this.potionSelectChange}>
                                    <option hidden defaultValue>Potion Preference</option>
                                    {this.getPotionOptions()}
                                </select>
                                <Multiselect isObject={false} options={rolesData} selectedValues={state.roles} displayValue="name" placeholder="Add Roles" hidePlaceholder="true" onSelect={this.roleSelected} onRemove={this.roleRemoved}></Multiselect>
                            </div>
        );
      }

      getDifficultyOptions() {
          
        let difficultyData = [
            { value: 'Any Difficulty', label: 'Any Difficulty' },
            { value: 'Cataclysm', label: 'Cataclysm' },
            { value: 'Legend', label: 'Legend' },
            { value: 'Champion', label: 'Champion' },
            { value: 'Veteran', label: 'Veteran' },
            { value: 'Recruit', label: 'Recruit' },
            { value: '[Modded]', label: 'Modded' }
        ];

        let html = [];
        difficultyData.forEach(difficulty => {
            html.push(<option key={difficulty.value} value={difficulty.value}>{difficulty.label}</option>);
        });
        return html;
      }

      difficultySelectChange(e) {
        const [state, updateState] = this.context;
        console.log(e.currentTarget);
        console.log(e.target.value);

        updateState({
            type: "UPDATE_DIFFICULTY", 
            payload: e.target.value
        });
      }
    
    

    getMissionOptions() {          
        let missionData = [
            { value: 'Any Mission', label: 'Any Mission' },
            { value: 'Righteous Stand', label: 'Righteous Stand' },
            { value: 'Convocation of Decay', label: 'Convocation of Decay' },
            { value: 'Hunger in the Dark', label: 'Hunger in the Dark' },
            { value: 'Halescourge', label: 'Halescourge' },
            { value: 'Athel Yenlui', label: 'Athel Yenlui' },
            { value: 'The Screaming Bell', label: 'The Screaming Bell' },
            { value: 'Fort Brachsenbrücke', label: 'Fort Brachsenbrücke' },
            { value: 'Into the Nest', label: 'Into the Nest' },
            { value: 'Against the Grain', label: 'Against the Grain' },
            { value: 'Empire in Flames', label: 'Empire in Flames' },
            { value: 'Festering Ground', label: 'Festering Ground' },
            { value: 'The War Camp', label: 'The War Camp' },
            { value: 'The Skittergate', label: 'The Skittergate' },
            { value: 'The Pit', label: 'The Pit' },
            { value: 'The Blightreaper', label: 'The Blightreaper' },
            { value: 'The Horn of Magnus', label: 'The Horn of Magnus' },
            { value: 'Garden of Morr', label: 'Garden of Morr' },
            { value: 'Engines of War', label: 'Engines of War' },
            { value: 'Fortunes of War', label: 'Fortunes of War' },
            { value: 'Dark Omens', label: 'Dark Omens' },
            { value: 'Old Haunts', label: 'Old Haunts' },
            { value: 'Blood in the Darkness', label: 'Blood in the Darkness' },
            { value: 'The Enchanter\'s Lair', label: 'The Enchanter\'s Lair' }
        ];

        let html = [];
        missionData.forEach(mission => {
            html.push(<option key={mission.value} value={mission.value}>{mission.label}</option>);
        });
        
        return html;
      }

      missionSelectChange(e) {
        const [state, updateState] = this.context;
        console.log(e.currentTarget);
        console.log(e.target.value);

        updateState({
            type: "UPDATE_MISSION", 
            payload: e.target.value
        });
      }
    
    

    getPotionOptions() {
         
        let potionData = [ 
            { value: 'Any Potion', label: 'Any Potion' },
            { value: 'Strength', label: 'Strength' },
            { value: 'Speed', label: 'Speed' },
            { value: 'Concentration', label: 'Concentration' }
        ];

        let html = [];
        potionData.forEach(potion => {
            html.push(<option key={potion.value} value={potion.value}>{potion.label}</option>);
        });
        
        return html;
      }

      potionSelectChange(e) {
        const [state, updateState] = this.context;
        console.log(e.currentTarget);
        console.log(e.target.value);

        updateState({
            type: "UPDATE_POTION", 
            payload: e.target.value
        });
      }

      roleSelected(selectedList, selectedItem) {
        const [state, updateState] = this.context;
          console.log(selectedList);
        updateState({
            type: "UPDATE_ROLES", 
            payload:selectedList
        });
      }

      roleRemoved(selectedList, removedItem) {
        const [state, updateState] = this.context;
        console.log(selectedList);
        updateState({
            type: "UPDATE_ROLES", 
            payload: selectedList
        });
      }
    }
    
    export default BuildOptions;