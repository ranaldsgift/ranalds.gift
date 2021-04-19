import React from 'react'
import { AppContext } from './Store';

const LoginPageContext = React.createContext();

export {LoginPageContext}

function reducer(state, action) {
    switch(action.type) {
        case 'LOGIN':
            return {...state, username: action.payload.username, email: action.payload.email};
        default:
            throw new Error('Error updating Login Page state.');
    }
}

export default function LoginPageStore(props) {

    const stateHook = React.useReducer(reducer, {
        username: '',
        email: ''
    });

    return (
        <AppContext.Provider value={stateHook}>
            {props.children}
        </AppContext.Provider>
    )
}