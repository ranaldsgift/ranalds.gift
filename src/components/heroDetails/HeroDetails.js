import React, {Component} from 'react';
import './HeroDetails.css';
import HeroTalentSummary from "../heroTalents/HeroTalentSummary";
import {heroesData} from '../../data/Heroes'
import { AppContext } from '../../stores/Store';
import { DataHelper } from '../../utils/DataHelper';

class HeroDetails extends Component {
  static contextType = AppContext;
  render() {
    const [state] = this.context;
    var careerId = this.props.careerId ? this.props.careerId : 1;
    var hero = DataHelper.getCareer(careerId);
    hero = hero ? hero : heroesData[0];

    let healthValue = hero.health;
    let healthGain = 0;

    if (state.properties[4] === 3 || state.properties[5] === 3) {
      healthValue = Math.round(hero.health * 1.2);
      healthGain = Math.round(hero.health * 0.2);
    }

    let cooldownValue = hero.skill.cooldown;
    let cooldownReduction = 0;

    if (state.properties[8] === 1 || state.properties[9] === 1) {
      cooldownValue = Math.round(cooldownValue * 0.9);
      cooldownReduction = Math.round(cooldownValue * 0.1);
    }

    let healthBar = <div className="stat-container"><span className={`health-value value-${hero.health} health-value-tier-c`}>{`${healthValue.toString()} HP`}</span></div>;

    let skillDescription = hero.skill.description;

    var correctedSkill = DataHelper.getCorrectedSkill(careerId);
    if (correctedSkill) {
      skillDescription = correctedSkill.description;
    }

    let passiveDescription = hero.passive.description;

    var correctedPassive = DataHelper.getCorrectedPassive(careerId);
    if (correctedPassive) {
      passiveDescription = correctedPassive.description;
    }

    return (
      <div className="hero-details-container">
          <div className="hero-summary-container">
            <div className="hero-name-container">
              <p className="hero-name-header">{hero.name}</p>
              <p className="hero-name">{hero.heroName}</p>
            </div>
            <div className={`hero-portrait hero-${hero.id}-portrait-alt`}></div>
            <div className="hero-attributes">
              <div className="health-container">
                <p>Health</p>
                <div className="health-bar" data-value={healthValue}>
                  {healthBar}
                </div>
              </div>
              <div className="cooldown-container">
                <p className="skill-cooldown-label">Skill Cooldown</p>
                <div className="cooldown-bar" data-value={cooldownValue}>
                  <div className="stat-container"><span className={`skill-cooldown-value skill-cooldown-tier-a`}>{`${cooldownValue.toString()}s`}</span></div>
                </div>
              </div>
              
            </div>
            <HeroTalentSummary careerId={state.careerId} talents={state.talents}></HeroTalentSummary>
          </div>
          <div className="hero-skill-container">
            <p className="hero-skill-header">{hero.skill.name}</p>
            <div className={`hero-${hero.id}-skill hero-ability-icon border-13`}></div>
            <p className="hero-skill-description">{skillDescription}</p>
          </div>
          <div className="hero-passive-container">            
            <p className="hero-passive-header">{hero.passive.name}</p>
            <div className={`hero-${hero.id}-passive hero-ability-icon border-13`}></div>
            <p className="hero-passive-description">{passiveDescription}</p>
          </div>
          <div className="hero-perks-container">
            <p className="hero-perks-header">Perks</p>
              {this.renderPerks(hero.id)}
          </div>
        </div>
    );
  }

  renderPerks(careerId) {
    var hero = heroesData.find((hero) => { return hero.id === careerId});

    var perksHtml = [];
    var i = 1;

    hero.perks.forEach((perk) => { 
      var perkDescription = perk.description;
      var correctedPerk = DataHelper.getCorrectedPerk(careerId, perk.name);

      if (correctedPerk) {
        perkDescription = correctedPerk.description;
      }

      perksHtml.push(<div key={`perk${i}`} className="hero-perk-item-container">
      <p key={`perkHeader${i}`} className="hero-perk-item-header"><span style={{fontSize: '40%', top: '-3px', position: 'relative', left: '-4px'}}>&#9670;</span>{perk.name}</p>
      <p key={`perkDescription${i}`} className="hero-perk-item-description">{perkDescription}</p>
      </div>); 
      i++;
    });

    return perksHtml;
  }
}

export default HeroDetails;