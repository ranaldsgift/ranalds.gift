import React, {Component} from 'react';
import './BuildList.css';
import './BuildListItem.css';
import '../../assets/css/Talents.css';


class BuildListItem extends Component {
  constructor(props) {
    super(props);
    
    var careerNumber = Math.floor(Math.random() * 15 + 1);
    var talentIcon1 = Math.floor(Math.random() * 3 + 1);
    var talentIcon2 = Math.floor(Math.random() * 3 + 4);
    var talentIcon3 = Math.floor(Math.random() * 3 + 7);
    var talentIcon4 = Math.floor(Math.random() * 3 + 10);
    var talentIcon5 = Math.floor(Math.random() * 3 + 13);
    var talentIcon6 = Math.floor(Math.random() * 3 + 16);
    var careerString = careerNumber;
    if (careerNumber < 10) {
      careerString = "0" + careerNumber;
    }

    this.state = {
      career: careerString,
      talent1: talentIcon1,
      talent2: talentIcon2,
      talent3: talentIcon3,
      talent4: talentIcon4,
      talent5: talentIcon5,
      talent6: talentIcon6,
    }
  }
  
  render() {
    return (
<div className="build-list-item border-02 background7">
          <div className={`build-hero-icon hero-icon-${this.state.career} border-04`}></div>
          <p className="build-name">Yer Best Friend Kruber</p>
          <div className="build-description-container">
              <p className="build-hero">Mercenary</p>
              <p className="build-author">B-Fir3</p>
              <p className="date-modified">09/03/19</p>
          </div>
          <p></p>
          <div className="talents">
            <div className={`talent-icon talent-${this.state.career}0${this.state.talent1} talent-2`}></div>
            <div className={`talent-icon talent-${this.state.career}0${this.state.talent2} talent-2`}></div>
            <div className={`talent-icon talent-${this.state.career}0${this.state.talent3} talent-2 `}></div>
            <div className={`talent-icon talent-${this.state.career}${this.state.talent4} talent-2`}></div>
            <div className={`talent-icon talent-${this.state.career}${this.state.talent5} talent-3`}></div>
            <div className={`talent-icon talent-${this.state.career}${this.state.talent6} talent-1`}></div>
          </div>
          <div className="weapons">
            <div className="weapon-icon weapon-01 weapon-background border-10"></div>
            <div className="trait-icon trait-parry border-10"></div>
            <div className="weapon-icon weapon-02 weapon-background border-10"></div>
            <div className="trait-icon trait-conservative-shooter border-10"></div>
          </div>
          <div className="traits">
            <div className="trait-icon trait-barkskin border-10"></div>
            <div className="trait-icon trait-proxy border-10"></div>
            <div className="trait-icon trait-shrapnel border-10"></div>
          </div>
          <div className="build-footer">
              <p className="patch-number">Tank - Legend - v2.0.8</p>
              <div></div>
          </div>
        </div>
    );
  }
}

export default BuildListItem;