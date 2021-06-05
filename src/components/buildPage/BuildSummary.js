import React, {Component} from 'react';
import { AppContext } from '../../stores/Store';
import './BuildSummary.css';
import {heroesData} from '../../data/Heroes'
import {weaponsData} from '../../data/Weapons'
import WeaponIcon from '../inventory/WeaponIcon';
import * as Constants from '../../data/Constants';
import { DataHelper } from '../../utils/DataHelper';
import TraitIcon from '../traits/TraitIcon';

class BuildSummary extends Component {
    static contextType = AppContext;
  render() {
    const [state] = this.context;

    var hero = heroesData.find((hero) => { return parseInt(hero.id) === parseInt(state.careerId); });
    hero = hero ? hero : heroesData[0];
    
    var primaryWeapons = DataHelper.getPrimaryWeaponsForCareer(state.careerId);
    var secondaryWeapons = DataHelper.getSecondaryWeaponsForCareer(state.careerId);
    
    var primaryWeapon = primaryWeapons.find((weapon) => { return parseInt(weapon.id) === parseInt(state.primaryWeaponId); });
    if (!primaryWeapon) {
        primaryWeapon = primaryWeapons[0];
    }
    
    var secondaryWeapon = secondaryWeapons.find((weapon) => { return parseInt(weapon.id) === parseInt(state.secondaryWeaponId); });
    if (!secondaryWeapon) {
        secondaryWeapon = secondaryWeapons[0];
    }
    
    var primaryWeaponProperty1 = DataHelper.getPropertyFromCategory(primaryWeapon.propertyCategory, state.properties[Constants.PRIMARY_PROPERTY1_INDEX]);
    var primaryWeaponProperty2 = DataHelper.getPropertyFromCategory(primaryWeapon.propertyCategory, state.properties[Constants.PRIMARY_PROPERTY2_INDEX]);

    var secondaryWeaponProperty1 = DataHelper.getPropertyFromCategory(secondaryWeapon.propertyCategory, state.properties[Constants.SECONDARY_PROPERTY1_INDEX]);
    var secondaryWeaponProperty2 = DataHelper.getPropertyFromCategory(secondaryWeapon.propertyCategory, state.properties[Constants.SECONDARY_PROPERTY2_INDEX]);

    var necklaceProperty1 = DataHelper.getPropertyFromCategory("necklace", state.properties[Constants.NECKLACE_PROPERTY1_INDEX]);
    var necklaceProperty2 = DataHelper.getPropertyFromCategory("necklace", state.properties[Constants.NECKLACE_PROPERTY2_INDEX]);

    var charmProperty1 = DataHelper.getPropertyFromCategory("charm", state.properties[Constants.CHARM_PROPERTY1_INDEX]);
    var charmProperty2 = DataHelper.getPropertyFromCategory("charm", state.properties[Constants.CHARM_PROPERTY2_INDEX]);

    var trinketProperty1 = DataHelper.getPropertyFromCategory("trinket", state.properties[Constants.TRINKET_PROPERTY1_INDEX]);
    var trinketProperty2 = DataHelper.getPropertyFromCategory("trinket", state.properties[Constants.TRINKET_PROPERTY2_INDEX]);

    var meleeModifier1 = primaryWeaponProperty1.name.toLowerCase().indexOf('stamina') >= 0 ? '' : '%';
    var meleeModifier2 = primaryWeaponProperty2.name.toLowerCase().indexOf('stamina') >= 0 ? '' : '%';

    var necklaceModifier1 = necklaceProperty1.name.toLowerCase().indexOf('stamina') >= 0 ? '' : '%';
    var necklaceModifier2 = necklaceProperty2.name.toLowerCase().indexOf('stamina') >= 0 ? '' : '%';

    var primaryWeaponTrait = DataHelper.getTraitFromCategory(primaryWeapon.traitCategory, state.traits[Constants.PRIMARY_TRAIT_INDEX]);
    var secondaryWeaponTrait = DataHelper.getTraitFromCategory(secondaryWeapon.traitCategory, state.traits[Constants.SECONDARY_TRAIT_INDEX]);
    var necklaceTrait = DataHelper.getTraitFromCategory("necklace", state.traits[Constants.NECKLACE_TRAIT_INDEX]);
    var charmTrait = DataHelper.getTraitFromCategory("charm", state.traits[Constants.CHARM_TRAIT_INDEX]);
    var trinketTrait = DataHelper.getTraitFromCategory("trinket", state.traits[Constants.TRINKET_TRAIT_INDEX]);

    var rangeType = "range";
    if (state.careerId === 6 || state.careerId === 16) {
        rangeType = "melee";
    }
      
    return (
        <div className="build-summary-container divider-03 top">
            <div className="build-melee-summary">
                <div className="item-summary-header">
                    <p className="item-name">{primaryWeapon.name}</p>
                    <p className="item-trait-name">{primaryWeaponTrait.name}</p>
                </div>
                <WeaponIcon key={primaryWeapon.id} id={primaryWeapon.id} slot={"primary"}></WeaponIcon>
                <TraitIcon id={primaryWeaponTrait.id} type={primaryWeapon.traitCategory}></TraitIcon>
                <div className="property-container">
                    <li className="item-property-1">{`+ ${parseFloat(primaryWeaponProperty1.max_value).toFixed(1)}${meleeModifier1} ${primaryWeaponProperty1.name}`}</li>
                    <li className="item-property-2">{`+ ${parseFloat(primaryWeaponProperty2.max_value).toFixed(1)}${meleeModifier2} ${primaryWeaponProperty2.name}`}</li>
                </div>
            </div>
            <div className="build-range-summary">
                <div className="item-summary-header">
                    <p className="item-name">{secondaryWeapon.name}</p>
                    <p className="item-trait-name">{secondaryWeaponTrait.name}</p>
                </div>
                <WeaponIcon key={secondaryWeapon.id} id={secondaryWeapon.id} slot={"secondary"}></WeaponIcon>
                <TraitIcon id={secondaryWeaponTrait.id} type={secondaryWeapon.traitCategory}></TraitIcon>
                <div className="property-container">                                                    
                    <li className="item-property-1">{`+ ${parseFloat(secondaryWeaponProperty1.max_value).toFixed(1)}% ${secondaryWeaponProperty1.name}`}</li>
                    <li className="item-property-2">{`+ ${parseFloat(secondaryWeaponProperty2.max_value).toFixed(1)}% ${secondaryWeaponProperty2.name}`}</li>
                </div>
            </div>
            <div className="build-jewelry-summary necklace-summary">
                <div className="item-summary-header">
                    <p className="item-name">Necklace</p>
                    <p className="item-trait-name">{necklaceTrait.name}</p>
                </div>
                <div className="jewelry-icon necklace-icon border-04"></div>
                <TraitIcon id={necklaceTrait.id} type="necklace"></TraitIcon>
                <div className="necklace-property-container property-container">                                    
                    <li className="item-property-1">{`+ ${parseFloat(necklaceProperty1.max_value).toFixed(1)}${necklaceModifier1} ${necklaceProperty1.name}`}</li>
                    <li className="item-property-2">{`+ ${parseFloat(necklaceProperty2.max_value).toFixed(1)}${necklaceModifier2} ${necklaceProperty2.name}`}</li>
                </div>
            </div>
            <div className="build-jewelry-summary charm-summary">
                <div className="item-summary-header">
                    <p className="item-name">Charm</p>
                    <p className="item-trait-name">{charmTrait.name}</p>
                </div>
                <div className="jewelry-icon charm-icon border-04"></div>
                <TraitIcon id={charmTrait.id} type="charm"></TraitIcon>
                <div className="charm-property-container property-container">                                    
                    <li className="item-property-1">{`+ ${parseFloat(charmProperty1.max_value).toFixed(1)}% ${charmProperty1.name}`}</li>
                    <li className="item-property-2">{`+ ${parseFloat(charmProperty2.max_value).toFixed(1)}% ${charmProperty2.name}`}</li>
                </div>
            </div>
            <div className="build-jewelry-summary trinket-summary">
                <div className="item-summary-header">
                    <p className="item-name">Trinket</p>
                    <p className="item-trait-name">{trinketTrait.name}</p>
                </div>
                <div className="jewelry-icon trinket-icon border-04"></div>
                <TraitIcon id={trinketTrait.id} type="trinket"></TraitIcon>
                <div className="trinket-property-container property-container">
                    <li className="item-property-1">{`+ ${parseFloat(trinketProperty1.max_value).toFixed(1)}% ${trinketProperty1.name}`}</li>
                    <li className="item-property-2">{`+ ${parseFloat(trinketProperty2.max_value).toFixed(1)}% ${trinketProperty2.name}`}</li>
                </div>
            </div>
        </div>
        );
      }
    }
    
    export default BuildSummary;