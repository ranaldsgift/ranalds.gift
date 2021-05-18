import React from 'react'

const UserViewContext = React.createContext();

export {UserViewContext}

function reducer(state, action) {
    switch(action.type) {
        case 'UPDATE_USER_INFO':
            console.log('updating user page state ' + action.payload.userId);
            return {...state, 
                userId: action.payload.userId, 
                username: action.payload.username, 
                email: action.payload.email, 
                steam: action.payload.steam, 
                twitch: action.payload.twitch, 
                dateCreated: action.payload.dateCreated, 
                dateModified: action.payload.dateModified 
            };
        case 'UPDATE_USER_BUILDS':
            console.log('update user builds list ');
            console.log(action.payload);
            return {...state, userBuilds: action.payload.builds, userBuildsLastDoc: action.payload.lastDoc, userBuildsPageCount: action.payload.totalPages, userBuildsCurrentPage: action.payload.currentPage};
        case 'UPDATE_LIKED_BUILDS':
            
            return {...state, likedBuilds: action.payload.builds, likedBuildsLastDoc: action.payload.lastDoc, likedBuildsPageCount: action.payload.totalPages, likedBuildsCurrentPage: action.payload.currentPage};
            //return {...state, likedBuilds: action.payload};
        default:
            throw new Error('Error updating User Page state.');
    }
}

export default function UserViewStore(props) {

    const stateHook = React.useReducer(reducer, {
        userId: '',
        username: '',
        email: '',
        steam: '',
        twitch: '',
        dateCreated: '',
        dateModified: '',
        userBuilds: [],
        userBuildsLastDoc: {},
        userBuildsPageCount: 0,
        userBuildsCurrentPage: 1,
        likedBuilds: [],
        likedBuildsLastDoc: {},
        likedBuildsPageCount: 0,
        likedBuildsCurrentPage: 1,
        userFilters: [{field: 'userId', comparison: '==', value: 'il853JiLs8VoxVPRU97p0kxp8Ks2'}]
    });

    return (
        <UserViewContext.Provider value={stateHook}>
            {props.children}
        </UserViewContext.Provider>
    )
}