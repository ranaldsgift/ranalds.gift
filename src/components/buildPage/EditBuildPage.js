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
import sizeof from 'firestore-size';
import { DataHelper } from '../../utils/DataHelper';

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

        function isBuildReadyForSaving() {
            return !state.talents.some((talent) => { return talent > 3 || talent < 1; }) && state.name.length > 2;
        }

        function updateBuild() {
            if (state.userId !== auth.currentUser.uid) {
                alert('You can\'t edit a build you didn\'t create.');
                return;
            }

            if (!isBuildReadyForSaving()) {
                alert(`You can't save this build until you name it and select all six talents.`);
                return;
            }

            let buildStatsRef = db.collection('stats').doc('builds');
            let buildRef = db.collection('builds').doc(state.buildId);

            db.runTransaction(async transaction => {

                let buildStats = await transaction.get(buildStatsRef);
                let build = await transaction.get(buildRef);

                    // PREPARE BUILD STATS

                    var careers = buildStats.data().careers;
                    var weapons = buildStats.data().weapons;
                    var weaponProperties = buildStats.data().weaponProperties;
                    var weaponTraits = buildStats.data().weaponTraits;
                    var necklaceProperties = buildStats.data().necklaceProperties;
                    var necklaceTraits = buildStats.data().necklaceTraits;
                    var charmProperties = buildStats.data().charmProperties;
                    var charmTraits = buildStats.data().charmTraits;
                    var trinketProperties = buildStats.data().trinketProperties;
                    var trinketTraits = buildStats.data().trinketTraits;

                    if (isCareerOrGearChanged(build)) {
                        //build equipment or career has changed, update stats in addition to saving changes
                    
                        if (state.careerId !== build.data().careerId) { // Career changed, decrement all stats from old career, increment all in new career

                            adjustCareerStat(careers, build.data().careerId, -1);
                            adjustCareerStat(careers, state.careerId, 1);

                            var oldTalents = [build.data().talent1, build.data().talent2, build.data().talent3, build.data().talent4, build.data().talent5, build.data().talent6];

                            adjustCareerTalents(careers, build.data().careerId, oldTalents, -1);
                            adjustCareerTalents(careers, state.careerId, state.talents, 1);

                            //decrement old stats
                            adjustWeaponStat(weapons, build.data().careerId, build.data().primaryWeapon.id, -1);
                            adjustWeaponPropertyOrTraitStat(weaponProperties, build.data().careerId, build.data().primaryWeapon.id, build.data().primaryWeapon.property1Id, -1);
                            adjustWeaponPropertyOrTraitStat(weaponProperties, build.data().careerId, build.data().primaryWeapon.id, build.data().primaryWeapon.property2Id, -1);
                            adjustWeaponPropertyOrTraitStat(weaponTraits, build.data().careerId, build.data().primaryWeapon.id, build.data().primaryWeapon.traitId, -1);

                            adjustWeaponStat(weapons, build.data().careerId, build.data().secondaryWeapon.id, -1);
                            adjustWeaponPropertyOrTraitStat(weaponProperties, build.data().careerId, build.data().secondaryWeapon.id, build.data().secondaryWeapon.property1Id, -1);
                            adjustWeaponPropertyOrTraitStat(weaponProperties, build.data().careerId, build.data().secondaryWeapon.id, build.data().secondaryWeapon.property2Id, -1);
                            adjustWeaponPropertyOrTraitStat(weaponTraits, build.data().careerId, build.data().secondaryWeapon.id, build.data().secondaryWeapon.traitId, -1);

                            adjustPropertyOrTraitStat(necklaceProperties, build.data().careerId, build.data().necklace.property1Id, -1);
                            adjustPropertyOrTraitStat(necklaceProperties, build.data().careerId, build.data().necklace.property2Id, -1);
                            adjustPropertyOrTraitStat(necklaceTraits, build.data().careerId, build.data().necklace.traitId, -1);

                            adjustPropertyOrTraitStat(charmProperties, build.data().careerId, build.data().charm.property1Id, -1);
                            adjustPropertyOrTraitStat(charmProperties, build.data().careerId, build.data().charm.property2Id, -1);
                            adjustPropertyOrTraitStat(charmTraits, build.data().careerId, build.data().charm.traitId, -1);

                            adjustPropertyOrTraitStat(trinketProperties, build.data().careerId, build.data().trinket.property1Id, -1);
                            adjustPropertyOrTraitStat(trinketProperties, build.data().careerId, build.data().trinket.property2Id, -1);
                            adjustPropertyOrTraitStat(trinketTraits, build.data().careerId, build.data().trinket.traitId, -1);

                            // increment new stats
                            adjustWeaponStat(weapons, state.careerId, state.primaryWeaponId, 1);
                            adjustWeaponPropertyOrTraitStat(weaponProperties, state.careerId, state.primaryWeaponId, state.properties[Constants.PRIMARY_PROPERTY1_INDEX], 1);
                            adjustWeaponPropertyOrTraitStat(weaponProperties, state.careerId, state.primaryWeaponId, state.properties[Constants.PRIMARY_PROPERTY2_INDEX], 1);
                            adjustWeaponPropertyOrTraitStat(weaponTraits, state.careerId, state.primaryWeaponId, state.traits[Constants.PRIMARY_TRAIT_INDEX], 1);

                            adjustWeaponStat(weapons, state.careerId, state.secondaryWeaponId, 1);
                            adjustWeaponPropertyOrTraitStat(weaponProperties, state.careerId, state.secondaryWeaponId, state.properties[Constants.SECONDARY_PROPERTY1_INDEX], 1);
                            adjustWeaponPropertyOrTraitStat(weaponProperties, state.careerId, state.secondaryWeaponId, state.properties[Constants.SECONDARY_PROPERTY2_INDEX], 1);
                            adjustWeaponPropertyOrTraitStat(weaponTraits, state.careerId, state.secondaryWeaponId, state.traits[Constants.SECONDARY_TRAIT_INDEX], 1);

                            adjustPropertyOrTraitStat(necklaceProperties, state.careerId, state.properties[Constants.NECKLACE_PROPERTY1_INDEX], 1);
                            adjustPropertyOrTraitStat(necklaceProperties, state.careerId, state.properties[Constants.NECKLACE_PROPERTY2_INDEX], 1);
                            adjustPropertyOrTraitStat(necklaceTraits, state.careerId, state.traits[Constants.NECKLACE_TRAIT_INDEX], 1);

                            adjustPropertyOrTraitStat(charmProperties, state.careerId, state.properties[Constants.CHARM_PROPERTY1_INDEX], 1);
                            adjustPropertyOrTraitStat(charmProperties, state.careerId, state.properties[Constants.CHARM_PROPERTY2_INDEX], 1);
                            adjustPropertyOrTraitStat(charmTraits, state.careerId, state.traits[Constants.CHARM_TRAIT_INDEX], 1);

                            adjustPropertyOrTraitStat(trinketProperties, state.careerId, state.properties[Constants.TRINKET_PROPERTY1_INDEX], 1);
                            adjustPropertyOrTraitStat(trinketProperties, state.careerId, state.properties[Constants.TRINKET_PROPERTY2_INDEX], 1);
                            adjustPropertyOrTraitStat(trinketTraits, state.careerId, state.traits[Constants.TRINKET_TRAIT_INDEX], 1);
                        }
                        else { // Check talents and properties and traits of each weapon and gear item and increment/decrement where necessary\
                            // TALENTS
                            if (state.talents[0] !== build.data().talent1) {
                                adjustCareerTalent(careers, build.data().careerId, build.data().talent1, 1, -1);
                                adjustCareerTalent(careers, state.careerId, state.talents[0], 1, 1);
                            }
                            if (state.talents[1] !== build.data().talent2) {
                                adjustCareerTalent(careers, build.data().careerId, build.data().talent2, 2, -1);
                                adjustCareerTalent(careers, state.careerId, state.talents[1], 2, 1);
                            }
                            if (state.talents[2] !== build.data().talent3) {
                                adjustCareerTalent(careers, build.data().careerId, build.data().talent3, 3, -1);
                                adjustCareerTalent(careers, state.careerId, state.talents[2], 3, 1);
                            }
                            if (state.talents[3] !== build.data().talent4) {
                                adjustCareerTalent(careers, build.data().careerId, build.data().talent4, 4, -1);
                                adjustCareerTalent(careers, state.careerId, state.talents[3], 4, 1);
                            }
                            if (state.talents[4] !== build.data().talent5) {
                                adjustCareerTalent(careers, build.data().careerId, build.data().talent5, 5, -1);
                                adjustCareerTalent(careers, state.careerId, state.talents[4], 5, 1);
                            }
                            if (state.talents[5] !== build.data().talent6) {                                
                                adjustCareerTalent(careers, build.data().careerId, build.data().talent6, 6, -1);
                                adjustCareerTalent(careers, state.careerId, state.talents[5], 6, 1);
                            }

                            // PRIMARY WEAPON
                            if (state.primaryWeaponId !== build.data().primaryWeapon.id) {
                                adjustWeaponStat(weapons, build.data().careerId, build.data().primaryWeapon.id, -1);
                                adjustWeaponPropertyOrTraitStat(weaponProperties, build.data().careerId, build.data().primaryWeapon.id, build.data().primaryWeapon.property1Id, -1);
                                adjustWeaponPropertyOrTraitStat(weaponProperties, build.data().careerId, build.data().primaryWeapon.id, build.data().primaryWeapon.property2Id, -1);
                                adjustWeaponPropertyOrTraitStat(weaponTraits, build.data().careerId, build.data().primaryWeapon.id, build.data().primaryWeapon.traitId, -1);

                                adjustWeaponStat(weapons, state.careerId, state.primaryWeaponId, 1);
                                adjustWeaponPropertyOrTraitStat(weaponProperties, state.careerId, state.primaryWeaponId, state.properties[Constants.PRIMARY_PROPERTY1_INDEX], 1);
                                adjustWeaponPropertyOrTraitStat(weaponProperties, state.careerId, state.primaryWeaponId, state.properties[Constants.PRIMARY_PROPERTY2_INDEX], 1);
                                adjustWeaponPropertyOrTraitStat(weaponTraits, state.careerId, state.primaryWeaponId, state.traits[Constants.PRIMARY_TRAIT_INDEX], 1);
                            } else {
                                // Weapon is the same as before, only adjust properties/traits
                                //check if properties or trait changed
                                if (state.properties[Constants.PRIMARY_PROPERTY1_INDEX] !== build.data().primaryWeapon.property1Id) {
                                    adjustWeaponPropertyOrTraitStat(weaponProperties, build.data().careerId, build.data().primaryWeapon.id, build.data().primaryWeapon.property1Id, -1);
                                    adjustWeaponPropertyOrTraitStat(weaponProperties, state.careerId, state.primaryWeaponId, state.properties[Constants.PRIMARY_PROPERTY1_INDEX], 1);
                                }
                                if (state.properties[Constants.PRIMARY_PROPERTY2_INDEX] !== build.data().primaryWeapon.property2Id) {
                                    adjustWeaponPropertyOrTraitStat(weaponProperties, build.data().careerId, build.data().primaryWeapon.id, build.data().primaryWeapon.property2Id, -1);
                                    adjustWeaponPropertyOrTraitStat(weaponProperties, state.careerId, state.primaryWeaponId, state.properties[Constants.PRIMARY_PROPERTY2_INDEX], 1);
                                }
                                if (state.traits[Constants.PRIMARY_TRAIT_INDEX] !== build.data().primaryWeapon.traitId) {
                                    adjustWeaponPropertyOrTraitStat(weaponTraits, build.data().careerId, build.data().primaryWeapon.id, build.data().primaryWeapon.traitId, -1);
                                    adjustWeaponPropertyOrTraitStat(weaponTraits, state.careerId, state.primaryWeaponId, state.traits[Constants.PRIMARY_TRAIT_INDEX], 1);
                                }

                            }

                            // SECONDARY WEAPON
                            if (state.secondaryWeaponId !== build.data().secondaryWeapon.id) {
                                adjustWeaponStat(weapons, build.data().careerId, build.data().secondaryWeapon.id, -1);
                                adjustWeaponPropertyOrTraitStat(weaponProperties, build.data().careerId, build.data().secondaryWeapon.id, build.data().secondaryWeapon.property1Id, -1);
                                adjustWeaponPropertyOrTraitStat(weaponProperties, build.data().careerId, build.data().secondaryWeapon.id, build.data().secondaryWeapon.property2Id, -1);
                                adjustWeaponPropertyOrTraitStat(weaponTraits, build.data().careerId, build.data().secondaryWeapon.id, build.data().secondaryWeapon.traitId, -1);

                                adjustWeaponStat(weapons, state.careerId, state.secondaryWeaponId, 1);
                                adjustWeaponPropertyOrTraitStat(weaponProperties, state.careerId, state.secondaryWeaponId, state.properties[Constants.SECONDARY_PROPERTY1_INDEX], 1);
                                adjustWeaponPropertyOrTraitStat(weaponProperties, state.careerId, state.secondaryWeaponId, state.properties[Constants.SECONDARY_PROPERTY2_INDEX], 1);
                                adjustWeaponPropertyOrTraitStat(weaponTraits, state.careerId, state.secondaryWeaponId, state.traits[Constants.SECONDARY_TRAIT_INDEX], 1);
                            } else {

                                //check if properties or trait changed
                                if (state.properties[Constants.SECONDARY_PROPERTY1_INDEX] !== build.data().secondaryWeapon.property1Id) {
                                    adjustWeaponPropertyOrTraitStat(weaponProperties, build.data().careerId, build.data().secondaryWeapon.id, build.data().secondaryWeapon.property1Id, -1);
                                    adjustWeaponPropertyOrTraitStat(weaponProperties, state.careerId, state.secondaryWeaponId, state.properties[Constants.SECONDARY_PROPERTY1_INDEX], 1);
                                }
                                if (state.properties[Constants.SECONDARY_PROPERTY2_INDEX] !== build.data().secondaryWeapon.property2Id) {
                                    adjustWeaponPropertyOrTraitStat(weaponProperties, build.data().careerId, build.data().secondaryWeapon.id, build.data().secondaryWeapon.property2Id, -1);
                                    adjustWeaponPropertyOrTraitStat(weaponProperties, state.careerId, state.secondaryWeaponId, state.properties[Constants.SECONDARY_PROPERTY2_INDEX], 1);
                                }
                                if (state.traits[Constants.SECONDARY_TRAIT_INDEX] !== build.data().secondaryWeapon.traitId) {
                                    adjustWeaponPropertyOrTraitStat(weaponTraits, build.data().careerId, build.data().secondaryWeapon.id, build.data().secondaryWeapon.traitId, -1);
                                    adjustWeaponPropertyOrTraitStat(weaponTraits, state.careerId, state.secondaryWeaponId, state.traits[Constants.SECONDARY_TRAIT_INDEX], 1);
                                }
                            }
                            
                            adjustPropertyOrTraitStat(necklaceProperties, build.data().careerId, build.data().necklace.property1Id, -1);
                            adjustPropertyOrTraitStat(necklaceProperties, state.careerId, state.properties[Constants.NECKLACE_PROPERTY1_INDEX], 1);

                            adjustPropertyOrTraitStat(necklaceProperties, build.data().careerId, build.data().necklace.property2Id, -1);
                            adjustPropertyOrTraitStat(necklaceProperties, state.careerId, state.properties[Constants.NECKLACE_PROPERTY2_INDEX], 1);

                            adjustPropertyOrTraitStat(necklaceTraits, build.data().careerId, build.data().necklace.traitId, -1);
                            adjustPropertyOrTraitStat(necklaceTraits, state.careerId, state.traits[Constants.NECKLACE_TRAIT_INDEX], 1);

                            adjustPropertyOrTraitStat(charmProperties, build.data().careerId, build.data().charm.property1Id, -1);
                            adjustPropertyOrTraitStat(charmProperties, state.careerId, state.properties[Constants.CHARM_PROPERTY1_INDEX], 1);

                            adjustPropertyOrTraitStat(charmProperties, build.data().careerId, build.data().charm.property2Id, -1);
                            adjustPropertyOrTraitStat(charmProperties, state.careerId, state.properties[Constants.CHARM_PROPERTY2_INDEX], 1);

                            adjustPropertyOrTraitStat(charmTraits, build.data().careerId, build.data().charm.traitId, -1);
                            adjustPropertyOrTraitStat(charmTraits, state.careerId, state.traits[Constants.CHARM_TRAIT_INDEX], 1);

                            adjustPropertyOrTraitStat(trinketProperties, build.data().careerId, build.data().trinket.property1Id, -1);
                            adjustPropertyOrTraitStat(trinketProperties, state.careerId, state.properties[Constants.TRINKET_PROPERTY1_INDEX], 1);

                            adjustPropertyOrTraitStat(trinketProperties, build.data().careerId, build.data().trinket.property2Id, -1);
                            adjustPropertyOrTraitStat(trinketProperties, state.careerId, state.properties[Constants.TRINKET_PROPERTY2_INDEX], 1);

                            adjustPropertyOrTraitStat(trinketTraits, build.data().careerId, build.data().trinket.traitId, -1);
                            adjustPropertyOrTraitStat(trinketTraits, state.careerId, state.traits[Constants.TRINKET_TRAIT_INDEX], 1);
                            


                            // NECKLACE
                            if (state.properties[Constants.NECKLACE_PROPERTY1_INDEX] !== build.data().necklace.property1Id) {
                                adjustPropertyOrTraitStat(necklaceProperties, build.data().careerId, build.data().necklace.property1Id, -1);
                                adjustPropertyOrTraitStat(necklaceProperties, state.careerId, state.properties[Constants.NECKLACE_PROPERTY1_INDEX], 1);
                            }
                            if (state.properties[Constants.NECKLACE_PROPERTY2_INDEX] !== build.data().necklace.property2Id) {
                                adjustPropertyOrTraitStat(necklaceProperties, build.data().careerId, build.data().necklace.property2Id, -1);
                                adjustPropertyOrTraitStat(necklaceProperties, state.careerId, state.properties[Constants.NECKLACE_PROPERTY2_INDEX], 1);
                            }
                            if (state.traits[Constants.NECKLACE_TRAIT_INDEX] !== build.data().necklace.traitId) {
                                adjustPropertyOrTraitStat(necklaceTraits, build.data().careerId, build.data().necklace.traitId, -1);
                                adjustPropertyOrTraitStat(necklaceTraits, state.careerId, state.traits[Constants.NECKLACE_TRAIT_INDEX], 1);
                            }
                            
                            // CHARM
                            if (state.properties[Constants.CHARM_PROPERTY1_INDEX] !== build.data().charm.property1Id) {
                                adjustPropertyOrTraitStat(charmProperties, build.data().careerId, build.data().charm.property1Id, -1);
                                adjustPropertyOrTraitStat(charmProperties, state.careerId, state.properties[Constants.CHARM_PROPERTY1_INDEX], 1);
                            }
                            if (state.properties[Constants.CHARM_PROPERTY2_INDEX] !== build.data().charm.property2Id) {
                                adjustPropertyOrTraitStat(charmProperties, build.data().careerId, build.data().charm.property2Id, -1);
                                adjustPropertyOrTraitStat(charmProperties, state.careerId, state.properties[Constants.CHARM_PROPERTY2_INDEX], 1);
                            }
                            if (state.traits[Constants.CHARM_TRAIT_INDEX] !== build.data().charm.traitId) {
                                adjustPropertyOrTraitStat(charmTraits, build.data().careerId, build.data().charm.traitId, -1);
                                adjustPropertyOrTraitStat(charmTraits, state.careerId, state.traits[Constants.CHARM_TRAIT_INDEX], 1);
                            }
                            
                            //TRINKET
                            if (state.properties[Constants.TRINKET_PROPERTY1_INDEX] !== build.data().trinket.property1Id) {
                                adjustPropertyOrTraitStat(trinketProperties, build.data().careerId, build.data().trinket.property1Id, -1);
                                adjustPropertyOrTraitStat(trinketProperties, state.careerId, state.properties[Constants.TRINKET_PROPERTY1_INDEX], 1);
                            }
                            if (state.properties[Constants.TRINKET_PROPERTY2_INDEX] !== build.data().trinket.property2Id) {
                                adjustPropertyOrTraitStat(trinketProperties, build.data().careerId, build.data().trinket.property2Id, -1);
                                adjustPropertyOrTraitStat(trinketProperties, state.careerId, state.properties[Constants.TRINKET_PROPERTY2_INDEX], 1);
                            }
                            if (state.traits[Constants.TRINKET_TRAIT_INDEX] !== build.data().trinket.traitId) {
                                adjustPropertyOrTraitStat(trinketTraits, build.data().careerId, build.data().trinket.traitId, -1);
                                adjustPropertyOrTraitStat(trinketTraits, state.careerId, state.traits[Constants.TRINKET_TRAIT_INDEX], 1);
                            }
                        }
                        
                        transaction.update(buildStatsRef, { careers: careers, 
                            weapons: weapons,
                            weaponProperties: weaponProperties,
                            weaponTraits: weaponTraits,
                            necklaceProperties: necklaceProperties,
                            necklaceTraits: necklaceTraits,
                            charmProperties: charmProperties,
                            charmTraits: charmTraits,
                            trinketProperties: trinketProperties,
                            trinketTraits: trinketTraits });
                    }

                    var career = DataHelper.getCareer(state.careerId);

                    transaction.set(buildRef, {
                        careerId: state.careerId,
                        heroId: career.heroId,
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
                        difficulty: state.difficulty !== '' ? state.difficulty.id : '',
                        mission: state.mission !== '' ? state.mission.id : '',
                        potion: state.potion !== '' ? state.potion.id : '',
                        book: state.book !== '' ? state.book.id : '',
                        roles: state.roles.map((item) => { return item.id }),
                        dateModified: new Date(),
                        //userId: auth.currentUser.uid,
                        //username: auth.currentUser.displayName,
                        //TODO - ensure that username is updated for each build when user edits their username
                        videos: state.videos,
                        isDeleted: false
                    }, {merge: true});
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

        function adjustWeaponPropertyOrTraitStat(stats, careerId, weaponId, statId, adjustValue) {
            var stat = stats.find((stat) => { return stat.id === statId && stat.careerId === careerId && stat.weaponId === weaponId; });

            if (!stat) {
                stat = {
                    id: statId,
                    careerId: careerId,
                    weaponId: weaponId,
                    count: 0
                }
                stats.push(stat);
            }

            stat.count = stat.count + adjustValue;
        }

        function adjustPropertyOrTraitStat(stats, careerId, statId, adjustValue) {
            var stat = stats.find((stat) => { return stat.id === statId && stat.careerId === careerId; });

            if (!stat) {
                stat = {
                    id: statId,
                    careerId: careerId,
                    count: 0
                }
                stats.push(stat);
            }

            stat.count = stat.count + adjustValue;
        }

        function adjustCareerStat(stats, careerId, adjustValue) {
            var stat = stats.find((stat) => { return stat.id === careerId; });

            if (!stat) {
                stat = {
                    id: careerId,
                    count: 0
                }
                stats.push(stat);
            }

            stat.count = stat.count + adjustValue;
        }

        function adjustCareerTalents(careerStats, careerId, talents, adjustValue) {           
            adjustCareerTalent(careerStats, careerId, talents[0], 1, adjustValue);
            adjustCareerTalent(careerStats, careerId, talents[1], 2, adjustValue);
            adjustCareerTalent(careerStats, careerId, talents[2], 3, adjustValue);
            adjustCareerTalent(careerStats, careerId, talents[3], 4, adjustValue);
            adjustCareerTalent(careerStats, careerId, talents[4], 5, adjustValue);
            adjustCareerTalent(careerStats, careerId, talents[5], 6, adjustValue);
        }

        function adjustCareerTalent(careerStats, careerId, talentId, tier, adjustValue) {
            var careerStat = careerStats.find((stat) => { return stat.id === careerId; });

            if (!careerStat) {
                careerStat = {
                    id: careerId,
                    talents: [],
                    count: 1
                }
                careerStats.push(careerStat);
            }

            if (!careerStats.talents) {
                careerStats.talents = [];
            }

            var talentStat = careerStats.talents ? careerStats.talents.find((stat) => { return stat.id === talentId && stat.tier === tier; }) : null;

            if (!talentStat) {
                talentStat = {
                    id: talentId,
                    tier: tier,
                    count: 0
                }
                careerStats.talents.push(talentStat);
            }

            talentStat.count = talentStat.count + adjustValue;
        }

        function adjustWeaponStat(stats, careerId, weaponId, adjustValue) {
            var stat = stats.find((stat) => { return stat.id === weaponId && stat.careerId === careerId; });

            if (!stat) {
                stat = {
                    id: weaponId,
                    careerId: careerId,
                    count: 0
                }
                stats.push(stat);
            }

            stat.count = stat.count + adjustValue;
        }

        function createBuild() {
            if (!auth.currentUser) {
                alert(`You must be logged in to create a build.`);
                return;
            }

            if (!isBuildReadyForSaving()) {
                alert(`You can't save this build until you name it and select all six talents.`);
                return;
            }
            console.log('Creating new build.');
            let buildStatsRef = db.collection('stats').doc('builds');
            let newBuildDoc = db.collection('builds').doc();

            db.runTransaction((transaction) => {
                return transaction.get(buildStatsRef).then((buildStats) => {
                    if (!buildStats) {
                        console.log('No stats document found');
                        return;
                    }

                    var careers = buildStats.data().careers;
                    var weapons = buildStats.data().weapons;
                    var weaponProperties = buildStats.data().weaponProperties;
                    var weaponTraits = buildStats.data().weaponTraits;
                    var necklaceProperties = buildStats.data().necklaceProperties;
                    var necklaceTraits = buildStats.data().necklaceTraits;
                    var charmProperties = buildStats.data().charmProperties;
                    var charmTraits = buildStats.data().charmTraits;
                    var trinketProperties = buildStats.data().trinketProperties;
                    var trinketTraits = buildStats.data().trinketTraits;

                    adjustCareerStat(careers, state.careerId, 1);

                    adjustCareerTalents(careers, state.careerId, state.talents, 1);

                    adjustWeaponStat(weapons, state.careerId, state.primaryWeaponId, 1);
                    adjustWeaponPropertyOrTraitStat(weaponProperties, state.careerId, state.primaryWeaponId, state.properties[Constants.PRIMARY_PROPERTY1_INDEX], 1);
                    adjustWeaponPropertyOrTraitStat(weaponProperties, state.careerId, state.primaryWeaponId, state.properties[Constants.PRIMARY_PROPERTY2_INDEX], 1);
                    adjustWeaponPropertyOrTraitStat(weaponTraits, state.careerId, state.primaryWeaponId, state.traits[Constants.PRIMARY_TRAIT_INDEX], 1);

                    adjustWeaponStat(weapons, state.careerId, state.secondaryWeaponId, 1);
                    adjustWeaponPropertyOrTraitStat(weaponProperties, state.careerId, state.secondaryWeaponId, state.properties[Constants.SECONDARY_PROPERTY1_INDEX], 1);
                    adjustWeaponPropertyOrTraitStat(weaponProperties, state.careerId, state.secondaryWeaponId, state.properties[Constants.SECONDARY_PROPERTY2_INDEX], 1);
                    adjustWeaponPropertyOrTraitStat(weaponTraits, state.careerId, state.secondaryWeaponId, state.traits[Constants.SECONDARY_TRAIT_INDEX], 1);

                    adjustPropertyOrTraitStat(necklaceProperties, state.careerId, state.properties[Constants.NECKLACE_PROPERTY1_INDEX], 1);
                    adjustPropertyOrTraitStat(necklaceProperties, state.careerId, state.properties[Constants.NECKLACE_PROPERTY2_INDEX], 1);
                    adjustPropertyOrTraitStat(necklaceTraits, state.careerId, state.traits[Constants.NECKLACE_TRAIT_INDEX], 1);

                    adjustPropertyOrTraitStat(charmProperties, state.careerId, state.properties[Constants.CHARM_PROPERTY1_INDEX], 1);
                    adjustPropertyOrTraitStat(charmProperties, state.careerId, state.properties[Constants.CHARM_PROPERTY2_INDEX], 1);
                    adjustPropertyOrTraitStat(charmTraits, state.careerId, state.traits[Constants.CHARM_TRAIT_INDEX], 1);

                    adjustPropertyOrTraitStat(trinketProperties, state.careerId, state.properties[Constants.TRINKET_PROPERTY1_INDEX], 1);
                    adjustPropertyOrTraitStat(trinketProperties, state.careerId, state.properties[Constants.TRINKET_PROPERTY2_INDEX], 1);
                    adjustPropertyOrTraitStat(trinketTraits, state.careerId, state.traits[Constants.TRINKET_TRAIT_INDEX], 1);

                    transaction.update(buildStatsRef, { careers: careers, 
                                                        weapons: weapons,
                                                        weaponProperties: weaponProperties,
                                                        weaponTraits: weaponTraits,
                                                        necklaceProperties: necklaceProperties,
                                                        necklaceTraits: necklaceTraits,
                                                        charmProperties: charmProperties,
                                                        charmTraits: charmTraits,
                                                        trinketProperties: trinketProperties,
                                                        trinketTraits: trinketTraits });
                                                        

                    var career = DataHelper.getCareer(state.careerId);

                    transaction.set(newBuildDoc, {
                        careerId: state.careerId,     
                        heroId: career.heroId,
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
                        difficulty: state.difficulty !== '' ? state.difficulty.id : '',
                        mission: state.mission !== '' ? state.mission.id : '',
                        potion: state.potion !== '' ? state.potion.id : '',
                        book: state.book !== '' ? state.book.id : '',
                        roles: state.roles.map((item) => { return item.id }),
                        likes: [],
                        likeCount: 0,
                        favorites: [],
                        favoriteCount: 0,
                        dateCreated: new Date(),
                        dateModified: new Date(),
                        userId: auth.currentUser.uid,
                        username: auth.currentUser.displayName,
                        videos: state.videos,
                        isDeleted: false
                    });
                });
            }).then(() => {
                console.log('Successfully created new build and updated stats');
                history.push(`/build/${newBuildDoc.id}/edit`)

            });
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
            <div className="edit-build-page build-page" data-liked={state.isLiked} data-valid={isBuildReadyForSaving()} data-readonly={state.readonly} data-dirty={state.dirty} data-fresh={state.createBuild}>
                <span id="buildSaveIndicator" className="border-03 background-18">Build saved...</span>
                <div className="build-left-container top-left-shadow">
                    <div className="build-buttons-container">
                        <span id="saveBuildButton" className="button-01 border-04" onClick={saveBuildClick.bind(this)}>Save Build</span>
                    </div>                    
                    <HeroSelect careerId={state.careerId}></HeroSelect>
                </div>
                <div className="build-main-container">
                    <Tabs>
                        <TabList>
                            <Tab>Summary</Tab>
{/*                             <Tab>Videos</Tab>
                            <Tab>Combos</Tab>   */}                      
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
{/*                         <TabPanel>
                            <div className="build-additional-info">
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="hero-abilities">
                            </div>                        
                        </TabPanel> */}
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