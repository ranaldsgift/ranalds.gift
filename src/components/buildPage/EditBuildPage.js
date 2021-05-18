import React, {useContext} from 'react';
import HeroTalents from '../heroTalents/HeroTalents'
import Inventory from '../inventory/Inventory'
import './EditBuildPage.css';
import HeroDetails from '../heroDetails/HeroDetails';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import BuildOptions from './BuildOptions';
import BuildSummary from './BuildSummary';
import { AppContext } from '../../stores/Store';
import HeroSelect from '../heroSelect/HeroSelect';
import { useParams, useRouteMatch } from 'react-router';
import { auth, db, firebase } from '../../utils/Firebase';
import * as Constants from '../../data/Constants';
import history from '../../utils/History';
import { UserContext } from '../../stores/UserStore';
import { Link } from 'react-router-dom';
import BuildInformation from './BuildInformation';

function EditBuildPage() {

        const [state, updateState] = useContext(AppContext);
        const userState = useContext(UserContext);

        const { path } = useRouteMatch();
        var paths = path.split('/');

        var currentPath = paths[paths.length-1];
        console.log('current path ' + currentPath);

        if (currentPath === 'edit') {
            if (state.readonly) {
                updateState({
                    type: "UPDATE_READONLY", 
                    payload: false
                });
            }
        } 
        else if (currentPath === 'view') {
            if (!state.readonly) {
                updateState({
                    type: "UPDATE_READONLY", 
                    payload: true
                });
            }
        }
        else if (currentPath === 'create') {
            if (!state.createBuild) {
                updateState({
                    type: "UPDATE_CREATE_BUILD_STATE",
                    payload: true
                });
            }
        }

        let params = useParams();

        console.log(!userState.userId);
        console.log('params build id: ' + params.buildId);

        var root = document.getElementById('root');
        root.dataset.pageName = 'editBuildPage';

        if (params.buildId && state.buildId !== params.buildId) {
            loadBuild(params.buildId);
        }

        function loadBuild(buildId) {
            console.log('loading build id ' + buildId);
            if (state.buildId !== buildId) {
                state.buildId = buildId;
            }

            db.collection('builds').doc(buildId).get().then((build) => {
                if (!build.data()) {
                    console.log('No build found with ID ' + buildId);
                    //history.push('/build/create');

                    //update state to indicate no build available in DB
                    return;
                }

                console.log('build loaded from db:');
                console.log(build.data());

                updateState({
                    type: 'INIT_STATE_FROM_DATA', 
                    payload: build
                });
            }).catch((error) => {
                console.error('Error retrieving data from DB:', error);
            });

        }

        function handleDescriptionChanged(e) {
            updateState({
                type: "UPDATE_DESCRIPTION", 
                payload: e.currentTarget.value
            });
        }

        function handleNameChange(e) {
            updateState({
                type: "UPDATE_NAME", 
                payload: e.currentTarget.value
            });
        }

        function saveBuildClick() {
            
            if (!auth.currentUser) {
                alert('Can\'t save or create builds when not authenticated.');
                return;
            }

            if (!state.dirty) {
                console.log('Not saving build, no changes have been made.');
                return;
            }

            console.log('saving build to database build id ' + state.buildId + ' for user id ' + auth.currentUser.uid);

            if (state.buildId === 0) {
                createBuild();
            }
            else {
                updateBuild();
            }
        }

        function decrementWeaponStat(careerStat, weaponId, property1Id, property2Id, traitId) {

            let oldWeaponIndex = careerStat.weapons.findIndex((item) => { return item.id === weaponId;});
            let oldWeapon = careerStat.weapons[oldWeaponIndex];

            decrementStat(oldWeapon.properties, property1Id);
            decrementStat(oldWeapon.properties, property2Id);
            decrementStat(oldWeapon.traits, traitId);

            oldWeapon.count -= 1;
            careerStat.weapons[oldWeaponIndex] = oldWeapon;
        }

        function incrementWeaponStat(careerStat, weaponId, property1Id, property2Id, traitId) {

            let weaponIndex = careerStat.weapons ? careerStat.weapons.findIndex((item) => { return item.id === weaponId;}) : -1;

            if (weaponIndex < 0) {
                let newWeapon = {
                    id: weaponId,
                    count: 0,
                    properties: [],
                    traits: []
                }
                careerStat.weapons ? careerStat.weapons.push(newWeapon) : careerStat.weapons = [newWeapon];
                weaponIndex = careerStat.weapons.length - 1;
            }

            let weapon = careerStat.weapons[weaponIndex];

            incrementStat(weapon.properties, property1Id);
            incrementStat(weapon.properties, property2Id);
            incrementStat(weapon.traits, traitId);

            weapon.count += 1;
            careerStat.weapons[weaponIndex] = weapon;
        }     

        function decrementStat(stats, statId) {
            adjustStat(stats, statId, -1);
        }

        function incrementStat(stats, statId) {
            adjustStat(stats, statId, 1);
        }

        function adjustStat(stats, statId, adjustmentValue) {
            let statIndex = stats ? stats.findIndex((item) => { return item.id === statId;}) : -1;
            
            if (statIndex < 0) {
                let newStat = {
                    id: statId,
                    count: 0
                }
                stats ? stats.push(newStat) : stats = [newStat];
                statIndex = stats.length - 1;
            }

            stats[statIndex].count = stats[statIndex].count + adjustmentValue;
        }

        function incrementNecklaceStat(careerStat, property1Id, property2Id, traitId) {
            if (!careerStat.necklace) {
                careerStat.necklace = {
                    properties: [],
                    traits: []
                }
            }

            incrementStat(careerStat.necklace.properties, property1Id);
            incrementStat(careerStat.necklace.properties, property2Id);
            incrementStat(careerStat.necklace.traits, traitId)
        }

        function incrementCharmStat(careerStat, property1Id, property2Id, traitId) {
            if (!careerStat.charm) {
                careerStat.charm = {
                    properties: [],
                    traits: []
                }
            }

            incrementStat(careerStat.charm.properties, property1Id);
            incrementStat(careerStat.charm.properties, property2Id);
            incrementStat(careerStat.charm.traits, traitId)
        }

        function incrementTrinketStat(careerStat, property1Id, property2Id, traitId) {
            if (!careerStat.trinket) {
                careerStat.trinket = {
                    properties: [],
                    traits: []
                }
            }

            incrementStat(careerStat.trinket.properties, property1Id);
            incrementStat(careerStat.trinket.properties, property2Id);
            incrementStat(careerStat.trinket.traits, traitId)
        }

        function decrementNecklaceStat(careerStat, property1Id, property2Id, traitId) {
            decrementStat(careerStat.necklace.properties, property1Id);
            decrementStat(careerStat.necklace.properties, property2Id);
            decrementStat(careerStat.necklace.traits, traitId)
        }

        function decrementCharmStat(careerStat, property1Id, property2Id, traitId) {
            decrementStat(careerStat.charm.properties, property1Id);
            decrementStat(careerStat.charm.properties, property2Id);
            decrementStat(careerStat.charm.traits, traitId)
        }

        function decrementTrinketStat(careerStat, property1Id, property2Id, traitId) {
            decrementStat(careerStat.trinket.properties, property1Id);
            decrementStat(careerStat.trinket.properties, property2Id);
            decrementStat(careerStat.trinket.traits, traitId)
        }

        function isCareerOrGearChanged(build) {
            return !(state.careerId === build.data().careerId &&
            state.primaryWeaponId === build.data().primaryWeapon.id &&
            state.secondaryWeaponId === build.data().secondaryWeapon.id &&
            state.properties[Constants.PRIMARY_PROPERTY1_INDEX] === build.data().primaryWeapon.property1Id &&
            state.properties[Constants.PRIMARY_PROPERTY2_INDEX] === build.data().primaryWeapon.property2Id &&
            state.properties[Constants.SECONDARY_PROPERTY1_INDEX] === build.data().secondaryWeapon.property1Id &&
            state.properties[Constants.SECONDARY_PROPERTY2_INDEX] === build.data().secondaryWeapon.property2Id &&
            state.properties[Constants.NECKLACE_PROPERTY1_INDEX] === build.data().necklace.property1Id &&
            state.properties[Constants.NECKLACE_PROPERTY2_INDEX] === build.data().necklace.property2Id &&
            state.properties[Constants.CHARM_PROPERTY1_INDEX] === build.data().charm.property1Id &&
            state.properties[Constants.CHARM_PROPERTY2_INDEX] === build.data().charm.property2Id &&
            state.properties[Constants.TRINKET_PROPERTY1_INDEX] === build.data().trinket.property1Id &&
            state.properties[Constants.TRINKET_PROPERTY2_INDEX] === build.data().trinket.property2Id &&
            state.traits[Constants.PRIMARY_TRAIT_INDEX] === build.data().primaryWeapon.trait &&
            state.traits[Constants.SECONDARY_TRAIT_INDEX] === build.data().secondaryWeapon.trait &&
            state.traits[Constants.NECKLACE_TRAIT_INDEX] === build.data().necklace.trait &&
            state.traits[Constants.CHARM_TRAIT_INDEX] === build.data().charm.trait &&
            state.traits[Constants.TRINKET_TRAIT_INDEX] === build.data().trinket.trait);
        }

        function updateBuild() {
            if (state.userId !== auth.currentUser.uid) {
                alert('You can\'t edit a build you didn\'t create.');
                return;
            }

            let buildStatsRef = db.collection('builds').doc('stats');
            let buildRef = db.collection('builds').doc(state.buildId);

            db.runTransaction((transaction) => {
                return transaction.getAll(buildStatsRef, buildRef).then((querySnapshot) => {
                    if (!querySnapshot || querySnapshot.size < 2) {
                        console.log('Could not find stats and build document');
                        return;
                    }

                    let buildStats = querySnapshot.docs[0];
                    let build = querySnapshot.docs[1];

                    let careers = buildStats.data().careers;

                    let newCareerIndex = careers.findIndex((career) => { return career.id === state.careerId});
                    let newCareerStat = careers[newCareerIndex];
                    let oldCareerIndex = careers.findIndex((career) => { return career.id === build.data().careerId});
                    let oldCareerStat = careers[oldCareerIndex];

                    // PREPARE BUILD STATS

                    if (isCareerOrGearChanged(build)) {
                        //build equipment or career has changed, update stats in addition to saving changes
                    
                        if (state.careerId !== build.data().careerId) { // Career changed, decrement all stats from old career, increment all in new career
            
                            if (!newCareerStat) {
                                newCareerStat = {
                                    id: state.careerId,
                                    count: 0,
                                    weapons: [],
                                    necklace: {
                                        properties: [],
                                        traits: []
                                    },
                                    charm: {
                                        properties: [],
                                        traits: []
                                    },
                                    trinket: {
                                        properties: [],
                                        traits: []
                                    }
                                }
                            }

                            newCareerStat.count +=1;
                            oldCareerStat.count -= 1;
                            
                            decrementWeaponStat(oldCareerStat, build.data().primaryWeapon.id, build.data().primaryWeapon.property1Id, build.data().primaryWeapon.property2Id, build.data().primaryWeapon.traitId);
                            decrementWeaponStat(oldCareerStat, build.data().secondayWeapon.id, build.data().secondayWeapon.property1Id, build.data().secondayWeapon.property2Id, build.data().secondayWeapon.traitId);
                            decrementNecklaceStat(oldCareerStat, build.data().necklace.property1Id, build.data().necklace.property2Id, build.data().necklace.traitId);
                            decrementCharmStat(oldCareerStat, build.data().charm.property1Id, build.data().charm.property2Id, build.data().charm.traitId);
                            decrementTrinketStat(oldCareerStat, build.data().trinket.property1Id, build.data().trinket.property2Id, build.data().trinket.traitId);
                            
                            incrementWeaponStat(newCareerStat, state.primaryWeaponId, state.properties[Constants.PRIMARY_PROPERTY1_INDEX], state.properties[Constants.PRIMARY_PROPERTY2_INDEX], state.properties[Constants.PRIMARY_TRAIT_INDEX]);
                            incrementWeaponStat(newCareerStat, state.secondaryWeaponId, state.properties[Constants.SECONDARY_PROPERTY1_INDEX], state.properties[Constants.SECONDARY_PROPERTY2_INDEX], state.properties[Constants.SECONDARY_TRAIT_INDEX]);
                            incrementNecklaceStat(newCareerStat, state.properties[Constants.NECKLACE_PROPERTY1_INDEX], state.properties[Constants.NECKLACE_PROPERTY2_INDEX], state.properties[Constants.NECKLACE_TRAIT_INDEX]);
                            incrementCharmStat(newCareerStat, state.properties[Constants.CHARM_PROPERTY1_INDEX], state.properties[Constants.CHARM_PROPERTY2_INDEX], state.properties[Constants.CHARM_TRAIT_INDEX]);
                            incrementTrinketStat(newCareerStat, state.properties[Constants.TRINKET_PROPERTY1_INDEX], state.properties[Constants.TRINKET_PROPERTY2_INDEX], state.properties[Constants.TRINKET_TRAIT_INDEX]);
                            
                            careers[oldCareerIndex] = oldCareerStat;
                        }
                        else { // Check properties and traits of each weapon and gear item and increment/decrement where necessary
                            if (state.primaryWeaponId !== build.data().primaryWeapon.id) {
                                decrementWeaponStat(newCareerStat, build.data().primaryWeapon.id, build.data().primaryWeapon.property1Id, build.data().primaryWeapon.property2Id, build.data().primaryWeapon.traitId);
                                incrementWeaponStat(newCareerStat, state.primaryWeaponId, state.properties[Constants.PRIMARY_PROPERTY1_INDEX], state.properties[Constants.PRIMARY_PROPERTY2_INDEX], state.properties[Constants.PRIMARY_TRAIT_INDEX]);
                            } else {
                                // Weapon is the same as before, only adjust properties/traits
                                let weaponIndex = newCareerStat.weapons.findIndex((item) => { return item.id === build.data().primaryWeapon.id;});
                                let weapon = newCareerStat.weapons[weaponIndex];

                                //check if properties or trait changed
                                if (state.properties[Constants.PRIMARY_PROPERTY1_INDEX] !== build.data().primaryWeapon.property1Id) {
                                    // decrement property
                                    decrementStat(weapon.properties, build.data().primaryWeapon.property1Id);
                                    incrementStat(weapon.properties, state.properties[Constants.PRIMARY_PROPERTY1_INDEX]);
                                }
                                if (state.properties[Constants.PRIMARY_PROPERTY2_INDEX] !== build.data().primaryWeapon.property2Id) {
                                    // decrement property
                                    decrementStat(weapon.properties, build.data().primaryWeapon.property2Id);
                                    incrementStat(weapon.properties, state.properties[Constants.PRIMARY_PROPERTY2_INDEX]);
                                }
                                if (state.traits[Constants.PRIMARY_TRAIT_INDEX] !== build.data().primaryWeapon.traitId) {
                                    // decrement trait
                                    decrementStat(weapon.traits, build.data().primaryWeapon.traitId);
                                    incrementStat(weapon.traits, state.traits[Constants.PRIMARY_TRAIT_INDEX]);
                                }

                            }

                            if (state.secondaryWeaponId !== build.data().secondaryWeapon.id) {
                                decrementWeaponStat(newCareerStat, build.data().secondayWeapon.id, build.data().secondayWeapon.property1Id, build.data().secondayWeapon.property2Id, build.data().secondayWeapon.traitId);
                                incrementWeaponStat(newCareerStat, state.secondaryWeaponId, state.properties[Constants.SECONDARY_PROPERTY1_INDEX], state.properties[Constants.SECONDARY_PROPERTY2_INDEX], state.properties[Constants.SECONDARY_TRAIT_INDEX]);
                            } else {
                                // Weapon is the same as before, only adjust properties/traits
                                let weaponIndex = newCareerStat.weapons.findIndex((item) => { return item.id === build.data().secondaryWeapon.id;});
                                let weapon = newCareerStat.weapons[weaponIndex];

                                //check if properties or trait changed
                                if (state.properties[Constants.SECONDARY_PROPERTY1_INDEX] !== build.data().secondaryWeapon.property1Id) {
                                    // decrement property
                                    decrementStat(weapon.properties, build.data().secondaryWeapon.property1Id);
                                    incrementStat(weapon.properties, state.properties[Constants.SECONDARY_PROPERTY1_INDEX]);
                                }
                                if (state.properties[Constants.SECONDARY_PROPERTY2_INDEX] !== build.data().secondaryWeapon.property2Id) {
                                    // decrement property
                                    decrementStat(weapon.properties, build.data().secondaryWeapon.property2Id);
                                    incrementStat(weapon.properties, state.properties[Constants.SECONDARY_PROPERTY2_INDEX]);
                                }
                                if (state.traits[Constants.SECONDARY_TRAIT_INDEX] !== build.data().secondaryWeapon.traitId) {
                                    // decrement trait
                                    decrementStat(weapon.traits, build.data().secondaryWeapon.traitId);
                                    incrementStat(weapon.traits, state.traits[Constants.SECONDARY_TRAIT_INDEX]);
                                }
                            }

                            // REPEAT this for each property and trait
                            if (state.properties[Constants.NECKLACE_PROPERTY1_INDEX] !== build.data().necklace.property1Id) {
                                // decrement property
                                decrementStat(newCareerStat.necklace.properties, build.data().necklace.property1Id);
                                incrementStat(newCareerStat.necklace.properties, state.properties[Constants.NECKLACE_PROPERTY1_INDEX]);
                            }
                            if (state.properties[Constants.NECKLACE_PROPERTY2_INDEX] !== build.data().necklace.property2Id) {
                                // decrement property
                                decrementStat(newCareerStat.necklace.properties, build.data().necklace.property2Id);
                                incrementStat(newCareerStat.necklace.properties, state.properties[Constants.NECKLACE_PROPERTY2_INDEX]);
                            }
                            if (state.traits[Constants.NECKLACE_TRAIT_INDEX] !== build.data().necklace.traitId) {
                                // decrement trait
                                decrementStat(newCareerStat.necklace.traits, build.data().necklace.traitId);
                                incrementStat(newCareerStat.necklace.traits, state.traits[Constants.NECKLACE_TRAIT_INDEX]);
                            }
                            
                            if (state.properties[Constants.CHARM_PROPERTY1_INDEX] !== build.data().charm.property1Id) {
                                // decrement property
                                decrementStat(newCareerStat.charm.properties, build.data().charm.property1Id);
                                incrementStat(newCareerStat.charm.properties, state.properties[Constants.CHARM_PROPERTY1_INDEX]);
                            }
                            if (state.properties[Constants.CHARM_PROPERTY2_INDEX] !== build.data().charm.property2Id) {
                                // decrement property
                                decrementStat(newCareerStat.charm.properties, build.data().charm.property2Id);
                                incrementStat(newCareerStat.charm.properties, state.properties[Constants.CHARM_PROPERTY2_INDEX]);
                            }
                            if (state.traits[Constants.CHARM_TRAIT_INDEX] !== build.data().charm.traitId) {
                                // decrement trait
                                decrementStat(newCareerStat.charm.traits, build.data().charm.traitId);
                                incrementStat(newCareerStat.charm.traits, state.traits[Constants.CHARM_TRAIT_INDEX]);
                            }
                            
                            if (state.properties[Constants.TRINKET_PROPERTY1_INDEX] !== build.data().trinket.property1Id) {
                                // decrement property
                                decrementStat(newCareerStat.trinket.properties, build.data().trinket.property1Id);
                                incrementStat(newCareerStat.trinket.properties, state.properties[Constants.TRINKET_PROPERTY1_INDEX]);
                            }
                            if (state.properties[Constants.TRINKET_PROPERTY2_INDEX] !== build.data().trinket.property2Id) {
                                // decrement property
                                decrementStat(newCareerStat.trinket.properties, build.data().trinket.property2Id);
                                incrementStat(newCareerStat.trinket.properties, state.properties[Constants.TRINKET_PROPERTY2_INDEX]);
                            }
                            if (state.traits[Constants.TRINKET_TRAIT_INDEX] !== build.data().trinket.traitId) {
                                // decrement trait
                                decrementStat(newCareerStat.trinket.traits, build.data().trinket.traitId);
                                incrementStat(newCareerStat.trinket.traits, state.traits[Constants.TRINKET_TRAIT_INDEX]);
                            }
                        
                            careers[newCareerIndex] = newCareerStat;
                        }
                        
                        transaction.update(buildStatsRef, { careers: careers });
                    }

                    transaction.set(buildRef, {
                        careerId: state.careerId,
                        primaryWeapon: {
                            id: state.primaryWeaponId,
                            property1Id: state.properties[Constants.PRIMARY_PROPERTY1_INDEX],
                            property2Id: state.properties[Constants.PRIMARY_PROPERTY2_INDEX],
                            traitId: state.traits[Constants.PRIMARY_TRAIT_INDEX]
                        },
                        secondaryWeapon: {
                            id: state.secondaryWeaponId,
                            property1Id: state.properties[Constants.SECONDARY_PROPERTY1_INDEX],
                            property2Id: state.properties[Constants.SECONDARY_PROPERTY2_INDEX],
                            traitId: state.traits[Constants.SECONDARY_TRAIT_INDEX]
                        },
                        necklace: {
                            property1Id: state.properties[Constants.NECKLACE_PROPERTY1_INDEX],
                            property2Id: state.properties[Constants.NECKLACE_PROPERTY2_INDEX],
                            traitId: state.traits[Constants.NECKLACE_TRAIT_INDEX]
                        },
                        charm: {
                            property1Id: state.properties[Constants.CHARM_PROPERTY1_INDEX],
                            property2Id: state.properties[Constants.CHARM_PROPERTY2_INDEX],
                            traitId: state.traits[Constants.CHARM_TRAIT_INDEX]
                        },
                        trinket: {
                            property1Id: state.properties[Constants.TRINKET_PROPERTY1_INDEX],
                            property2Id: state.properties[Constants.TRINKET_PROPERTY2_INDEX],
                            traitId: state.traits[Constants.TRINKET_TRAIT_INDEX]
                        },
                        talent1: state.talents[Constants.TALENT_TIER_1],
                        talent2: state.talents[Constants.TALENT_TIER_2],
                        talent3: state.talents[Constants.TALENT_TIER_3],
                        talent4: state.talents[Constants.TALENT_TIER_4],
                        talent5: state.talents[Constants.TALENT_TIER_5],
                        talent6: state.talents[Constants.TALENT_TIER_6],
                        name: state.name,
                        description: state.description,
                        difficulties: state.difficulties.map((item) => { return item.id }),
                        missions: state.missions.map((item) => { return item.id }),
                        potions: state.potions.map((item) => { return item.id }),
                        roles: state.roles.map((item) => { return item.id }),
                        books: state.books.map((item) => { return item.id }),
                        dateModified: new Date(),
                        //userId: auth.currentUser.uid,
                        //username: auth.currentUser.displayName,
                        //TODO - ensure that username is updated for each build when user edits their username
                        videos: state.videos,
                        isDeleted: false
                    }, {merge: true});
                });
            }).then(() => {
                console.log('Successfully updated stats for modified build');
                console.log("Document updated with ID: ", state.buildId);
                
                updateState({
                    type: "UPDATE_DIRTY", 
                    payload: false
                });

                var buildSaveIndicator = document.getElementById('buildSaveIndicator');
                buildSaveIndicator.classList.add('saved');
                setTimeout(() => { buildSaveIndicator.classList.remove('saved'); }, 4000);
            }).catch((error) => {
                console.error("Error updating document: ", error);
            });
        }

        function createBuild() {
            console.log('Creating new build.');
            let increment = 1;//firebase.firestore.FieldValue.increment(1);

            let batch = db.batch();

            let buildStatsRef = db.collection('builds').doc('stats');

            db.runTransaction((transaction) => {
                return transaction.get(buildStatsRef).then((buildStats) => {
                    if (!buildStats) {
                        console.log('No stats document found');
                        return;
                    }

                    console.log(buildStats.data());

                    var careers = buildStats.data().careers;

                    var newCareerStat = careers.find((career) => {return career.id === state.careerId;});
                    console.log(newCareerStat);

                    if (!newCareerStat) {
                        newCareerStat = {
                            id: state.careerId,
                            count: 0,
                            weapons: [],
                            necklace: {
                                properties: [],
                                traits: []
                            },
                            charm: {
                                properties: [],
                                traits: []
                            },
                            trinket: {
                                properties: [],
                                traits: []
                            }
                        }
                    }

                    newCareerStat.count += 1;

                    incrementWeaponStat(newCareerStat, state.primaryWeaponId, state.properties[Constants.PRIMARY_PROPERTY1_INDEX], state.properties[Constants.PRIMARY_PROPERTY2_INDEX], state.properties[Constants.PRIMARY_TRAIT_INDEX]);
                    incrementWeaponStat(newCareerStat, state.secondaryWeaponId, state.properties[Constants.SECONDARY_PROPERTY1_INDEX], state.properties[Constants.SECONDARY_PROPERTY2_INDEX], state.properties[Constants.SECONDARY_TRAIT_INDEX]);
                    incrementNecklaceStat(newCareerStat, state.properties[Constants.NECKLACE_PROPERTY1_INDEX], state.properties[Constants.NECKLACE_PROPERTY2_INDEX], state.properties[Constants.NECKLACE_TRAIT_INDEX]);
                    incrementCharmStat(newCareerStat, state.properties[Constants.CHARM_PROPERTY1_INDEX], state.properties[Constants.CHARM_PROPERTY2_INDEX], state.properties[Constants.CHARM_TRAIT_INDEX]);
                    incrementTrinketStat(newCareerStat, state.properties[Constants.TRINKET_PROPERTY1_INDEX], state.properties[Constants.TRINKET_PROPERTY2_INDEX], state.properties[Constants.TRINKET_TRAIT_INDEX]);

                    /* var newPrimaryWeapon = newCareerStat.weapons ? newCareerStat.weapons.find((weapon) => {return weapon.id === state.primaryWeaponId;}) : null;

                    if (!newPrimaryWeapon) {
                        newPrimaryWeapon = {
                            id: state.primaryWeaponId,
                            count: 0,
                            properties: [],
                            traits: []
                        }
                    }

                    newPrimaryWeapon.count += 1;

                    var newProperty1 = newPrimaryWeapon.properties ? newPrimaryWeapon.properties.find((property) => {return property.id === state.properties[Constants.PRIMARY_PROPERTY1_INDEX];}) : null;

                    if (!newProperty1) {
                        newProperty1 = {
                            id: state.properties[Constants.PRIMARY_PROPERTY1_INDEX],
                            count: 0
                        }
                    }

                    newProperty1.count += 1;

                    var newProperty2 = newPrimaryWeapon.properties ? newPrimaryWeapon.properties.find((property) => {return property.id === state.properties[Constants.PRIMARY_PROPERTY2_INDEX];}) : null;

                    if (!newProperty2) {
                        newProperty2 = {
                            id: state.properties[Constants.PRIMARY_PROPERTY2_INDEX],
                            count: 0
                        }
                    }

                    newProperty2.count += 1;

                    var newTrait = newPrimaryWeapon.traits ? newPrimaryWeapon.traits.find((trait) => {return trait.id === state.traits[Constants.PRIMARY_TRAIT_INDEX];}) : null;

                    if (!newTrait) {
                        newTrait = {
                            id: state.properties[Constants.PRIMARY_PROPERTY2_INDEX],
                            count: 0
                        }
                    }

                    newTrait.count += 1;

                    var newTraitIndex = newPrimaryWeapon.traits ? newPrimaryWeapon.traits.findIndex((trait) => { return trait.id === newTrait.id}) : -1;
                    if (newTraitIndex < 0) {
                        newPrimaryWeapon.traits ? newPrimaryWeapon.traits.push(newTrait) : newPrimaryWeapon.traits = [newTrait];
                    }
                    else {
                        newPrimaryWeapon.traits[newTraitIndex] = newTrait;
                    }

                    var newProperty1Index = newPrimaryWeapon.properties ? newPrimaryWeapon.properties.findIndex((property) => { return property.id === newProperty1.id}) : -1;
                    if (newProperty1Index < 0) {
                        newPrimaryWeapon.properties ? newPrimaryWeapon.properties.push(newProperty1) : newPrimaryWeapon.properties = [newProperty1];
                    }
                    else {
                        newPrimaryWeapon.properties[newProperty1Index] = newProperty1;
                    }

                    var newProperty2Index = newPrimaryWeapon.properties ? newPrimaryWeapon.properties.findIndex((property) => { return property.id === newProperty2.id}) : -1;
                    if (newProperty2Index < 0) {
                        newPrimaryWeapon.properties ? newPrimaryWeapon.properties.push(newProperty2) : newPrimaryWeapon.properties = [newProperty2];
                    }
                    else {
                        newPrimaryWeapon.properties[newProperty2Index] = newProperty2;
                    }

                    var newPrimaryWeaponIndex = newCareerStat.weapons ? newCareerStat.weapons.findIndex((weapon) => { return weapon.id === newPrimaryWeapon.id}) : -1;
                    if (newPrimaryWeaponIndex < 0) {
                        newCareerStat.weapons ? newCareerStat.weapons.push(newPrimaryWeapon) : newCareerStat.weapons = [newPrimaryWeapon];
                    }
                    else {
                        newCareerStat.weapons[newPrimaryWeaponIndex] = newPrimaryWeapon;
                    } */

                    // SECONDARY WEAPON


                    
                    // NECKLACE



                    // CHARM



                    // TRINKET


                    var newCareerStatIndex = careers ? careers.findIndex((career) => { return career.id === newCareerStat.id}) : -1;
                    if (newCareerStatIndex < 0) {
                        careers ? careers.push(newCareerStat) : careers = [newCareerStat];
                    }
                    else {
                        careers[newCareerStatIndex] = newCareerStat;
                    }
                    
                    transaction.update(buildStatsRef, { careers: careers });
                    transaction.set(db.collection('builds').doc(), {
                        careerId: state.careerId,                    
                        primaryWeapon: {
                            id: state.primaryWeaponId,
                            property1Id: state.properties[Constants.PRIMARY_PROPERTY1_INDEX],
                            property2Id: state.properties[Constants.PRIMARY_PROPERTY2_INDEX],
                            traitId: state.traits[Constants.PRIMARY_TRAIT_INDEX]
                        },
                        secondaryWeapon: {
                            id: state.secondaryWeaponId,
                            property1Id: state.properties[Constants.SECONDARY_PROPERTY1_INDEX],
                            property2Id: state.properties[Constants.SECONDARY_PROPERTY2_INDEX],
                            traitId: state.traits[Constants.SECONDARY_TRAIT_INDEX]
                        },
                        necklace: {
                            property1Id: state.properties[Constants.NECKLACE_PROPERTY1_INDEX],
                            property2Id: state.properties[Constants.NECKLACE_PROPERTY2_INDEX],
                            traitId: state.traits[Constants.NECKLACE_TRAIT_INDEX]
                        },
                        charm: {
                            property1Id: state.properties[Constants.CHARM_PROPERTY1_INDEX],
                            property2Id: state.properties[Constants.CHARM_PROPERTY2_INDEX],
                            traitId: state.traits[Constants.CHARM_TRAIT_INDEX]
                        },
                        trinket: {
                            property1Id: state.properties[Constants.TRINKET_PROPERTY1_INDEX],
                            property2Id: state.properties[Constants.TRINKET_PROPERTY2_INDEX],
                            traitId: state.traits[Constants.TRINKET_TRAIT_INDEX]
                        },
                        talent1: state.talents[Constants.TALENT_TIER_1],
                        talent2: state.talents[Constants.TALENT_TIER_2],
                        talent3: state.talents[Constants.TALENT_TIER_3],
                        talent4: state.talents[Constants.TALENT_TIER_4],
                        talent5: state.talents[Constants.TALENT_TIER_5],
                        talent6: state.talents[Constants.TALENT_TIER_6],
                        name: state.name,
                        description: state.description,
                        difficulties: state.difficulties.map((item) => { return item.id }),
                        missions: state.missions.map((item) => { return item.id }),
                        potions: state.potions.map((item) => { return item.id }),
                        roles: state.roles.map((item) => { return item.id }),
                        books: state.books.map((item) => { return item.id }),
                        likeCount: 0,
                        dateCreated: new Date(),
                        dateModified: new Date(),
                        userId: auth.currentUser.uid,
                        username: auth.currentUser.displayName,
                        videos: state.videos,
                        isDeleted: false
                    });
                });
            }).then(() => {
                console.log('successfully updated stats');
            });

/*             batch.set(db.collection('builds').doc(), {
                careerId: state.careerId,                    
                primaryWeapon: {
                    id: state.primaryWeaponId,
                    property1Id: state.properties[Constants.PRIMARY_PROPERTY1_INDEX],
                    property2Id: state.properties[Constants.PRIMARY_PROPERTY2_INDEX],
                    traitId: state.traits[Constants.PRIMARY_TRAIT_INDEX]
                },
                secondaryWeapon: {
                    id: state.secondaryWeaponId,
                    property1Id: state.properties[Constants.SECONDARY_PROPERTY1_INDEX],
                    property2Id: state.properties[Constants.SECONDARY_PROPERTY2_INDEX],
                    traitId: state.traits[Constants.SECONDARY_TRAIT_INDEX]
                },
                necklace: {
                    property1Id: state.properties[Constants.NECKLACE_PROPERTY1_INDEX],
                    property2Id: state.properties[Constants.NECKLACE_PROPERTY2_INDEX],
                    traitId: state.traits[Constants.NECKLACE_TRAIT_INDEX]
                },
                charm: {
                    property1Id: state.properties[Constants.CHARM_PROPERTY1_INDEX],
                    property2Id: state.properties[Constants.CHARM_PROPERTY2_INDEX],
                    traitId: state.traits[Constants.CHARM_TRAIT_INDEX]
                },
                trinket: {
                    property1Id: state.properties[Constants.TRINKET_PROPERTY1_INDEX],
                    property2Id: state.properties[Constants.TRINKET_PROPERTY2_INDEX],
                    traitId: state.traits[Constants.TRINKET_TRAIT_INDEX]
                },
                talent1: state.talents[Constants.TALENT_TIER_1],
                talent2: state.talents[Constants.TALENT_TIER_2],
                talent3: state.talents[Constants.TALENT_TIER_3],
                talent4: state.talents[Constants.TALENT_TIER_4],
                talent5: state.talents[Constants.TALENT_TIER_5],
                talent6: state.talents[Constants.TALENT_TIER_6],
                name: state.name,
                description: state.description,
                difficulties: state.difficulties.map((item) => { return item.id }),
                missions: state.missions.map((item) => { return item.id }),
                potions: state.potions.map((item) => { return item.id }),
                roles: state.roles.map((item) => { return item.id }),
                books: state.books.map((item) => { return item.id }),
                likeCount: 0,
                dateCreated: new Date(),
                dateModified: new Date(),
                userId: auth.currentUser.uid,
                username: auth.currentUser.displayName,
                videos: state.videos,
                isDeleted: false
            });
            batch.commit(); */

/*             db.collection('builds').doc('stats').set({
                careers: [
                    {
                        id: state.careerId,
                        count: increment,
                        weapons: [
                            {
                                id: state.primaryWeaponId,
                                count: increment,
                                properties: [
                                    {
                                        id: state.properties[Constants.PRIMARY_PROPERTY1_INDEX],
                                        count: increment
                                    },
                                    {
                                        id: state.properties[Constants.PRIMARY_PROPERTY2_INDEX],
                                        count: increment
                                    }
                                ],
                                traits: [
                                    {
                                        id: state.traits[Constants.PRIMARY_TRAIT_INDEX],
                                        count: increment
                                    }
                                ]
                            },
                            {
                                id: state.secondaryWeaponId,
                                count: increment,
                                properties: [
                                    {
                                        id: state.properties[Constants.SECONDARY_PROPERTY1_INDEX],
                                        count: increment
                                    },
                                    {
                                        id: state.properties[Constants.SECONDARY_PROPERTY2_INDEX],
                                        count: increment
                                    }
                                ],
                                traits: [
                                    {
                                        id: state.traits[Constants.SECONDARY_TRAIT_INDEX],
                                        count: increment
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }); */

/*             db.collection('builds').add({
                careerId: state.careerId,                    
                primaryWeapon: {
                    id: state.primaryWeaponId,
                    property1Id: state.properties[Constants.PRIMARY_PROPERTY1_INDEX],
                    property2Id: state.properties[Constants.PRIMARY_PROPERTY2_INDEX],
                    traitId: state.traits[Constants.PRIMARY_TRAIT_INDEX]
                },
                secondaryWeapon: {
                    id: state.secondaryWeaponId,
                    property1Id: state.properties[Constants.SECONDARY_PROPERTY1_INDEX],
                    property2Id: state.properties[Constants.SECONDARY_PROPERTY2_INDEX],
                    traitId: state.traits[Constants.SECONDARY_TRAIT_INDEX]
                },
                necklace: {
                    property1Id: state.properties[Constants.NECKLACE_PROPERTY1_INDEX],
                    property2Id: state.properties[Constants.NECKLACE_PROPERTY2_INDEX],
                    traitId: state.traits[Constants.NECKLACE_TRAIT_INDEX]
                },
                charm: {
                    property1Id: state.properties[Constants.CHARM_PROPERTY1_INDEX],
                    property2Id: state.properties[Constants.CHARM_PROPERTY2_INDEX],
                    traitId: state.traits[Constants.CHARM_TRAIT_INDEX]
                },
                trinket: {
                    property1Id: state.properties[Constants.TRINKET_PROPERTY1_INDEX],
                    property2Id: state.properties[Constants.TRINKET_PROPERTY2_INDEX],
                    traitId: state.traits[Constants.TRINKET_TRAIT_INDEX]
                },
                talent1: state.talents[Constants.TALENT_TIER_1],
                talent2: state.talents[Constants.TALENT_TIER_2],
                talent3: state.talents[Constants.TALENT_TIER_3],
                talent4: state.talents[Constants.TALENT_TIER_4],
                talent5: state.talents[Constants.TALENT_TIER_5],
                talent6: state.talents[Constants.TALENT_TIER_6],
                name: state.name,
                description: state.description,
                difficulties: state.difficulties,
                missions: state.missions,
                potions: state.potions,
                roles: state.roles,
                books: state.books,
                likeCount: 0,
                dateCreated: new Date(),
                dateModified: new Date(),
                userId: auth.currentUser.uid,
                username: auth.currentUser.displayName,
                videos: state.videos,
                isDeleted: false
            }).then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
                history.push('/build/' + docRef.id + '/edit');

                //redirect to build edit page here

            }).catch((error) => {
                console.error("Error adding document: ", error);
            }); */
        }

        function saveBuild() {
            console.log('updating build, current state:');
            console.log(state);

            if (state.userId !== auth.currentUser.uid) {
                alert('You can\'t edit a build you didn\'t create.');
                return;
            }

            let buildDataRef = db.collection('builds').doc(state.buildId);

            buildDataRef.set({
                careerId: state.careerId,
                primaryWeapon: {
                    id: state.primaryWeaponId,
                    property1Id: state.properties[Constants.PRIMARY_PROPERTY1_INDEX],
                    property2Id: state.properties[Constants.PRIMARY_PROPERTY2_INDEX],
                    traitId: state.traits[Constants.PRIMARY_TRAIT_INDEX]
                },
                secondaryWeapon: {
                    id: state.secondaryWeaponId,
                    property1Id: state.properties[Constants.SECONDARY_PROPERTY1_INDEX],
                    property2Id: state.properties[Constants.SECONDARY_PROPERTY2_INDEX],
                    traitId: state.traits[Constants.SECONDARY_TRAIT_INDEX]
                },
                necklace: {
                    property1Id: state.properties[Constants.NECKLACE_PROPERTY1_INDEX],
                    property2Id: state.properties[Constants.NECKLACE_PROPERTY2_INDEX],
                    traitId: state.traits[Constants.NECKLACE_TRAIT_INDEX]
                },
                charm: {
                    property1Id: state.properties[Constants.CHARM_PROPERTY1_INDEX],
                    property2Id: state.properties[Constants.CHARM_PROPERTY2_INDEX],
                    traitId: state.traits[Constants.CHARM_TRAIT_INDEX]
                },
                trinket: {
                    property1Id: state.properties[Constants.TRINKET_PROPERTY1_INDEX],
                    property2Id: state.properties[Constants.TRINKET_PROPERTY2_INDEX],
                    traitId: state.traits[Constants.TRINKET_TRAIT_INDEX]
                },
/*                     primaryWeaponId: state.primaryWeaponId,
                primaryWeaponProperty1: state.properties[Constants.PRIMARY_PROPERTY1_INDEX],
                primaryWeaponProperty2:state.properties[Constants.PRIMARY_PROPERTY2_INDEX],
                primaryWeaponTrait: state.traits[Constants.PRIMARY_TRAIT_INDEX],
                secondaryWeaponId: state.secondaryWeaponId,
                secondaryWeaponProperty1: state.properties[Constants.SECONDARY_PROPERTY1_INDEX],
                secondaryWeaponProperty2: state.properties[Constants.SECONDARY_PROPERTY2_INDEX],
                secondaryWeaponTrait: state.traits[Constants.SECONDARY_TRAIT_INDEX],
                necklaceProperty1: state.properties[Constants.NECKLACE_PROPERTY1_INDEX],
                necklaceProperty2: state.properties[Constants.NECKLACE_PROPERTY2_INDEX],
                necklaceTrait: state.traits[Constants.NECKLACE_TRAIT_INDEX],
                charmProperty1: state.properties[Constants.CHARM_PROPERTY1_INDEX],
                charmProperty2: state.properties[Constants.CHARM_PROPERTY2_INDEX],
                charmTrait: state.traits[Constants.CHARM_TRAIT_INDEX],
                trinketProperty1: state.properties[Constants.TRINKET_PROPERTY1_INDEX],
                trinketProperty2: state.properties[Constants.TRINKET_PROPERTY2_INDEX],
                trinketTrait: state.traits[Constants.TRINKET_TRAIT_INDEX], */
                talent1: state.talents[Constants.TALENT_TIER_1],
                talent2: state.talents[Constants.TALENT_TIER_2],
                talent3: state.talents[Constants.TALENT_TIER_3],
                talent4: state.talents[Constants.TALENT_TIER_4],
                talent5: state.talents[Constants.TALENT_TIER_5],
                talent6: state.talents[Constants.TALENT_TIER_6],
                name: state.name,
                description: state.description,
                difficulties: state.difficulties.map((item) => { return item.id }),
                missions: state.missions.map((item) => { return item.id }),
                potions: state.potions.map((item) => { return item.id }),
                roles: state.roles.map((item) => { return item.id }),
                books: state.books.map((item) => { return item.id }),
                dateModified: new Date(),
                //userId: auth.currentUser.uid,
                //username: auth.currentUser.displayName,
                //TODO - ensure that username is updated for each build when user edits their username
                videos: state.videos,
                isDeleted: false
            }, {merge: true}).then(() => {
                console.log("Document updated with ID: ", state.buildId);
                
                updateState({
                    type: "UPDATE_DIRTY", 
                    payload: false
                });

                var buildSaveIndicator = document.getElementById('buildSaveIndicator');
                buildSaveIndicator.classList.add('saved');
                setTimeout(() => { buildSaveIndicator.classList.remove('saved'); }, 4000);

            }).catch((error) => {
                console.error("Error updating document: ", error);
            });
        }

        //get build id param
        //if empty, load nothing from DB
        //if not empty, load build from DB and updatestate

        //saving builds with /create/ url saves new db item and redirects to /buildId/edit page
        //saving builds with /edit/ url just updates the record in the db

        if (!state.isFromDb && !state.createBuild) {
            return (
                <div className="edit-build-page" data-readonly={state.readonly} data-dirty={state.dirty}>
                    <p>No build found</p>
                </div>);
        }

        if (!auth.currentUser) {
            return (
                <div className="edit-build-page" data-readonly={state.readonly} data-dirty={state.dirty}>
                    <p>You must be logged in to edit builds</p>
                </div>);
        }

        if (!state.createBuild && state.userId !== auth.currentUser.uid) {
            return (
                <div className="edit-build-page" data-readonly={state.readonly} data-dirty={state.dirty}>
                    <p>Cannot edit build that you didn't create</p>
                </div>);
        }

        return (
            <div className="edit-build-page build-page" data-liked={state.isLiked} data-readonly={state.readonly} data-dirty={state.dirty} data-fresh={state.createBuild}>
                <span id="buildSaveIndicator" className="border-03 background-18">Build saved...</span>
                <div className="build-left-container">
                    <div className="build-buttons-container">
                        <span id="saveBuildButton" className="button-01 border-04" onClick={saveBuildClick.bind(this)}>Save Build</span>
                    </div>                    
                    <HeroSelect careerId={state.careerId}></HeroSelect>
                </div>
                <div className="build-main-container">
                    <Tabs>
                        <TabList>
                            <Tab>Summary</Tab>
                            <Tab>Videos</Tab>
                            <Tab>Combos</Tab>                        
                        </TabList>
                        <TabPanel className="build-summary-tab">
                            <div className="build-details-container">
                                <HeroDetails careerId={state.careerId}></HeroDetails>
                                <input type="text" className="build-name-input border-02 background-18" placeholder="Name your build" value={state.name} onChange={handleNameChange.bind(this)}></input>
                                <textarea className="input-build-description border-02 background-18" wrap="hard" placeholder="Describe your build" value={state.description} onChange={handleDescriptionChanged.bind(this)}></textarea>
                                <BuildInformation></BuildInformation>
                                <BuildOptions></BuildOptions>
                            </div>
                            <BuildSummary></BuildSummary>
                        </TabPanel>
                        <TabPanel>
                            <div className="build-additional-info">
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="hero-abilities">
                            </div>                        
                        </TabPanel>
                    </Tabs>
                    <div className="build-talents-container">
                        <HeroTalents contextActionType="UPDATE_TALENTS" careerId={state.careerId} talents={state.talents}></HeroTalents>
                    </div>
                </div>
                <div className="build-right-container">
                    <Inventory></Inventory>
                </div>
            </div>
        );
    }

export default EditBuildPage;