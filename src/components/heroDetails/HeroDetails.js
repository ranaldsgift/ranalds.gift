import React, {Component} from 'react';
import './HeroDetails.css';
import {heroesData} from '../../data/Heroes'

class HeroDetails extends Component {
  render() {
    var careerId = this.props.careerId ? this.props.careerId : 1;
    var hero = heroesData.find((hero) => { return hero.id === parseInt(careerId)});
    hero = hero ? hero : heroesData[0];
    return (
      <div className="hero-details-container">
          <div className="hero-summary-container">
            <div className="hero-name-container">
              <p className="hero-name-header">{hero.name}</p>
              <p className="hero-name">{hero.heroName}</p>
            </div>
            <div className={`hero-portrait hero-${hero.id}-portrait border-07`}></div>
            <div className="hero-attributes">
              <p>Health</p>
              <p className={`health-value value-${hero.health} health-value-tier-c`}>{hero.health} HP</p>
              <p class="skill-cooldown-label">Skill Cooldown</p>
              <p className={`skill-cooldown-value value-${hero.skill.cooldown} skill-cooldown-tier-a`}>{hero.skill.cooldown} seconds</p>
            </div>
          </div>
          <div className="hero-skill-container">
            <p className="hero-skill-header">{hero.skill.name}</p>
            <div className={`hero-${hero.id}-skill hero-ability-icon border-13`}></div>
            <p className="hero-skill-description">{hero.skill.description}</p>
          </div>
          <div className="hero-passive-container">            
            <p className="hero-passive-header">{hero.passive.name}</p>
            <div className={`hero-${hero.id}-passive hero-ability-icon border-13`}></div>
            <p className="hero-passive-description">{hero.passive.description}</p>
          </div>
          <div className="hero-perks-container">
            <p className="hero-perks-header">Perks</p>
            <div className="hero-perk-item-container">
              {this.renderPerks(hero.id)}
            </div>
          </div>
        </div>
    );
  }

  renderPerks(careerId) {
    var hero = heroesData.find((hero) => { return hero.id === careerId});

    var perksHtml = [];
    var i = 1;

    hero.perks.forEach((perk) => { 
      perksHtml.push(<p key={`perkHeader${i}`} className="hero-perk-item-header"><span style={{fontSize: '40%', top: '-3px', position: 'relative', left: '-4px'}}>&#9670;</span>{perk.name}</p>);
      perksHtml.push(<p key={`perkDescription${i}`} className="hero-perk-item-description">{perk.description}</p>);    
      i++;
    });

    return perksHtml;
  }
}

export default HeroDetails;