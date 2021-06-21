import React, {Component} from 'react';
import { AppContext } from '../../stores/Store';
import './BuildOptions.css';
import DifficultySelect from '../select/DifficultySelect';
import MissionSelect from '../select/MissionSelect';
import PotionSelect from '../select/PotionSelect';
import RoleSelect from '../select/RoleSelect';
import BookSelect from '../select/BookSelect';
import TwitchSelect from '../select/TwitchSelect';

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
    if (this.shouldHideContainer()) {
      return null;
    }
    return (
      <div className="build-options-container divider-03 top">
        {this.renderOptions()}
      </div>
        );
      }

      renderOptions() {
        const [state] = this.context;

        var optionsHtml = [];

        var selectedDifficulties = state.difficulty ? [state.difficulty] : [];
        var selectedMissions = state.mission ? [state.mission] : [];
        var selectedPotions = state.potion ? [state.potion] : [];
        var selectedBooks = state.book ? [state.book] : [];
        var selectedTwitchMode = state.twitchMode ? [state.twitchMode] : [];
        
        if (this.props.hideEmpty) {
          if (selectedDifficulties.length > 0) {
            optionsHtml.push(<DifficultySelect key='difficulty' selectedValues={selectedDifficulties}></DifficultySelect>);
          }

          if (selectedTwitchMode.length > 0) {
            optionsHtml.push(<TwitchSelect key='twitchMode' selectedValues={selectedTwitchMode}></TwitchSelect>);
          }

          if (selectedMissions.length > 0) {
            optionsHtml.push(<MissionSelect key='mission' selectedValues={selectedMissions}></MissionSelect>);
          }

          if (selectedPotions.length > 0) {
            optionsHtml.push(<PotionSelect key='potion' selectedValues={selectedPotions}></PotionSelect>);
          }

          if (selectedBooks.length > 0) {
            optionsHtml.push(<BookSelect key='books' selectedValues={selectedBooks}></BookSelect>);
          }

          if (state.roles.length > 0) {
            optionsHtml.push(<RoleSelect key='roles' selectedValues={state.roles}></RoleSelect>);
          }
        }
        else {
          optionsHtml.push(<DifficultySelect key='difficulty' selectedValues={selectedDifficulties}></DifficultySelect>);
          optionsHtml.push(<TwitchSelect key='twitchMode' selectedValues={selectedTwitchMode}></TwitchSelect>);
          optionsHtml.push(<MissionSelect key='mission' selectedValues={selectedMissions}></MissionSelect>);
          optionsHtml.push(<PotionSelect key='potion' selectedValues={selectedPotions}></PotionSelect>);
          optionsHtml.push(<BookSelect key='book' selectedValues={selectedBooks}></BookSelect>);
          optionsHtml.push(<RoleSelect key='roles' selectedValues={state.roles}></RoleSelect>);
        }

        return optionsHtml.length > 0 ? optionsHtml : null;
      }

      shouldHideContainer() {
        const [state] = this.context;

        var selectedDifficulties = state.difficulty ? [state.difficulty] : [];
        var selectedMissions = state.mission ? [state.mission] : [];
        var selectedPotions = state.potion ? [state.potion] : [];
        var selectedBooks = state.book ? [state.book] : [];
        var selectedTwitchMode = state.twitchMode ? [state.twitchMode] : [];
        
        return this.props.hideEmpty && 
        selectedDifficulties.length === 0 && 
        selectedMissions.length === 0 && 
        selectedPotions.length === 0 && 
        selectedBooks.length === 0 &&
        selectedTwitchMode.length === 0 &&
        state.roles.length === 0;
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