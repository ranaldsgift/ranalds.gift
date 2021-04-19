import React, {Component} from 'react';
import './BuildList.css';
import './BuildListItem.css';
import '../../assets/css/Talents.css';
import HeroTalentIcon from '../heroTalents/HeroTalentIcon';
import { Link } from 'react-router-dom';
import { DataHelper } from '../../utils/DataHelper';
import WeaponIcon from '../inventory/WeaponIcon';
import TraitIcon from '../traits/TraitIcon';


class BuildListItem extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    var buildModifiedDate = new Date(this.props.buildData.dateModified.seconds * 1000);
    
    var careerData = DataHelper.getCareer(this.props.buildData.careerId);
    var rangeType = (this.props.buildData.careerId === 6 || this.props.buildData.careerId === 16) ? "melee" : "range";
    var patchData = DataHelper.getPatchFromDate(buildModifiedDate);

    return (
      <Link to={'/build/' + this.props.buildId + '/view'}>
        <div className="build-list-item border-02 background7">
          <div className={`build-hero-icon hero-icon-${this.props.buildData.careerId} border-04`}></div>
          <div className="build-description-container">
            <p className="build-name header-underline">{this.props.buildData.name}</p>
            <p className="build-hero">{careerData.name}</p>
            <span className="build-author build-author-by">by<Link to={`/user/${this.props.buildData.userId}/view`} className="">{this.props.buildData.username}</Link></span>
          </div>
          <div className="talents">
            <HeroTalentIcon talentNumber={this.props.buildData.talent1} tier='1' careerId={this.props.buildData.careerId}></HeroTalentIcon>
            <HeroTalentIcon talentNumber={this.props.buildData.talent2} tier='2' careerId={this.props.buildData.careerId}></HeroTalentIcon>
            <HeroTalentIcon talentNumber={this.props.buildData.talent3} tier='3' careerId={this.props.buildData.careerId}></HeroTalentIcon>
            <HeroTalentIcon talentNumber={this.props.buildData.talent4} tier='4' careerId={this.props.buildData.careerId}></HeroTalentIcon>
            <HeroTalentIcon talentNumber={this.props.buildData.talent5} tier='5' careerId={this.props.buildData.careerId}></HeroTalentIcon>
            <HeroTalentIcon talentNumber={this.props.buildData.talent6} tier='6' careerId={this.props.buildData.careerId}></HeroTalentIcon>
          </div>
          <div className="weapons">
            <WeaponIcon id={this.props.buildData.meleeId} type="melee"></WeaponIcon>
            <TraitIcon id={this.props.buildData.meleeTrait} type="melee"></TraitIcon>
            <WeaponIcon id={this.props.buildData.rangeId} type={rangeType}></WeaponIcon>            
            <TraitIcon id={this.props.buildData.rangeTrait} type={rangeType}></TraitIcon>
          </div>
          <div className="traits">
            <TraitIcon id={this.props.buildData.necklaceTrait} type="necklace"></TraitIcon>
            <TraitIcon id={this.props.buildData.charmTrait} type="charm"></TraitIcon>
            <TraitIcon id={this.props.buildData.trinketTrait} type="trinket"></TraitIcon>
          </div>
          <div className="build-footer">
              <p className="roles">{this.props.buildData.roles.join(' / ')}</p>
              <p className="patch-number">Patch {patchData.number}</p>
          </div>
        </div>
      </Link>
    );
  }
}

export default BuildListItem;