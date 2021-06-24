import React from 'react'

const UserContext = React.createContext();

export {UserContext}

function reducer(state, action) {
    var likedBuilds = state.likedBuilds;
    switch(action.type) {
        case 'LOGIN_USER':
            return {...state, username: action.payload.username, email: action.payload.email};
        case 'ADD_LIKED_BUILD':
            likedBuilds = likedBuilds ? likedBuilds : [];            
            likedBuilds.push(action.payload);
            return {...state, likedBuilds: likedBuilds};
        case 'REMOVE_LIKED_BUILD':
            likedBuilds = likedBuilds ? likedBuilds : [];

            var buildIndex = likedBuilds.indexOf(action.payload);
            if (buildIndex >= 0) {
                likedBuilds.splice(buildIndex, 1);
            }
            return {...state, likedBuilds: likedBuilds};
        case 'UPDATE_USER_INFO':
            return {...state, 
                userId: action.payload.userId, 
                username: action.payload.username, 
                steam: action.payload.steam, 
                twitch: action.payload.twitch, 
                likedBuilds: action.payload.likedBuilds,
                dateCreated: action.payload.dateCreated, 
                dateModified: action.payload.dateModified 
            };
        case 'TOGGLE_BACKGROUND':
            return {...state, 
                    showVideo: !state.showVideo}
                ;
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
        showVideo: true,
        likedBuilds: [],
        dateCreated: {},
        dateModified: {}
    });

    return (
        <UserContext.Provider value={stateHook}>
            {props.children}
        </UserContext.Provider>
    )
}