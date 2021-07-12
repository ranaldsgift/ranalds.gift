import React, {Component} from 'react';
import './HeroTalents.css';
import { AppContext } from '../../stores/Store';
import { heroesData } from '../../data/Heroes'
import { DataHelper } from '../../utils/DataHelper';

class HeroTalents extends Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.renderTalents = this.renderTalents.bind(this);
    this.renderTalent = this.renderTalent.bind(this);

    this.state = {
      showDescriptions: false
    }
  }

  getTalents(careerId) {
    for (var i = 0; i < heroesData.length; i++) {
      if (heroesData[i].id === parseInt(careerId)) {
        return heroesData[i].talents;
      }
    }
  }

  renderTalents() {
    let talentList = [];
    var selectedTalents = this.props.talents ? this.props.talents : [0,0,0,0,0,0];
    var careerId = this.props.careerId;

    careerId = careerId > 0 ? careerId : 1;
    var talents = DataHelper.getCareerTalents(careerId);

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

    var talentDescription = talent.description;
    var correctedTalent = DataHelper.getCorrectedTalent(careerId, tier, talentValue);

    if (correctedTalent) {
      talentDescription = correctedTalent.description;
    }

    return <div data-talent={talentValue} data-tier={tier} onClick={this.props.readonly ? null : this.handleTalentClick.bind(this)} key={talentString} className={talentClassName}>
            <div className="talent-button-wrapper">
              <div className={`talent-icon ${talentString}`} data-talent={talentValue} data-tier={tier} data-career={careerId}></div>
              <p className="talent-name">{talent.name}</p>
              <p className="talent-description">{talentDescription}</p>
            </div>
           </div>;
  }

  render() {
    const [state] = this.context;
    var talentsContainerClass = '';
    var selectedTalents = this.props.talents ? this.props.talents : [0,0,0,0,0,0];

    if (selectedTalents[0] > 0) {
      talentsContainerClass += ' tier-1-selected'
    }
    if (selectedTalents[1] > 0) {
      talentsContainerClass += ' tier-2-selected'
    }
    if (selectedTalents[2] > 0) {
      talentsContainerClass += ' tier-3-selected'
    }
    if (selectedTalents[3] > 0) {
      talentsContainerClass += ' tier-4-selected'
    }
    if (selectedTalents[4] > 0) {
      talentsContainerClass += ' tier-5-selected'
    }
    if (selectedTalents[5] > 0) {
      talentsContainerClass += ' tier-6-selected'
    }

    return (
      <div className={`hero-talents-container${talentsContainerClass}`} data-show-descriptions={this.state.showDescriptions}>
        <div className="hero-talents-grid" data-career={state.careerId}>
          <span className="hero-talents-header">Talents</span>
          <span className="show-talent-descriptions" onClick={this.clickShowDescriptions.bind(this)}>{this.state.showDescriptions ? 'Hide Descriptions' : 'Show Descriptions'}</span>
          {this.renderTalents()}
          <div className="hero-talents-grid-bg background-26"></div>
          <div className="hero-talents-grid-border"></div>
        </div>
      </div>
    );
  }

  clickShowDescriptions() {
    if (document.querySelector('.hero-talents-container').dataset.showDescriptions === 'false') {
      this.setState({ showDescriptions: true });
    }
    else {      
      this.setState({ showDescriptions: false });
    }
  }

  handleTalentClick(e) {
    const [state, updateState] = this.context;

    var talent = parseInt(e.currentTarget.dataset.talent);
    var tier = parseInt(e.currentTarget.dataset.tier);
    var currentTalent = state.talents[tier-1];
    if (talent === currentTalent) {
      talent = 0;
    }

    updateState({type: "UPDATE_TALENTS", payload: { tier: tier, talent: talent}});
  }
}

export default HeroTalents;
