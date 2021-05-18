import React from 'react'
import { AppContext } from './Store';
import { PatchList } from '../data/PatchList';
import { DataHelper } from '../utils/DataHelper';

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

            
            // TODO - Confirm patch is first patch before date modified
            var patch = filteredPatchList[filteredPatchList.length - 1].number;

            return {...state,
                buildId: buildId,
                careerId: build.careerId,
                primaryWeaponId: build.primaryWeapon.id,
                secondaryWeaponId: build.secondaryWeapon.id,
                talents: [
                    build.talent1,
                    build.talent2,
                    build.talent3,
                    build.talent4,
                    build.talent5,
                    build.talent6
                ],
                properties: [
                    build.primaryWeapon.property1Id,
                    build.primaryWeapon.property2Id,
                    build.secondaryWeapon.property1Id,
                    build.secondaryWeapon.property2Id,
                    build.necklace.property1Id,
                    build.necklace.property2Id,
                    build.charm.property1Id,
                    build.charm.property2Id,
                    build.trinket.property1Id,
                    build.trinket.property2Id
                ],
                traits: [
                    build.primaryWeapon.traitId,
                    build.secondaryWeapon.traitId,
                    build.necklace.traitId,
                    build.charm.traitId,
                    build.trinket.traitId
                ],
                name: build.name,
                description: build.description,
                difficulties: DataHelper.getDifficultiesByIds(build.difficulties),
                missions: DataHelper.getMissionsByIds(build.missions),
                potions: DataHelper.getPotionsByIds(build.potions),
                roles: DataHelper.getRolesByIds(build.roles),
                books: DataHelper.getBooksByIds(build.books),
                likes: build.likes,
                likeCount: build.likeCount,
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
                case 'primary':
                    return {...state, primaryWeaponId: parseInt(action.payload.id), dirty: true};
                case 'secondary':
                    return {...state, secondaryWeaponId: parseInt(action.payload.id), dirty: true};
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
            return {...state, difficulties: action.payload, dirty: true};
        case 'UPDATE_MISSION':
            return {...state, missions: action.payload, dirty: true};
        case 'UPDATE_BOOKS':
            return {...state, books: action.payload, dirty: true};
        case 'UPDATE_POTION':
            return {...state, potions: action.payload, dirty: true};
        case 'UPDATE_ROLES':
            return {...state, roles: action.payload, dirty: true};
        case 'UPDATE_DESCRIPTION':
            return {...state, description: action.payload, dirty: true};
        case 'UPDATE_NAME':
            return {...state, name: action.payload, dirty: true};
        case 'UPDATE_DIRTY':
            return {...state, dirty: action.payload};
        case 'UPDATE_LIKES':
            return {...state, likes: action.payload.likes, likeCount: action.payload.likeCount, isLiked: action.payload.isLikedByUser};
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
        case 'UPDATE_USER_LIKE':
            return {...state, isLiked: action.payload};
        case 'ADD_USER_LIKE':
            return {...state, isLiked: true};
        case 'REMOVE_USER_LIKE':
            return {...state, isLiked: false};
        default:
            throw new Error('Error updating Build Page state.');
    }
}

export default function BuildPageStore(props) {
    const stateHook = React.useReducer(buildPageReducer, {
        buildId: 0,
        careerId: 1,
        primaryWeaponId: 14,
        secondaryWeaponId: 11,
        talents: [0,0,0,0,0,0],
        properties: [1,2,1,2,1,2,1,2,1,2],
        propertyValues: [0,0,0,0,0,0,0,0,0,0],
        traits: [1,1,1,1,1],
        name: '',
        description: '',
        difficulties: [],
        missions: [],
        potions: [],
        roles: [],
        likes: [],
        books: [],
        patch: '',
        userId: '',
        username: '',
        videos: [],
        dirty: false,
        readonly: true,
        similarBuilds: [],
        similarBuildsLastDocument: {},
        similarBuildsCurrentPage: 0,
        similarBuildsCount: 0,
        userBuilds: [],
        userBuildsLastDocument: {},
        userBuildsCurrentPage: 0,
        userBuildsCount: 0,
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