import React from 'react'

const UserContext = React.createContext();

export {UserContext}

function reducer(state, action) {
    switch(action.type) {
        case 'LOGIN_USER':
            return {...state, username: action.payload.username, email: action.payload.email};
        case 'UPDATE_USER_INFO':
            console.log('updating user state user context ' + action.payload.userId);
            return {...state, 
                userId: action.payload.userId, 
                username: action.payload.username, 
                steam: action.payload.steam, 
                twitch: action.payload.twitch, 
                dateCreated: action.payload.dateCreated, 
                dateModified: action.payload.dateModified 
            };
        default:
            throw new Error('Error updating User Page state.');
    }
}

export default function UserStore(props) {

    const stateHook = React.useReducer(reducer, {
        userId: '',
        username: '',
        steam: '',
        twitch: '',
        dateCreated: {},
        dateModified: {}
    });

    return (
        <UserContext.Provider value={stateHook}>
            {props.children}
        </UserContext.Provider>
    )
}