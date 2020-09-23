import React, {Component} from 'react';
import './HeroTalents.css';
import { AppContext } from '../../stores/Store';
import {heroesData} from '../../data/Heroes'

class HeroTalents extends Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.renderTalents = this.renderTalents.bind(this);
    this.renderTalent = this.renderTalent.bind(this);
  }

  getTalents(careerId) {
    for (var i = 0; i < heroesData.length; i++) {
      console.log(heroesData[i])
      if (heroesData[i].id === parseInt(careerId)) {
        return heroesData[i].talents;
      }
    }
  }

  renderTalents() {
    let talentList = [];
    var selectedTalents = this.props.talents ? this.props.talents : [0,0,0,0,0,0];
    var careerId = this.props.careerId;
    debugger;
    careerId = careerId > 0 ? careerId : 1;
    var talents = this.getTalents(careerId);

    for (var i = 1; i < 7; i++) {
      var tier = i;
      var tierString = `level-${tier*5}`

      talentList.push(<span key={tierString} className={`talent-lock-icon ${tierString}`}></span>);

      for (var j = 1; j < 4; j++) {
        var talent = ((tier-1)*3)+j;
        talentList.push(this.renderTalent(careerId, tier, talent, talents, selectedTalents));

      }
    }
     return talentList;
  }

  renderTalent(careerId, tier, talentNumber, talents, selectedTalents) {
    const [state, updateState] = this.context;
    var talentString = `talent-${careerId.toString().padStart(2, "0")}${talentNumber.toString().padStart(2, "0")}`;
    var talentClassName = `hero-talent tier-${tier}`;

    var selectedTierTalent = selectedTalents[tier-1] + ((tier-1)*3);

    if (selectedTierTalent === talentNumber) {
      talentClassName += " selected";
    }

    var talentValue = talentNumber % 3 === 0 ? 3 : talentNumber % 3;
    var talent = talents[talentNumber-1];
    return <div data-talent={talentValue} data-tier={tier} onClick={(e) => updateState({type: "UPDATE_TALENTS", payload: { tier: parseInt(e.currentTarget.dataset.tier), talent: parseInt(e.currentTarget.dataset.talent)}})} key={talentString} className={talentClassName}>
            <div className="talent-button-wrapper">
              <div className={`talent-icon ${talentString}`}></div>
              <p className="talent-name">{talent.name}</p>
              <p className="talent-description">{talent.description}</p>
            </div>
           </div>;
  }

  render() {
    var talentsContainerClass = '';
    var selectedTalents = this.props.talents ? this.props.talents : [0,0,0,0,0,0];
    if (!Object.values(selectedTalents).includes(0)) {
      talentsContainerClass = "talents-selected"
    }

    return (
      <div className={`hero-talents-container ${talentsContainerClass}`}>
        <div className="hero-talents-grid">
          <p className="hero-talents-header">Talents</p>          
          {this.renderTalents()}
          <div class="hero-talents-grid-bg"></div>
          <div class="hero-talents-grid-border"></div>
        </div>
      </div>
    );
  }

  handleTalentClick(e) {
    var tierTalents = document.querySelectorAll(`button.hero-talent[data-tier="${e.currentTarget.getAttribute('data-tier')}"]`);

    tierTalents.forEach(talent => {
      talent.classList.remove('selected');
    });

    e.currentTarget.classList.add('selected');
  }
}

export default HeroTalents;
