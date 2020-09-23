import React from 'react'
import { AppContext } from './Store';
import {withRouter} from 'react-router';
import Firebase from '../utils/Firebase'

const HeroPageContext = React.createContext();

export {HeroPageContext}

function heroPageReducer(state, action) {
    switch(action.type) {
        case 'INIT_STATE_FROM_URL':
            var meleeParam = action.payload.melee;
            var talentsParam = action.payload.talents;
            var rangeParam = action.payload.range;
            var necklaceParam = action.payload.necklace;
            var charmParam = action.payload.charm;
            var trinketParam = action.payload.trinket;

            var careerId = action.payload.careerId ? action.payload.careerId : 1;
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
            var trinketProperty1 = 1;
            var trinketProperty2 = 2;
            var trinketTrait = 1;

            if (typeof talentsParam != "undefined") {
                talents = talentsParam.length > 6 ? talentsParam.subString(0,6).split('').map((x) => { return parseInt(x); }) : talentsParam.split('').map((x) => { return parseInt(x); });
            }

            if (typeof meleeParam != "undefined") {
                var meleeParams = meleeParam.split(',');
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
                var rangeParams = rangeParam.split(',');
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
                var necklaceParams = necklaceParam.split(',');
                necklaceProperty1 = parseInt(necklaceParams[0]);

                if (necklaceParams.length > 1) {
                    necklaceProperty2 = parseInt(necklaceParams[1]);
                }
                if (necklaceParams.length > 2) {
                    necklaceTrait = parseInt(necklaceParams[2]);
                }
            }

            if (typeof charmParam != "undefined") {
                var charmParams = charmParam.split(',');
                charmProperty1 = parseInt(charmParams[0]);

                if (charmParams.length > 1) {
                    charmProperty2 = parseInt(charmParams[1]);
                }
                if (charmParams.length > 2) {
                    charmTrait = parseInt(charmParams[2]);
                }
            }

            if (typeof trinketParam != "undefined") {
                var trinketParams = trinketParam.split(',');
                trinketProperty1 = parseInt(trinketParams[0]);

                if (necklaceParams.length > 1) {
                    trinketProperty2 = parseInt(trinketParams[1]);
                }
                if (necklaceParams.length > 2) {
                    trinketTrait = parseInt(trinketParams[2]);
                }
            }

            var properties = [meleeProperty1, meleeProperty2, rangeProperty1, rangeProperty2, necklaceProperty1, necklaceProperty2, charmProperty1, charmProperty2, trinketProperty1, trinketProperty2]
            var traits = [meleeTrait, rangeTrait, necklaceTrait, charmTrait, trinketTrait];

            state.history.push('/');
            
            return {...state,
                        careerId: careerId,
                        meleeId: meleeId,
                        rangeId: rangeId,
                        talents: talents,
                        properties: properties,
                        traits: traits
                    };
        case 'UPDATE_CAREER':
            return {...state, careerId: action.payload};
        case 'UPDATE_TALENTS':
            var newTalents = {...state.talents};
            newTalents = newTalents[0] < 0 ? [0,0,0,0,0,0] : newTalents;
            newTalents[action.payload.tier-1] = action.payload.talent;
            return {...state, talents: newTalents};
        case 'UPDATE_ALL_TALENTS':
            return {...state, talents: action.payload};
        case 'UPDATE_ITEM_SELECT':
            switch (action.payload.type) {
                case 'melee':
                    return {...state, meleeId: action.payload.id};
                case 'range':
                    return {...state, rangeId: action.payload.id};
                case 'necklace':
                    var necklace = {...state.necklace};
                    necklace.id = action.payload.id;
                    return {...state, necklace: necklace};
                case 'charm':
                    var charm = {...state.charm};
                    charm.id = action.payload.id;
                    return {...state, charm: charm};
                case 'trinket':
                    var trinket = {...state.trinket};
                    trinket.id = action.payload.id;
                    return {...state, trinket: trinket};
                default:
                    throw new Error('Error updating Hero Page state.');
            }
        case 'UPDATE_PROPERTY_SELECT':
            var newProperties = {...state.properties};
            newProperties[action.payload.index] = action.payload.id;
            return {...state, properties: newProperties}
        case 'UPDATE_TRAIT_SELECT':
            var newTraits = {...state.traits};
            newTraits[action.payload.index] = action.payload.id;
            return {...state, traits: newTraits}
        default:
            throw new Error('Error updating Hero Page state.');
        }
}

export default withRouter(function HeroPageStore(props) {

    const stateHook = React.useReducer(heroPageReducer, {
        history: props.history,
        careerId: 0,
        meleeId: 0,
        rangeId: 0,
        talents: [-1,0,0,0,0,0],
        properties: [1,2,1,2,1,2,1,2,1,2],
        propertyValues: [0,0,0,0,0,0,0,0,0,0],
        traits: [1,1,1,1,1],
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