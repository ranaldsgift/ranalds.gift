import React, {Component} from 'react';
import { AppContext } from '../../stores/Store';
import './BuildSummary.css';
import {heroesData} from '../../data/Heroes'
import {meleeWeaponsData} from '../../data/MeleeWeapons'
import {rangeWeaponsData} from '../../data/RangeWeapons'
import { propertiesData } from '../../data/Properties';
import { traitsData } from '../../data/Traits';

class BuildSummary extends Component {
    static contextType = AppContext;
  render() {
    const [state] = this.context;

    var hero = heroesData.find((hero) => { return parseInt(hero.id) === parseInt(state.careerId); });
    hero = hero ? hero : heroesData[0];
    
    var heroWeapons = meleeWeaponsData.filter((weapon) => { return weapon.canWield.indexOf(hero.codeName) >= 0; });
    
    var melee = heroWeapons.find((weapon) => { return parseInt(weapon.id) === parseInt(state.meleeId); });
    if (!melee) {
        melee = heroWeapons[0];
    }
    
    if (parseInt(state.careerId) !== 6 && parseInt(state.careerId) !== 16) {
        heroWeapons = rangeWeaponsData.filter((weapon) => { return weapon.canWield.indexOf(hero.codeName) >= 0; });
    }
    
    var range = heroWeapons.find((weapon) => { return parseInt(weapon.id) === parseInt(state.rangeId); });
    if (!range) {
        range = heroWeapons[0];
    }
    
    var meleeProperty1 = propertiesData.melee.find((property) => { return parseInt(property.id) === parseInt(state.properties[0]); });
    var meleeProperty2 = propertiesData.melee.find((property) => { return parseInt(property.id) === parseInt(state.properties[1]); });

    if (parseInt(state.careerId) === 6  && melee.name.indexOf('Throwing Axes') >= 0) {
        meleeProperty1 = propertiesData.range.find((property) => { return parseInt(property.id) === parseInt(state.properties[0]); });
        meleeProperty2 = propertiesData.range.find((property) => { return parseInt(property.id) === parseInt(state.properties[1]); });
    }

    var rangeProperty1 = propertiesData.range.find((property) => { return parseInt(property.id) === parseInt(state.properties[2]); });
    var rangeProperty2 = propertiesData.range.find((property) => { return parseInt(property.id) === parseInt(state.properties[3]); });

    if (parseInt(state.careerId) === 6  && range.name.indexOf('Throwing Axes') < 0 || parseInt(state.careerId) === 16) {
        rangeProperty1 = propertiesData.melee.find((property) => { return parseInt(property.id) === parseInt(state.properties[2]); });
        rangeProperty2 = propertiesData.melee.find((property) => { return parseInt(property.id) === parseInt(state.properties[3]); });
    }

    var necklaceProperty1 = propertiesData.necklace.find((property) => { return parseInt(property.id) === parseInt(state.properties[4]); });
    var necklaceProperty2 = propertiesData.necklace.find((property) => { return parseInt(property.id) === parseInt(state.properties[5]); });

    var charmProperty1 = propertiesData.charm.find((property) => { return parseInt(property.id) === parseInt(state.properties[6]); });
    var charmProperty2 = propertiesData.charm.find((property) => { return parseInt(property.id) === parseInt(state.properties[7]); });

    var trinketProperty1 = propertiesData.trinket.find((property) => { return parseInt(property.id) === parseInt(state.properties[8]); });
    var trinketProperty2 = propertiesData.trinket.find((property) => { return parseInt(property.id) === parseInt(state.properties[9]); });

    var meleeModifier1 = meleeProperty1.name.toLowerCase().indexOf('stamina') >= 0 ? '' : '%';
    var meleeModifier2 = meleeProperty2.name.toLowerCase().indexOf('stamina') >= 0 ? '' : '%';

    var necklaceModifier1 = necklaceProperty1.name.toLowerCase().indexOf('stamina') >= 0 ? '' : '%';
    var necklaceModifier2 = necklaceProperty2.name.toLowerCase().indexOf('stamina') >= 0 ? '' : '%';

    var meleeTrait = traitsData.melee.find((trait) => { return parseInt(trait.id) === parseInt(state.traits[0]); });
    var rangeTrait = traitsData.range.find((trait) => { return parseInt(trait.id) === parseInt(state.traits[1]); });
    var necklaceTrait = traitsData.necklace.find((trait) => { return parseInt(trait.id) === parseInt(state.traits[2]); });
    var charmTrait = traitsData.charm.find((trait) => { return parseInt(trait.id) === parseInt(state.traits[3]); });
    var trinketTrait = traitsData.trinket.find((trait) => { return parseInt(trait.id) === parseInt(state.traits[4]); });
    
    if (parseInt(state.careerId) === 6 && melee.name.indexOf('Throwing Axes') >= 0) {
        meleeTrait = traitsData.range.find((trait) => { return parseInt(trait.id) === parseInt(state.traits[0]); });
    }

    if (parseInt(state.careerId) === 6 && range.name.indexOf('Throwing Axes') < 0 || parseInt(state.careerId) === 16) {
        rangeTrait = traitsData.melee.find((trait) => { return parseInt(trait.id) === parseInt(state.traits[1]); });
    }
      
    return (
        <div className="build-summary-container">
            <div className="build-melee-summary">
                <p className="item-summary-header">{melee.name}</p>
                <div className="weapon-background">
                    <div className={melee.codeName}>
                        <div className="weapon-icon" data-id={melee.id} data-type="melee"></div>
                    </div>
                </div>
                <div className={`trait-icon trait-${meleeTrait.name.toLowerCase().replace(/'/g,'').replace(/ /g, '-')} border-04`}></div>
                <div className="property-container">
                    <li className="item-property-1">{`+ ${parseFloat(meleeProperty1.max_value).toFixed(1)}${meleeModifier1} ${meleeProperty1.name}`}</li>
                    <li className="item-property-2">{`+ ${parseFloat(meleeProperty2.max_value).toFixed(1)}${meleeModifier2} ${meleeProperty2.name}`}</li>
                </div>
            </div>
            <div className="build-range-summary">
                <p className="item-summary-header">{range.name}</p>
                <div className="weapon-background">
                    <div className={range.codeName}>
                        <div className="weapon-icon" data-id={range.id} data-type="range"></div>
                    </div>
                </div>
                <div className={`trait-icon trait-${rangeTrait.name.toLowerCase().replace(/'/g,'').replace(/ /g, '-')} border-04`}></div>
                <div className="property-container">                                                    
                    <li className="item-property-1">{`+ ${parseFloat(rangeProperty1.max_value).toFixed(1)}% ${rangeProperty1.name}`}</li>
                    <li className="item-property-2">{`+ ${parseFloat(rangeProperty2.max_value).toFixed(1)}% ${rangeProperty2.name}`}</li>
                </div>
            </div>
            <div className="build-jewelry-summary">
                <div className="jewelry-icon necklace-icon border-04"></div>
                <div className={`trait-icon trait-${necklaceTrait.name.toLowerCase().replace(/'/g,'').replace(/ /g, '-')} border-04`}></div>
                <div className="necklace-property-container">                                    
                    <li className="item-property-1">{`+ ${parseFloat(necklaceProperty1.max_value).toFixed(1)}${necklaceModifier1} ${necklaceProperty1.name}`}</li>
                    <li className="item-property-2">{`+ ${parseFloat(necklaceProperty2.max_value).toFixed(1)}${necklaceModifier2} ${necklaceProperty2.name}`}</li>
                </div>
                <div className="jewelry-icon charm-icon border-04"></div>
                <div className={`trait-icon trait-${charmTrait.name.toLowerCase().replace(/'/g,'').replace(/ /g, '-')} border-04`}></div>
                <div className="charm-property-container">                                    
                    <li className="item-property-1">{`+ ${parseFloat(charmProperty1.max_value).toFixed(1)}% ${charmProperty1.name}`}</li>
                    <li className="item-property-2">{`+ ${parseFloat(charmProperty2.max_value).toFixed(1)}% ${charmProperty2.name}`}</li>
                </div>
                <div className="jewelry-icon trinket-icon border-04"></div>
                <div className={`trait-icon trait-${trinketTrait.name.toLowerCase().replace(/'/g,'').replace(/ /g, '-')} border-04`}></div>
                <div className="trinket-property-container">
                    <li className="item-property-1">{`+ ${parseFloat(trinketProperty1.max_value).toFixed(1)}% ${trinketProperty1.name}`}</li>
                    <li className="item-property-2">{`+ ${parseFloat(trinketProperty2.max_value).toFixed(1)}% ${trinketProperty2.name}`}</li>
                </div>
            </div>
        </div>
        );
      }
    }
    
    export default BuildSummary;