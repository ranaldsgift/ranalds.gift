import React from "react"

function HeroPassive(props) {
    let hero = props.hero;

    return (
      <div className="hero-passive-container">            
        <p className="hero-passive-header">{hero.passive.name}</p>
        <div className={`hero-${hero.id}-passive hero-ability-icon border-13`}></div>
        <p className="hero-passive-description">{hero.passive.description}</p>
      </div>);
}

export default HeroPassive;