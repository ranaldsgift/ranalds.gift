import React, {Component} from 'react';
import './BuildList.css';
import './BuildListItem.css';
import '../../assets/css/Talents.css';
import HeroTalentIcon from '../heroTalents/HeroTalentIcon';
import { DataHelper } from '../../utils/DataHelper';
import WeaponIcon from '../inventory/WeaponIcon';
import TraitIcon from '../traits/TraitIcon';
import history from '../../utils/History';
import BuildListRating from './BuildListRating';
import BuildCreationInfo from '../buildPage/BuildCreationInfo';


class BuildListItem extends Component {  
  render() {
    var buildModifiedDate = new Date(this.props.buildData.dateModified.seconds * 1000);
    
    var careerData = DataHelper.getCareer(this.props.buildData.careerId);
    var patchData = DataHelper.getPatchFromDateForType(buildModifiedDate, "Update");

    var primaryWeapon = DataHelper.getWeapon(this.props.buildData.primaryWeapon.id);
    var secondaryWeapon = DataHelper.getWeapon(this.props.buildData.secondaryWeapon.id);

    var roleList = [];
    DataHelper.getRolesByIds(this.props.buildData.roles).forEach((role) => { roleList.push(role.name); })

    return (
      //<Link to={'/build/' + this.props.buildId + '/view'}>
        <div className="build-list-item" data-career={this.props.buildData.careerId} data-hero={this.props.buildData.heroId} data-build={this.props.buildId} onClick={this.handleBuildClick.bind(this)}>
          <div className={`build-hero-icon hero-icon-${this.props.buildData.careerId} border-04`}></div>
          <div className="build-description-container">
            <p className="build-name header-underline">{this.props.buildData.name}</p>
            <p className="build-hero">{careerData.name}</p>
            <BuildCreationInfo dateModified={buildModifiedDate} userId={this.props.buildData.userId} username={this.props.buildData.username}></BuildCreationInfo>
          </div>
          <BuildListRating likeCount={this.props.buildData.likeCount}></BuildListRating>
          <div className="talents">
            <HeroTalentIcon talentNumber={this.props.buildData.talent1} tier='1' careerId={this.props.buildData.careerId}></HeroTalentIcon>
            <HeroTalentIcon talentNumber={this.props.buildData.talent2} tier='2' careerId={this.props.buildData.careerId}></HeroTalentIcon>
            <HeroTalentIcon talentNumber={this.props.buildData.talent3} tier='3' careerId={this.props.buildData.careerId}></HeroTalentIcon>
            <HeroTalentIcon talentNumber={this.props.buildData.talent4} tier='4' careerId={this.props.buildData.careerId}></HeroTalentIcon>
            <HeroTalentIcon talentNumber={this.props.buildData.talent5} tier='5' careerId={this.props.buildData.careerId}></HeroTalentIcon>
            <HeroTalentIcon talentNumber={this.props.buildData.talent6} tier='6' careerId={this.props.buildData.careerId}></HeroTalentIcon>
          </div>
          <div className="weapons">
            <WeaponIcon id={primaryWeapon.id} slot={"primary"}></WeaponIcon>
            <TraitIcon id={this.props.buildData.primaryWeapon.traitId} type={primaryWeapon.traitCategory}></TraitIcon>
            <WeaponIcon id={secondaryWeapon.id} slot={"secondary"}></WeaponIcon>            
            <TraitIcon id={this.props.buildData.secondaryWeapon.traitId} type={secondaryWeapon.traitCategory}></TraitIcon>
          </div>
          <div className="traits">
            <TraitIcon id={this.props.buildData.necklace.traitId} type="necklace"></TraitIcon>
            <TraitIcon id={this.props.buildData.charm.traitId} type="charm"></TraitIcon>
            <TraitIcon id={this.props.buildData.trinket.traitId} type="trinket"></TraitIcon>
          </div>
          <div className="build-footer">
              <p className="roles">{roleList.join(' / ')}</p>
              <p className="patch-number">{`Update ${patchData.number}`}</p>
          </div>
        </div>
      //</Link>
    );
  }

  handleBuildClick(e) {
    if (e.target.classList.contains('build-author')) {
      return;
    }
    var buildId = e.currentTarget.dataset.build;
    history.push(`/build/${buildId}/view`)
  }
}

export default BuildListItem;