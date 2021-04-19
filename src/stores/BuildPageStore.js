import React from 'react'
import { AppContext } from './Store';
import { PatchList } from '../data/PatchList';

const BuildPageContext = React.createContext();

export {BuildPageContext}

function buildPageReducer(state, action) {
    console.log('build page reducer');
    console.log(action);

    switch(action.type) {
        case 'INIT_STATE_FROM_DATA':
            var build = action.payload.data();
            var buildId = action.payload.id;
            var dateModified = new Date(build.dateModified.seconds * 1000);

            var filteredPatchList = PatchList.filter((patch) => {
                return patch.date < dateModified;
            });

            console.log('filtered patches');
            console.log(filteredPatchList[filteredPatchList.length - 1]);

            var patch = filteredPatchList[filteredPatchList.length - 1].number;

            return {...state,
                buildId: buildId,
                careerId: build.careerId,
                meleeId: build.meleeId,
                rangeId: build.rangeId,
                talents: [
                    build.talent1,
                    build.talent2,
                    build.talent3,
                    build.talent4,
                    build.talent5,
                    build.talent6
                ],
                properties: [
                    build.meleeProperty1,
                    build.meleeProperty2,
                    build.rangeProperty1,
                    build.rangeProperty2,
                    build.necklaceProperty1,
                    build.necklaceProperty2,
                    build.charmProperty1,
                    build.charmProperty2,
                    build.trinketProperty1,
                    build.trinketProperty2
                ],
                traits: [
                    build.meleeTrait,
                    build.rangeTrait,
                    build.necklaceTrait,
                    build.charmTrait,
                    build.trinketTrait
                ],
                name: build.name,
                description: build.description,
                difficulty: build.difficulty,
                mission: build.mission,
                potion: build.potion,
                roles: build.roles,
                likes: build.likes,
                patch: patch,
                userId: build.userId,
                username: build.username,
                videos: build.videos,
                dirty: false,
                isFromDb: true,
                createBuild: false,
                isLiked: false
            };
        case 'UPDATE_PROPERTY_SELECT':
            var newProperties = {...state.properties};
            newProperties[action.payload.index] = parseInt(action.payload.id);
            return {...state, properties: newProperties, dirty: true}
        case 'UPDATE_TRAIT_SELECT':
            var newTraits = {...state.traits};
            newTraits[action.payload.index] = parseInt(action.payload.id);
            return {...state, traits: newTraits, dirty: true}
        case 'UPDATE_CAREER':
            return {...state, careerId: parseInt(action.payload), dirty: true};
        case 'UPDATE_TALENTS':
            var newTalents = {...state.talents};
            newTalents[action.payload.tier-1] = parseInt(action.payload.talent);
            return {...state, talents: newTalents, dirty: true};
        case 'UPDATE_ITEM_SELECT':
            switch (action.payload.type) {
                case 'melee':
                    return {...state, meleeId: parseInt(action.payload.id), dirty: true};
                case 'range':
                    return {...state, rangeId: parseInt(action.payload.id), dirty: true};
                case 'necklace':
                    var necklace = {...state.necklace};
                    necklace.id = parseInt(action.payload.id);
                    return {...state, necklace: necklace, dirty: true};
                case 'charm':
                    var charm = {...state.charm};
                    charm.id = parseInt(action.payload.id);
                    return {...state, charm: charm, dirty: true};
                case 'trinket':
                    var trinket = {...state.trinket};
                    trinket.id = parseInt(action.payload.id);
                    return {...state, trinket: trinket, dirty: true};
                default:
                    throw new Error('Error updating Hero Page state.');
            }
        case 'UPDATE_DIFFICULTY':
            return {...state, difficulty: action.payload, dirty: true};
        case 'UPDATE_MISSION':
            return {...state, mission: action.payload, dirty: true};
        case 'UPDATE_POTION':
            return {...state, potion: action.payload, dirty: true};
        case 'UPDATE_ROLES':
            return {...state, roles: action.payload, dirty: true};
        case 'UPDATE_DESCRIPTION':
            return {...state, description: action.payload, dirty: true};
        case 'UPDATE_NAME':
            return {...state, name: action.payload, dirty: true};
        case 'UPDATE_DIRTY':
            return {...state, dirty: action.payload};
        case 'UPDATE_LIKES':
            return {...state, likes: action.payload};
        case 'UPDATE_READONLY':
            return {...state, readonly: action.payload};
        case 'UPDATE_SIMILAR_BUILDS':
            return {...state, similarBuilds: action.payload};
        case 'UPDATE_USER_BUILDS':
            return {...state, userBuilds: action.payload};
        case 'UPDATE_CREATE_BUILD_STATE':
            return {...state, createBuild: action.payload, readonly: !action.payload};
        case 'UPDATE_AUTHOR':
            return {...state, createBuild: action.payload, readonly: !action.payload};
        case 'UPDATE_LIKE_STATE':
/*             var likeState = {...state.isLiked};
            if (likeState !== action.payload) {
                switch (action.payload) {
                    case true:
                        var likeCount = state.likes + 1;
                        console.log('like count ' + likeCount);
                        return {...state, isLiked: action.payload, likes: likeCount};
                    case false:
                        var likeCount = state.likes - 1;
                        console.log('like count ' + likeCount);
                        return {...state, isLiked: action.payload, likes: likeCount};
                }
            } */
            return {...state, isLiked: action.payload.isLiked, likes: action.payload.likes};
        default:
            throw new Error('Error updating Build Page state.');
    }
}

export default function BuildPageStore(props) {
    const stateHook = React.useReducer(buildPageReducer, {
        buildId: 0,
        careerId: 1,
        meleeId: 0,
        rangeId: 0,
        talents: [-1,0,0,0,0,0],
        properties: [1,2,1,2,1,2,1,2,1,2],
        propertyValues: [0,0,0,0,0,0,0,0,0,0],
        traits: [1,1,1,1,1],
        name: '',
        description: '',
        difficulty: 'Difficulty',
        mission: 'Mission',
        potion: 'Potion',
        roles: [],
        likes: [],
        patch: '',
        userId: '',
        username: '',
        videos: [],
        dirty: false,
        readonly: true,
        similarBuilds: [],
        userBuilds: [],
        isFromDb: false,
        createBuild: false,
        isLiked: false
    });

    return (
        <AppContext.Provider value={stateHook}>
            {props.children}
        </AppContext.Provider>
    )
}