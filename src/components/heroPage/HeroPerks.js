import React from "react"

function HeroPerks(props) {
    let hero = props.hero;

    return (
      <div className="hero-perks-container">
        <p className="hero-perks-header">Perks</p>
        <div className="hero-perk-item-container">
          {renderPerks(hero)}
        </div>
      </div>);

    function renderPerks(hero) {

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

export default HeroPerks;