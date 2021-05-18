import React from 'react'
import { AppContext } from './Store';

const PagedBuildListContext = React.createContext();

export {PagedBuildListContext}

function reducer(state, action) {
    switch(action.type) {
        case 'UPDATE_CAREER_ID':
            return {...state, careerId: action.payload};
        case 'UPDATE_USER_ID':
            return {...state, userId: action.payload};
        case 'UPDATE_ROLE':
            return {...state, role: action.payload};   
        case 'UPDATE_DIFFICULTY':
            return {...state, difficulty: action.payload}; 
        case 'UPDATE_MISSION':
            return {...state, mission: action.payload}; 
        case 'UPDATE_POTION':
            return {...state, potion: action.payload}; 
        case 'UPDATE_SORTBY':
            return {...state, sortBy: action.payload};
        case 'UPDATE_PATCH':
            return {...state, patch: action.payload};
        case 'UPDATE_MELEE_ID':
            return {...state, meleeId: action.payload};   
        case 'UPDATE_RANGE_ID':
            return {...state, rangeId: action.payload}; 
        case 'UPDATE_MELEE_TRAIT_ID':
            return {...state, meleeTraitId: action.payload}; 
        case 'UPDATE_RANGE_TRAIT_ID':
            return {...state, rangeTraitId: action.payload}; 
        case 'UPDATE_NECKLACE_TRAIT_ID':
            return {...state, necklaceTraitId: action.payload}; 
        case 'UPDATE_CHARM_TRAIT_ID':
            return {...state, charmTraitId: action.payload}; 
        case 'UPDATE_TRINKET_TRAIT_ID':
            return {...state, trinketTraitId: action.payload}; 
        case 'UPDATE_FILTERS':
            return {...state, filters: action.payload}; 
        case 'UPDATE_PAGED_DATA':
            return {...state, filters: action.payload.filters, builds: action.payload.builds, lastBuildDoc: action.payload.lastBuildDoc, currentPage: action.payload.currentPage, totalPages: action.payload.totalPages, isDataLoaded: true }; 
        default:
            throw new Error('Error updating Build List state.');
    }
}

export default function PagedBuildListStore(props) {

    const stateHook = React.useReducer(reducer, {
        careerId: 0,
        userId: '',
        role: '',
        difficulty: '',
        mission: '',
        potion: '',
        sortBy: '',
        patch: '',
        meleeId: 0,
        rangeId: 0,
        meleeTraitId: 0,
        rangeTraitId: 0,
        necklaceTraitId: 0,
        charmTraitId: 0,
        trinketTraitId: 0,
        filters: {},
        builds: [],
        lastBuildDoc: {},
        currentPage: 1,
        totalPages: 1,
        isDataLoaded: false
    });

    return (
        <PagedBuildListContext.Provider value={stateHook}>
            {props.children}
        </PagedBuildListContext.Provider>
    )
}