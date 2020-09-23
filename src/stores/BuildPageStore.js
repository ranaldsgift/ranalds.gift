import React from 'react'
import { AppContext } from './Store';
import {db} from '../utils/Firebase'

const BuildPageContext = React.createContext();

export {BuildPageContext}

function buildPageReducer(state, action) {
    console.log('build page reducer');
    console.log(action);

    switch(action.type) {
        case 'UPDATE_CAREER':
            return {...state, careerId: action.payload};
        case 'UPDATE_TALENTS':
            var newTalents = {...state.talents};
            newTalents[action.payload.tier-1] = action.payload.talent;
            return {...state, talents: newTalents};
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
        case 'SAVE_BUILD':
                console.log(state);
            var buildsQuery = db.collection("buildsTable").limit(10);
            buildsQuery.get().then((queryRef) => { 
                console.log('builds');
                console.log(queryRef.docs[0].data());
                console.log(queryRef.docs[0].id);
            });
            return {...state};
        default:
            throw new Error('Error updating Build Page state.');
    }
}

export default function BuildPageStore(props) {
    const stateHook = React.useReducer(buildPageReducer, {
        careerId: 1,
        meleeId: 0,
        rangeId: 0,
        talents: [-1,0,0,0,0,0],
        properties: [1,2,1,2,1,2,1,2,1,2],
        propertyValues: [0,0,0,0,0,0,0,0,0,0],
        traits: [1,1,1,1,1]
    });

    return (
        <AppContext.Provider value={stateHook}>
            {props.children}
        </AppContext  .Provider>
    )
}