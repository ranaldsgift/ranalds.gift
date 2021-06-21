import React from 'react'
import { DataHelper } from '../utils/DataHelper';
import { db } from '../utils/Firebase';
import { AppContext } from './Store';

const BuildListPageContext = React.createContext();

export {BuildListPageContext}

function reducer(state, action) {
    switch(action.type) {
        case 'UPDATE_CAREER':
            return {...state, careerId: action.payload, isDataLoaded: false }
        case 'UPDATE_BUILDS_DATA':
            return {...state, builds: action.payload.builds, buildsLastDoc: action.payload.lastDoc, buildsPageCount: action.payload.pageCount, buildsCurrentPage: action.payload.currentPage, isInitialized: true, isDataLoaded: true };
        case 'UPDATE_DIFFICULTY':
            return {...state, difficulty: action.payload, dirty: true};
        case 'UPDATE_TWITCH':
            return {...state, twitchMode: action.payload, dirty: true};
        case 'UPDATE_MISSION':
            return {...state, mission: action.payload, dirty: true};
        case 'UPDATE_BOOKS':
            return {...state, book: action.payload, dirty: true};
        case 'UPDATE_POTION':
            return {...state, potion: action.payload, dirty: true};
        case 'UPDATE_ROLES':
            return {...state, roles: action.payload, dirty: true};
        case 'UPDATE_USER':
            return {...state, user: action.payload, dirty: true};
        case 'UPDATE_SORTBY':
            return {...state, sortBy: action.payload, dirty: true};
        case 'UPDATE_FILTER_COLLAPSE_STATE':
            return {...state, collapseFilters: action.payload};
        default:
            throw new Error('Error updating Build List Page state.');
    }
}

export default function BuildListPageStore(props) {

    const stateHook = React.useReducer(reducer, {
        builds: [],
        buildsLastDocument: {},
        buildsCurrentPage: 0,
        buildsCount: 0,
        careerId: 0,
        meleeId: 0,
        meleeProperty1: 0,
        meleeProperty2: 0,
        meleeTrait: 0,
        rangeId: 0,
        rangeProperty1: 0,
        rangeProperty2: 0,
        rangeTrait: 0,
        necklaceProperty1: 0,
        necklaceProperty2: 0,
        necklaceTrait: 0,
        charmProperty1: 0,
        charmProperty2: 0,
        charmTrait: 0,
        trinketProperty1: 0,
        trinketProperty2: 0,
        trinketTrait: 0,
        talent1: 0,
        talent2: 0,
        talent3: 0,
        talent4: 0,
        talent5: 0,
        talent6: 0,
        name: '',
        description: null,
        difficulty: null,
        mission: null,
        potion: null,
        user: null,
        book: null,
        twitchMode: null,
        sortBy: DataHelper.getSortByData()[0],
        roles: [],
        patch: '',
        userId: '',
        username: '',
        isInitialized: false,
        isDataLoaded: false,
        collapseFilters: true
    });

    return (
        <AppContext.Provider value={stateHook}>
            {props.children}
        </AppContext.Provider>
    )
}