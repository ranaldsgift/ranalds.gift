import React from 'react'
import { AppContext } from './Store';

const BuildsListPageContext = React.createContext();

export {BuildsListPageContext}

function reducer(state, action) {
    switch(action.type) {
        case 'UPDATE_CAREER':
            return {...state, careerId: action.payload.careerId};
        default:
            throw new Error('Error updating Build List Page state.');
    }
}

export default function BuildsListPageStore(props) {

    const stateHook = React.useReducer(reducer, {
        careerId: 1
    });

    return (
        <AppContext.Provider value={stateHook}>
            {props.children}
        </AppContext.Provider>
    )
}