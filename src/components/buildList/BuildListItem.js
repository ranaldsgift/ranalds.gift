import React, {Component} from 'react';
import './BuildList.css';
import './BuildListItem.css';
import '../../assets/css/Talents.css';
import HeroTalentIcon from '../heroTalents/HeroTalentIcon';
import { Link } from 'react-router-dom';
import { DataHelper } from '../../utils/DataHelper';
import WeaponIcon from '../inventory/WeaponIcon';
import TraitIcon from '../traits/TraitIcon';
import history from '../../utils/History';
import BuildRating from '../buildPage/BuildRating';
import BuildListRating from './BuildListRating';


class BuildListItem extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    var buildModifiedDate = new Date(this.props.buildData.dateModified.seconds * 1000);
    
    var careerData = DataHelper.getCareer(this.props.buildData.careerId);
    var rangeType = (this.props.buildData.careerId === 6 || this.props.buildData.careerId === 16) ? "melee" : "range";
    var patchData = DataHelper.getPatchFromDateForType(buildModifiedDate, "Update");

    var primaryWeapon = DataHelper.getWeapon(this.props.buildData.primaryWeapon.id);
    var secondaryWeapon = DataHelper.getWeapon(this.props.buildData.secondaryWeapon.id);

    var lastUpdatedDayCount = DataHelper.getDaysSinceDate(buildModifiedDate)
    var lastUpdatedText = `${lastUpdatedDayCount} days ago`;

    var roleList = [];
    DataHelper.getRolesByIds(this.props.buildData.roles).forEach((role) => { roleList.push(role.name); })

    if (lastUpdatedDayCount === 0) {
      lastUpdatedText = `today`;
    }
    else if (lastUpdatedDayCount === 1) {
      lastUpdatedText = `${lastUpdatedDayCount} day ago`;
    }

    return (
      //<Link to={'/build/' + this.props.buildId + '/view'}>
        <div className="build-list-item" data-career={this.props.buildData.careerId} data-hero={this.props.buildData.heroId} data-build={this.props.buildId} onClick={this.handleBuildClick.bind(this)}>
          <div className={`build-hero-icon hero-icon-${this.props.buildData.careerId} border-04`}></div>
          <div className="build-description-container">
            <p className="build-name header-underline">{this.props.buildData.name}</p>
            <p className="build-hero">{careerData.name}</p>
            <div className="build-creation-info">
              <span className="build-author-by">by</span><Link as={Link} to={`/user/${this.props.buildData.userId}/view`} className="build-author">{this.props.buildData.username}</Link><span className="date-updated">updated {lastUpdatedText}</span>
            </div> {/* //<Link as={Link} to={`/user/${this.props.buildData.userId}/view`} className="">{this.props.buildData.username}</Link></span> */}
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