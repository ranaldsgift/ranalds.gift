import React from 'react'
import { DataHelper } from '../utils/DataHelper';
import { AppContext } from './Store';

const UserViewContext = React.createContext();

export {UserViewContext}

function reducer(state, action) {
    switch(action.type) {
        case 'UPDATE_CAREER':
            return {...state, careerId: action.payload, isDataLoaded: false }
        case 'UPDATE_USER_INFO':
            return {...state, 
                userId: action.payload.userId, 
                username: action.payload.username, 
                email: action.payload.email, 
                steam: action.payload.steam, 
                discord: action.payload.discord, 
                twitch: action.payload.twitch, 
                youtube: action.payload.youtube, 
                dateCreated: action.payload.dateCreated, 
                dateModified: action.payload.dateModified 
            };
        case 'UPDATE_USER_BUILDS':
            return {...state, userBuilds: action.payload.builds, userBuildsLastDoc: action.payload.lastDoc, userBuildsPageCount: action.payload.totalPages, userBuildsCurrentPage: action.payload.currentPage};
        case 'UPDATE_LIKED_BUILDS':
            return {...state, likedBuilds: action.payload.builds, likedBuildsLastDoc: action.payload.lastDoc, likedBuildsPageCount: action.payload.totalPages, likedBuildsCurrentPage: action.payload.currentPage};
        case 'UPDATE_USERNAME':
            return {...state, username: action.payload};
        case 'UPDATE_STEAM':
            return {...state, steam: action.payload};
        case 'UPDATE_TWITCH':
            return {...state, twitch: action.payload};
        case 'UPDATE_DISCORD':
            return {...state, discord: action.payload};
        case 'UPDATE_YOUTUBE':
            return {...state, youtube: action.payload};
        case 'UPDATE_DIFFICULTY':
            return {...state, difficulty: action.payload};
        case 'UPDATE_TWITCH':
            return {...state, twitchMode: action.payload};
        case 'UPDATE_MISSION':
            return {...state, mission: action.payload};
        case 'UPDATE_BOOKS':
            return {...state, book: action.payload};
        case 'UPDATE_POTION':
            return {...state, potion: action.payload};
        case 'UPDATE_ROLES':
            return {...state, roles: action.payload};
        case 'UPDATE_SORTBY':
            return {...state, sortBy: action.payload};
        case 'UPDATE_FILTER_COLLAPSE_STATE':
            return {...state, collapseFilters: action.payload};
        default:
            throw new Error('Error updating User View Page state.');
    }
}

export default function UserViewStore(props) {

    const stateHook = React.useReducer(reducer, {
        userId: '',
        username: '',
        email: '',
        steam: '',
        twitch: '',
        discord: '',
        youtube: '',
        dateCreated: '',
        dateModified: '',
        difficulty: null,
        mission: null,
        potion: null,
        user: null,
        book: null,
        twitchMode: null,
        roles: [],
        collapseFilters: true,
        sortBy: DataHelper.getSortByData()[0]
    });

    return (
        <AppContext.Provider value={stateHook}>
            {props.children}
        </AppContext.Provider>
    )
}