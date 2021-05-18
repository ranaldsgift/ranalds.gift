import React from 'react'
import { db } from '../utils/Firebase';
import { AppContext } from './Store';

const BuildListPageContext = React.createContext();

export {BuildListPageContext}

function reducer(state, action) {
    switch(action.type) {
        case 'UPDATE_CAREER':
/*             if (state.careerId !== action.payload) {
                alert('updating build list based on new career ' + action.payload);
                let buildsQuery = db.collection('builds').where('careerId', '==', action.payload);

                buildsQuery.orderBy('dateModified', 'desc').limit(10).get().then((querySnapshot) => {
                    var builds = [];
                    querySnapshot.forEach((build) => {
                        builds.push({ id: build.id, data: build.data()});
                    });
                    alert('updating build list, count ' + builds.length);
                    return {...state, careerId: action.payload, builds: builds, buildsLastDoc: querySnapshot.docs[querySnapshot.docs.length-1], buildsCurrentPage: 1, pageCount: Math.round(querySnapshot.size / 10) + 1 };
                });
            }
            alert('updating career only'); */
            return {...state, careerId: action.payload, isDataLoaded: false }
        case 'UPDATE_BUILDS_DATA':
            return {...state, builds: action.payload.builds, buildsLastDoc: action.payload.lastDoc, buildsPageCount: action.payload.pageCount, buildsCurrentPage: action.payload.currentPage, isInitialized: true, isDataLoaded: true };
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
        description: '',
        difficulty: '',
        mission: '',
        potion: '',
        roles: [],
        patch: '',
        userId: '',
        username: '',
        isInitialized: false,
        isDataLoaded: false
    });

    return (
        <AppContext.Provider value={stateHook}>
            {props.children}
        </AppContext.Provider>
    )
}