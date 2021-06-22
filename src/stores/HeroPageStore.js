import React from 'react'
import { AppContext } from './Store';
import {withRouter} from 'react-router';
import {meleeWeaponsData} from '../data/MeleeWeapons'
import {rangeWeaponsData} from '../data/RangeWeapons'
import { DataHelper } from '../utils/DataHelper';
import * as Constants from '../data/Constants';

const HeroPageContext = React.createContext();

export {HeroPageContext}

function heroPageReducer(state, action) {
    var newProperties = {...state.properties};
    var newTraits = {...state.traits};

    var meleeParam = action.payload.primary;
    var talentsParam = action.payload.talents;
    var rangeParam = action.payload.secondary;
    var necklaceParam = action.payload.necklace;
    var charmParam = action.payload.charm;
    var trinketParam = action.payload.trinket;

    var careerId = action.payload.careerId ? action.payload.careerId : 1;
    careerId = parseInt(careerId);
    var talents = [0,0,0,0,0,0];
    var meleeId = 1;
    var rangeId = 1;
    var meleeProperty1 = 1;
    var meleeProperty2 = 2;
    var meleeTrait = 1;
    var rangeProperty1 = 1;
    var rangeProperty2 = 2;
    var rangeTrait = 1;
    var necklaceProperty1 = 1;
    var necklaceProperty2 = 2;
    var necklaceTrait = 1;
    var charmProperty1 = 1;
    var charmProperty2 = 2;
    var charmTrait = 1;
    var trinketProperty1 = 2;
    var trinketProperty2 = 3;
    var trinketTrait = 1;
    var meleeParams, rangeParams, necklaceParams, charmParams, trinketParams = [];
    var hero = DataHelper.getCareer(careerId);

    switch(action.type) {
        case 'INIT_STATE_FROM_URL':
            if (typeof talentsParam != "undefined") {
                talents = talentsParam.length > 6 ? talentsParam.subString(0,6).split('').map((x) => { return parseInt(x); }) : talentsParam.split('').map((x) => { return parseInt(x); });
            }

            if (typeof meleeParam != "undefined") {
                meleeParams = meleeParam.split('-');
                meleeId = parseInt(meleeParams[0]);

                if (meleeParams.length > 1) {
                    meleeProperty1 = parseInt(meleeParams[1]);
                }
                if (meleeParams.length > 2) {
                    meleeProperty2 = parseInt(meleeParams[2]);
                }
                if (meleeParams.length > 3) {
                    meleeTrait = parseInt(meleeParams[3]);
                }
            }

            if (typeof rangeParam != "undefined") {
                rangeParams = rangeParam.split('-');
                rangeId = parseInt(rangeParams[0]);

                if (rangeParams.length > 1) {
                    rangeProperty1 = parseInt(rangeParams[1]);
                }
                if (rangeParams.length > 2) {
                    rangeProperty2 = parseInt(rangeParams[2]);
                }
                if (rangeParams.length > 3) {
                    rangeTrait = parseInt(rangeParams[3]);
                }
            }

            if (typeof necklaceParam != "undefined") {
                necklaceParams = necklaceParam.split('-');
                necklaceProperty1 = parseInt(necklaceParams[0]);

                if (necklaceParams.length > 1) {
                    necklaceProperty2 = parseInt(necklaceParams[1]);
                }
                if (necklaceParams.length > 2) {
                    necklaceTrait = parseInt(necklaceParams[2]);
                }
            }

            if (typeof charmParam != "undefined") {
                charmParams = charmParam.split('-');
                charmProperty1 = parseInt(charmParams[0]);

                if (charmParams.length > 1) {
                    charmProperty2 = parseInt(charmParams[1]);
                }
                if (charmParams.length > 2) {
                    charmTrait = parseInt(charmParams[2]);
                }
            }

            if (typeof trinketParam != "undefined") {
                trinketParams = trinketParam.split('-');
                trinketProperty1 = parseInt(trinketParams[0]);

                if (necklaceParams.length > 1) {
                    trinketProperty2 = parseInt(trinketParams[1]);
                }
                if (necklaceParams.length > 2) {
                    trinketTrait = parseInt(trinketParams[2]);
                }
            }

            var primary = DataHelper.getWeapon(meleeId);
            primary = primary ? primary : DataHelper.getPrimaryWeaponsForCareer(careerId)[0];

            var secondary = DataHelper.getWeapon(rangeId);//DataHelper.getWeaponByCodename(range.codeName);
            secondary = secondary ? secondary : DataHelper.getSecondaryWeaponsForCareer(careerId)[0];

/*             if (secondary.traitCategory === "range") {
                rangeTrait = rangeTrait > 2 ? rangeTrait === 3 || rangeTrait === 8 ? 1 : rangeTrait - 1 : rangeTrait;
            }
            else if (secondary.traitCategory === "magic") {
                rangeTrait = rangeTrait > 1 ? rangeTrait === 2 || rangeTrait === 7 ? 1 : rangeTrait > 7 ? rangeTrait - 2 : rangeTrait - 1 : rangeTrait;
            } */

            var properties = [meleeProperty1, meleeProperty2, rangeProperty1, rangeProperty2, necklaceProperty1, necklaceProperty2, charmProperty1, charmProperty2, trinketProperty1, trinketProperty2]
            var traits = [meleeTrait, rangeTrait, necklaceTrait, charmTrait, trinketTrait];
            
            return {...state,
                        careerId: careerId,
                        primaryWeaponId: primary.id,
                        secondaryWeaponId: secondary.id,
                        talents: talents,
                        properties: properties,
                        traits: traits,
                        isLoadedFromParams: true
                    };
        case 'INIT_STATE_FROM_OLD_URL':

            if (typeof talentsParam != "undefined") {
                talents = talentsParam.length > 6 ? talentsParam.subString(0,6).split('').map((x) => { return parseInt(x); }) : talentsParam.split('').map((x) => { return parseInt(x); });
            }

            if (typeof meleeParam != "undefined") {
                meleeParams = meleeParam.split(',');
                meleeId = parseInt(meleeParams[0]);

                if (meleeParams.length > 1) {
                    meleeProperty1 = parseInt(meleeParams[1]);
                }
                if (meleeParams.length > 2) {
                    meleeProperty2 = parseInt(meleeParams[2]);
                }
                if (meleeParams.length > 3) {
                    meleeTrait = parseInt(meleeParams[3]);
                }
            }

            if (typeof rangeParam != "undefined") {
                rangeParams = rangeParam.split(',');
                rangeId = parseInt(rangeParams[0]);

                if (rangeParams.length > 1) {
                    rangeProperty1 = parseInt(rangeParams[1]);
                }
                if (rangeParams.length > 2) {
                    rangeProperty2 = parseInt(rangeParams[2]);
                }
                if (rangeParams.length > 3) {
                    rangeTrait = parseInt(rangeParams[3]);
                }
            }

            if (typeof necklaceParam != "undefined") {
                necklaceParams = necklaceParam.split(',');
                necklaceProperty1 = parseInt(necklaceParams[0]);

                if (necklaceParams.length > 1) {
                    necklaceProperty2 = parseInt(necklaceParams[1]);
                }
                if (necklaceParams.length > 2) {
                    necklaceTrait = parseInt(necklaceParams[2]);
                }
            }

            if (typeof charmParam != "undefined") {
                charmParams = charmParam.split(',');
                charmProperty1 = parseInt(charmParams[0]);

                if (charmParams.length > 1) {
                    charmProperty2 = parseInt(charmParams[1]);
                }
                if (charmParams.length > 2) {
                    charmTrait = parseInt(charmParams[2]);
                }
            }

            if (typeof trinketParam != "undefined") {
                trinketParams = trinketParam.split(',');
                trinketProperty1 = parseInt(trinketParams[0]);

                if (necklaceParams.length > 1) {
                    trinketProperty2 = parseInt(trinketParams[1]);
                }
                if (necklaceParams.length > 2) {
                    trinketTrait = parseInt(trinketParams[2]);
                }
            }

            var heroWeapons = meleeWeaponsData.filter((weapon) => { return weapon.canWield.indexOf(hero.codeName) >= 0; });
            
            var melee = heroWeapons.find((weapon) => { return parseInt(weapon.id) === parseInt(meleeId); });
            if (!melee) {
                melee = heroWeapons[0];
            }

            primary = DataHelper.getWeaponByCodename(melee.codeName);
            primary = primary ? primary : DataHelper.getPrimaryWeaponsForCareer(careerId)[0];
            
            if (parseInt(careerId) !== 6 && parseInt(careerId) !== 16) {
                heroWeapons = rangeWeaponsData.filter((weapon) => { return weapon.canWield.indexOf(hero.codeName) >= 0; });
            }
            
            var range = heroWeapons.find((weapon) => { return parseInt(weapon.id) === parseInt(rangeId); });
            if (!range) {
                range = heroWeapons[0];
            }

            secondary = DataHelper.getWeaponByCodename(range.codeName);
            secondary = secondary ? secondary : DataHelper.getSecondaryWeaponsForCareer(careerId)[0];

            if (secondary.traitCategory === "range") {
                rangeTrait = rangeTrait > 2 ? rangeTrait === 3 || rangeTrait === 8 ? 1 : rangeTrait - 1 : rangeTrait;
            }
            else if (secondary.traitCategory === "magic") {
                rangeTrait = rangeTrait > 1 ? rangeTrait === 2 || rangeTrait === 7 ? 1 : rangeTrait > 7 ? rangeTrait - 2 : rangeTrait - 1 : rangeTrait;
            }

            properties = [meleeProperty1, meleeProperty2, rangeProperty1, rangeProperty2, necklaceProperty1, necklaceProperty2, charmProperty1, charmProperty2, trinketProperty1, trinketProperty2]
            traits = [meleeTrait, rangeTrait, necklaceTrait, charmTrait, trinketTrait];

            return {...state,
                        careerId: careerId,
                        primaryWeaponId: primary.id,
                        secondaryWeaponId: secondary.id,
                        talents: talents,
                        properties: properties,
                        traits: traits,
                        isLoadedFromParams: true
                    };
        case 'UPDATE_CAREER':
            careerId = parseInt(action.payload);
            var primaryWeapons = DataHelper.getPrimaryWeaponsForCareer(careerId);
            var secondaryWeapons = DataHelper.getSecondaryWeaponsForCareer(careerId);

            var oldPrimaryWeaponId = state.primaryWeaponId;
            var newPrimaryWeaponId = oldPrimaryWeaponId;

            if (!primaryWeapons.some((weapon) => {return weapon.id === oldPrimaryWeaponId;})) {
                newPrimaryWeaponId = primaryWeapons[0].id;
                newProperties[Constants.PRIMARY_PROPERTY1_INDEX] = 1;
                newProperties[Constants.PRIMARY_PROPERTY2_INDEX]  = 2;
                newTraits[Constants.PRIMARY_TRAIT_INDEX]  = 1;
            }

            var oldSecondaryWeaponId = state.secondaryWeaponId;
            var newSecondaryWeaponId = oldSecondaryWeaponId;

            if (!secondaryWeapons.some((weapon) => {return weapon.id === oldSecondaryWeaponId;})) {
                newSecondaryWeaponId = secondaryWeapons[0].id;
                newProperties[Constants.SECONDARY_PROPERTY1_INDEX] = 1;
                newProperties[Constants.SECONDARY_PROPERTY2_INDEX]  = 2;
                newTraits[Constants.SECONDARY_TRAIT_INDEX]  = 1;
            }

            return {...state, careerId: careerId, primaryWeaponId: newPrimaryWeaponId, secondaryWeaponId: newSecondaryWeaponId,
                    properties: newProperties, traits: newTraits, dirty: true};
            /* return {...state, careerId: action.payload}; */
        case 'UPDATE_TALENTS':
            var newTalents = state.talents;
            newTalents = newTalents[0] < 0 ? [0,0,0,0,0,0] : newTalents;
            newTalents[action.payload.tier-1] = action.payload.talent;
            return {...state, talents: newTalents};
        case 'UPDATE_ALL_TALENTS':
            return {...state, talents: action.payload};
        case 'UPDATE_ITEM_SELECT':
            switch (action.payload.type) {
                case 'primary':
                    return {...state, primaryWeaponId: parseInt(action.payload.id)};
                case 'secondary':
                    return {...state, secondaryWeaponId: parseInt(action.payload.id)};
                case 'necklace':
                    var necklace = {...state.necklace};
                    necklace.id = parseInt(action.payload.id);
                    return {...state, necklace: necklace};
                case 'charm':
                    var charm = {...state.charm};
                    charm.id = parseInt(action.payload.id);
                    return {...state, charm: charm};
                case 'trinket':
                    var trinket = {...state.trinket};
                    trinket.id = parseInt(action.payload.id);
                    return {...state, trinket: trinket};
                default:
                    throw new Error('Error updating Hero Page state.');
            }
        case 'UPDATE_PROPERTY_SELECT':
            newProperties[action.payload.index] = parseInt(action.payload.id);
            return {...state, properties: newProperties}
        case 'UPDATE_TRAIT_SELECT':
            newTraits[action.payload.index] = parseInt(action.payload.id);
            return {...state, traits: newTraits}
        default:
            throw new Error('Error updating Hero Page state.');
        }
}

function initState() {

}

export default withRouter(function HeroPageStore(props) {

    const stateHook = React.useReducer(heroPageReducer, {
        history: props.history,
        careerId: 1,
        primaryWeaponId: 14,
        secondaryWeaponId: 11,
        talents: [0,0,0,0,0,0],
        properties: [1,2,1,2,1,2,1,2,2,3],
        propertyValues: [0,0,0,0,0,0,0,0,0,0],
        traits: [1,1,1,1,1],
        isLoadedFromParams: false,
        melee: {
            id: 1,
            property1Id: 1,
            property1Value: 10,
            property2Id: 2,
            property2Value: 10,
            traitId: 1
        },
        range: {
            id: 1,
            property1Id: 1,
            property1Value: 10,
            property2Id: 2,
            property2Value: 10,
            traitId: 1
        },
        necklace: {
            id: 1,
            property1Id: 1,
            property1Value: 10,
            property2Id: 2,
            property2Value: 10,
            traitId: 1
        },
        charm: {
            id: 1,
            property1Id: 1,
            property1Value: 10,
            property2Id: 2,
            property2Value: 10,
            traitId: 1
        },
        trinket: {
            id: 1,
            property1Id: 1,
            property1Value: 10,
            property2Id: 2,
            property2Value: 10,
            traitId: 1
        }
    });

    return (
        <AppContext.Provider value={stateHook}>
            {props.children}
        </AppContext.Provider>
    )
});