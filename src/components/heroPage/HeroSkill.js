import React from "react"

function HeroSkill(props) {
    let hero = props.hero;

    return (
        <div className="hero-skill-container">
          <p className="hero-skill-header">{hero.skill.name}</p>
          <div className={`hero-${hero.id}-skill hero-ability-icon border-13`}></div>
          <p className="hero-skill-description">{hero.skill.description}</p>
        </div>);
}

export default HeroSkill;