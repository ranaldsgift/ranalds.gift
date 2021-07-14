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
                dateModified: action.payload.dateModified,
                isDataLoadedUserBuilds: false,
                isDataLoadedLikedBuilds: false
            };
        case 'UPDATE_USER_BUILDS':
            return {...state, 
                userBuilds: action.payload.builds, 
                firstBuildDocUserBuilds: action.payload.firstBuildDoc,
                lastBuildDocUserBuilds: action.payload.lastBuildDoc, 
                currentPageUserBuilds: action.payload.currentPage, 
                isLastPageUserBuilds: action.payload.isLastPage, 
                isLoadingDataUserBuilds: action.payload.isLoadingData, 
                isDataLoadedUserBuilds: action.payload.isDataLoaded
            };
        case 'UPDATE_LIKED_BUILDS':
            return {...state, 
                likedBuilds: action.payload.builds, 
                firstBuildDocLikedBuilds: action.payload.firstBuildDoc,
                lastBuildDocLikedBuilds: action.payload.lastBuildDoc, 
                currentPageLikedBuilds: action.payload.currentPage, 
                isLastPageLikedBuilds: action.payload.isLastPage, 
                isLoadingDataLikedBuilds: action.payload.isLoadingData, 
                isDataLoadedLikedBuilds: action.payload.isDataLoaded
            };
        case 'UPDATE_USERNAME':
            return {...state, username: action.payload};
        case 'UPDATE_STEAM':
            return {...state, steam: action.payload};
        case 'UPDATE_DISCORD':
            return {...state, discord: action.payload};
        case 'UPDATE_YOUTUBE':
            return {...state, youtube: action.payload};
        case 'UPDATE_DIFFICULTY':
            return {...state, difficulty: action.payload, isDataLoadedLikedBuilds: false, isDataLoadedUserBuilds: false};
        case 'UPDATE_TWITCH':
            return {...state, twitchMode: action.payload, isDataLoadedLikedBuilds: false, isDataLoadedUserBuilds: false};
        case 'UPDATE_MISSION':
            return {...state, mission: action.payload, isDataLoadedLikedBuilds: false, isDataLoadedUserBuilds: false};
        case 'UPDATE_BOOKS':
            return {...state, book: action.payload, isDataLoadedLikedBuilds: false, isDataLoadedUserBuilds: false};
        case 'UPDATE_POTION':
            return {...state, potion: action.payload, isDataLoadedLikedBuilds: false, isDataLoadedUserBuilds: false};
        case 'UPDATE_ROLES':
            return {...state, roles: action.payload, isDataLoadedLikedBuilds: false, isDataLoadedUserBuilds: false};
        case 'UPDATE_SORTBY':
            return {...state, sortBy: action.payload, isDataLoadedLikedBuilds: false, isDataLoadedUserBuilds: false};
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
        sortBy: DataHelper.getSortByData()[0],
        userBuilds: [], 
        firstBuildDocUserBuilds: {},
        lastBuildDocUserBuilds: {}, 
        currentPageUserBuilds: 1, 
        isLastPageUserBuilds: true, 
        isLoadingDataUserBuilds: false, 
        isDataLoadedUserBuilds: false,
        likedBuilds: [], 
        firstBuildDocLikedBuilds: {},
        lastBuildDocLikedBuilds: {}, 
        currentPageLikedBuilds: 1, 
        isLastPageLikedBuilds: true, 
        isLoadingDataLikedBuilds: false, 
        isDataLoadedLikedBuilds: false
    });

    return (
        <AppContext.Provider value={stateHook}>
            {props.children}
        </AppContext.Provider>
    )
}