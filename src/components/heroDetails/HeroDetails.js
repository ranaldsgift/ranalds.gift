import React, {Component} from 'react';
import './HeroDetails.css';
import {heroesData} from '../../data/Heroes'
import { AppContext } from '../../stores/Store';

class HeroDetails extends Component {
  static contextType = AppContext;
  render() {
    const [state] = this.context;
    var careerId = this.props.careerId ? this.props.careerId : 1;
    var hero = heroesData.find((hero) => { return hero.id === parseInt(careerId)});
    hero = hero ? hero : heroesData[0];

    let healthValue = hero.health;
    let bonusHealth = 0;

    if (state.properties[4] === 3 || state.properties[5] === 3) {
      bonusHealth = hero.health * 0.2;
    }

    let healthBar = <div className="stat-container"><span className={`health-value value-${hero.health} health-value-tier-c`}>{hero.health.toString() + ' HP'}</span></div>
    
    if (bonusHealth > 0) {
      healthValue += bonusHealth;
      console.log('health value --------' + healthValue);
      healthBar = <div className="stat-container"><span className={`health-value value-${hero.health} health-value-tier-c`}>{hero.health.toString() + ' HP'}<span className="bonus-health">&nbsp;{'+' + bonusHealth.toString() + ' HP'}</span></span></div>
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
                <div className="cooldown-bar" data-value={hero.skill.cooldown}>
                  <div className="stat-container"><span className={`skill-cooldown-value value-${hero.skill.cooldown} skill-cooldown-tier-a`}>{hero.skill.cooldown.toString() + 's'}</span></div>
                </div>
              </div>
              
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