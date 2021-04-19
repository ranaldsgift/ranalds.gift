import React from 'react'
import { AppContext } from './Store';

const RegisterPageContext = React.createContext();

export {RegisterPageContext}

function reducer(state, action) {
    switch(action.type) {
        case 'REGISTER_USER':
            return {...state, username: action.payload.username, email: action.payload.email};
        default:
            throw new Error('Error updating Register Page state.');
    }
}

export default function RegisterPageStore(props) {

    const stateHook = React.useReducer(reducer, {
        username: '',
        email: '',
        steam: '',
        twitch: '',
        reddit: ''
    });

    return (
        <AppContext.Provider value={stateHook}>
            {props.children}
        </AppContext.Provider>
    )
}