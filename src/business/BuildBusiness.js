import { DataHelper } from "../utils/DataHelper";
import { auth, db, firebase } from "../utils/Firebase";
import history from '../utils/History';
import * as Constants from '../data/Constants';

let isSavingBuild = false;
let isUpdatingBuild = false;

export class BuildBusiness {

    static createBuild = (buildState) => {
        if (isSavingBuild) {
            // ignore button spam
            return;
        }

        isSavingBuild = true;

        if (!auth.currentUser) {
            alert(`You must be logged in to create a build.`);
            return;
        }
    
        if (!isBuildReadyForSaving(buildState)) {
            alert(`You can't save this build until you name it and select all six talents.`);
            return;
        }
        console.log('Creating new build.');
        let buildStatsRef = db.collection('stats').doc('builds');
        let newBuildDoc = db.collection('builds').doc();
        let userDocRef = db.collection('users').doc(auth.currentUser.uid);
        let userStatsRef = db.collection('stats').doc('users');
    
        db.runTransaction(async (transaction) => {
            var buildStats = await transaction.get(buildStatsRef);
            var userDoc = await transaction.get(userDocRef);

            var userStats = await transaction.get(userStatsRef);
            
                if (!buildStats) {
                    console.log('No stats document found');
                    return;
                }

                // Legacy feature. TODO: Use cloud functions to keep track of stats on a recurring basis every 24h
                //addNewStats(buildStats, buildStatsRef, buildState, transaction);                                                    
    
                var career = DataHelper.getCareer(buildState.careerId);
    
                transaction.set(newBuildDoc, {
                    careerId: buildState.careerId,     
                    heroId: career.heroId,
                    primaryWeapon: {
                        id: buildState.primaryWeaponId,
                        property1Id: buildState.properties[Constants.PRIMARY_PROPERTY1_INDEX],
                        property2Id: buildState.properties[Constants.PRIMARY_PROPERTY2_INDEX],
                        traitId: buildState.traits[Constants.PRIMARY_TRAIT_INDEX]
                    },
                    secondaryWeapon: {
                        id: buildState.secondaryWeaponId,
                        property1Id: buildState.properties[Constants.SECONDARY_PROPERTY1_INDEX],
                        property2Id: buildState.properties[Constants.SECONDARY_PROPERTY2_INDEX],
                        traitId: buildState.traits[Constants.SECONDARY_TRAIT_INDEX]
                    },
                    necklace: {
                        property1Id: buildState.properties[Constants.NECKLACE_PROPERTY1_INDEX],
                        property2Id: buildState.properties[Constants.NECKLACE_PROPERTY2_INDEX],
                        traitId: buildState.traits[Constants.NECKLACE_TRAIT_INDEX]
                    },
                    charm: {
                        property1Id: buildState.properties[Constants.CHARM_PROPERTY1_INDEX],
                        property2Id: buildState.properties[Constants.CHARM_PROPERTY2_INDEX],
                        traitId: buildState.traits[Constants.CHARM_TRAIT_INDEX]
                    },
                    trinket: {
                        property1Id: buildState.properties[Constants.TRINKET_PROPERTY1_INDEX],
                        property2Id: buildState.properties[Constants.TRINKET_PROPERTY2_INDEX],
                        traitId: buildState.traits[Constants.TRINKET_TRAIT_INDEX]
                    },
                    talent1: buildState.talents[Constants.TALENT_TIER_1],
                    talent2: buildState.talents[Constants.TALENT_TIER_2],
                    talent3: buildState.talents[Constants.TALENT_TIER_3],
                    talent4: buildState.talents[Constants.TALENT_TIER_4],
                    talent5: buildState.talents[Constants.TALENT_TIER_5],
                    talent6: buildState.talents[Constants.TALENT_TIER_6],
                    name: buildState.name,
                    description: buildState.description,
                    difficulty: buildState.difficulty ? buildState.difficulty.id : 0,
                    mission: buildState.mission ? buildState.mission.id : 0,
                    potion: buildState.potion ? buildState.potion.id : 0,
                    book: buildState.book ? buildState.book.id : 0,
                    twitch: buildState.twitchMode ? buildState.twitchMode.id : 0,
                    roles: buildState.roles.map((item) => { return item.id }),
                    likes: [],
                    likeCount: 0,
                    favorites: [],
                    favoriteCount: 0,
                    dateCreated: new Date(),
                    dateModified: new Date(),
                    userId: auth.currentUser.uid,
                    username: userDoc.data().username,
                    videos: buildState.videos,
                    isDeleted: false
                });

                // Flag user as build author for build filters
                if (userDoc.data().authoredBuildsCount === 0) {        
                    var usernames = userStats.data().usernames;
                    var user = usernames.find((user) => { return user.id === auth.currentUser.uid; });

                    if (user) {
                        user.isBuildAuthor = true;
                    }

                    transaction.update(userStatsRef, {
                        usernames: usernames
                    });
                }

                transaction.update(userDocRef, {
                    authoredBuildsCount: firebase.firestore.FieldValue.increment(1)
                });



        }).then(() => {
            console.log('Successfully created new build and updated stats');
            history.push(`/build/${newBuildDoc.id}/edit`)
            isSavingBuild = false;
        });

    }
    static updateBuild = (buildState, callback) => {
        if (isUpdatingBuild) {
            // ignore button spam
            return;
        }

        isUpdatingBuild = true;

        if (buildState.userId !== auth.currentUser.uid) {
            alert('You can\'t edit a build you didn\'t create.');
            return;
        }

        if (!isBuildReadyForSaving(buildState)) {
            alert(`You can't save this build until you name it and select all six talents.`);
            return;
        }

        //let buildStatsRef = db.collection('stats').doc('builds');
        let buildRef = db.collection('builds').doc(buildState.buildId);

        db.runTransaction(async transaction => {

                //let buildStats = await transaction.get(buildStatsRef);
                //let build = await transaction.get(buildRef);

                // PREPARE BUILD STATS TODO: use cloud functions to magage stats on a recurring basis
                //updateStats(buildStats, buildStatsRef, buildState, build, transaction);

                var career = DataHelper.getCareer(buildState.careerId);

                transaction.set(buildRef, {
                    careerId: parseInt(buildState.careerId),
                    heroId: parseInt(career.heroId),
                    primaryWeapon: {
                        id: buildState.primaryWeaponId,
                        property1Id: buildState.properties[Constants.PRIMARY_PROPERTY1_INDEX],
                        property2Id: buildState.properties[Constants.PRIMARY_PROPERTY2_INDEX],
                        traitId: buildState.traits[Constants.PRIMARY_TRAIT_INDEX]
                    },
                    secondaryWeapon: {
                        id: buildState.secondaryWeaponId,
                        property1Id: buildState.properties[Constants.SECONDARY_PROPERTY1_INDEX],
                        property2Id: buildState.properties[Constants.SECONDARY_PROPERTY2_INDEX],
                        traitId: buildState.traits[Constants.SECONDARY_TRAIT_INDEX]
                    },
                    necklace: {
                        property1Id: buildState.properties[Constants.NECKLACE_PROPERTY1_INDEX],
                        property2Id: buildState.properties[Constants.NECKLACE_PROPERTY2_INDEX],
                        traitId: buildState.traits[Constants.NECKLACE_TRAIT_INDEX]
                    },
                    charm: {
                        property1Id: buildState.properties[Constants.CHARM_PROPERTY1_INDEX],
                        property2Id: buildState.properties[Constants.CHARM_PROPERTY2_INDEX],
                        traitId: buildState.traits[Constants.CHARM_TRAIT_INDEX]
                    },
                    trinket: {
                        property1Id: buildState.properties[Constants.TRINKET_PROPERTY1_INDEX],
                        property2Id: buildState.properties[Constants.TRINKET_PROPERTY2_INDEX],
                        traitId: buildState.traits[Constants.TRINKET_TRAIT_INDEX]
                    },
                    talent1: buildState.talents[Constants.TALENT_TIER_1],
                    talent2: buildState.talents[Constants.TALENT_TIER_2],
                    talent3: buildState.talents[Constants.TALENT_TIER_3],
                    talent4: buildState.talents[Constants.TALENT_TIER_4],
                    talent5: buildState.talents[Constants.TALENT_TIER_5],
                    talent6: buildState.talents[Constants.TALENT_TIER_6],
                    name: buildState.name,
                    description: buildState.description,
                    difficulty: buildState.difficulty ? buildState.difficulty.id : 0,
                    mission: buildState.mission ? buildState.mission.id : 0,
                    potion: buildState.potion ? buildState.potion.id : 0,
                    book: buildState.book ? buildState.book.id : 0,
                    twitch: buildState.twitchMode ? buildState.twitchMode.id : 0,
                    roles: buildState.roles.map((item) => { return item.id }),
                    dateModified: new Date(),
                    videos: buildState.videos,
                    isDeleted: false
                }, {merge: true});
        }).then(() => {
            console.log('Successfully updated stats for modified build');
            console.log("Document updated with ID: ", buildState.buildId);
            isUpdatingBuild = false;

            var buildSaveIndicator = document.getElementById('buildSaveIndicator');
            buildSaveIndicator.classList.add('saved');
            setTimeout(() => { buildSaveIndicator.classList.remove('saved'); }, 4000);
            if (callback) {
                callback();
            }
        }).catch((error) => {
            console.error("Error updating document: ", error);
        });
    }
    static updateAllBuildsForUser = (userId, callback) => {
        
        if (userId !== auth.currentUser.uid) {
            alert('You cannot update builds that you did not create.');
            return;
        }

        let buildsQuery = db.collection("builds");
        buildsQuery = buildsQuery.where('userId', '==', auth.currentUser.uid);
        buildsQuery = buildsQuery.where('isDeleted', '==', false);
        var currentDate = new Date();

        buildsQuery.get().then((querySnapshot) => {
          querySnapshot.forEach((build) => {
            build.ref.update({
                dateModified: currentDate
            });
          });
          if (callback) {
              callback();
          }
        });
    }
    static updateBuildDateModified = (buildId, callback) => {
        if (isUpdatingBuild) {
            // ignore button spam
            return;
        }

        isUpdatingBuild = true;

        let buildRef = db.collection('builds').doc(buildId);

        db.runTransaction(async transaction => {
            let build = await transaction.get(buildRef);

            if (!build) {
                console.log(`Unable to update Build ID ${buildId}`)
                return;
            }

            if (build.data().userId !== auth.currentUser.uid) {
                alert('You can\'t update a build you didn\'t create.');
                return;
            }

            transaction.update(buildRef, {
                dateModified: new Date()
            });

        }).then(() => {
            console.log('Successfully updated build ' + buildId);
            isUpdatingBuild = false;

            if (callback) {
                callback();
            }
        }).catch((error) => {
            console.error("Error updating document: ", error);
        });
    }
    static deleteBuild = (buildId, callback) => {
        if (isUpdatingBuild) {
            // ignore button spam
            return;
        }

        isUpdatingBuild = true;

        let buildRef = db.collection('builds').doc(buildId);

        db.runTransaction(async transaction => {
            let build = await transaction.get(buildRef);

            if (!build) {
                console.log(`Unable to delete Build ID ${buildId}`)
                return;
            }

            if (build.data().userId !== auth.currentUser.uid) {
                alert('You can\'t delete a build you didn\'t create.');
                return;
            }

            transaction.update(buildRef, {
                isDeleted: true
            });

        }).then(() => {
            console.log('Successfully deleted build ' + buildId);
            isUpdatingBuild = false;

            if (callback) {
                callback();
            }
        }).catch((error) => {
            console.error("Error deleting document: ", error);
        });
    }
}

function addNewStats(buildStats, buildStatsRef, buildState, transaction) {    
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

    adjustCareerStat(careers, buildState.careerId, 1);

    adjustCareerTalents(careers, buildState.careerId, buildState.talents, 1);

    adjustWeaponStat(weapons, buildState.careerId, buildState.primaryWeaponId, 1);
    adjustWeaponPropertyOrTraitStat(weaponProperties, buildState.careerId, buildState.primaryWeaponId, buildState.properties[Constants.PRIMARY_PROPERTY1_INDEX], 1);
    adjustWeaponPropertyOrTraitStat(weaponProperties, buildState.careerId, buildState.primaryWeaponId, buildState.properties[Constants.PRIMARY_PROPERTY2_INDEX], 1);
    adjustWeaponPropertyOrTraitStat(weaponTraits, buildState.careerId, buildState.primaryWeaponId, buildState.traits[Constants.PRIMARY_TRAIT_INDEX], 1);

    adjustWeaponStat(weapons, buildState.careerId, buildState.secondaryWeaponId, 1);
    adjustWeaponPropertyOrTraitStat(weaponProperties, buildState.careerId, buildState.secondaryWeaponId, buildState.properties[Constants.SECONDARY_PROPERTY1_INDEX], 1);
    adjustWeaponPropertyOrTraitStat(weaponProperties, buildState.careerId, buildState.secondaryWeaponId, buildState.properties[Constants.SECONDARY_PROPERTY2_INDEX], 1);
    adjustWeaponPropertyOrTraitStat(weaponTraits, buildState.careerId, buildState.secondaryWeaponId, buildState.traits[Constants.SECONDARY_TRAIT_INDEX], 1);

    adjustPropertyOrTraitStat(necklaceProperties, buildState.careerId, buildState.properties[Constants.NECKLACE_PROPERTY1_INDEX], 1);
    adjustPropertyOrTraitStat(necklaceProperties, buildState.careerId, buildState.properties[Constants.NECKLACE_PROPERTY2_INDEX], 1);
    adjustPropertyOrTraitStat(necklaceTraits, buildState.careerId, buildState.traits[Constants.NECKLACE_TRAIT_INDEX], 1);

    adjustPropertyOrTraitStat(charmProperties, buildState.careerId, buildState.properties[Constants.CHARM_PROPERTY1_INDEX], 1);
    adjustPropertyOrTraitStat(charmProperties, buildState.careerId, buildState.properties[Constants.CHARM_PROPERTY2_INDEX], 1);
    adjustPropertyOrTraitStat(charmTraits, buildState.careerId, buildState.traits[Constants.CHARM_TRAIT_INDEX], 1);

    adjustPropertyOrTraitStat(trinketProperties, buildState.careerId, buildState.properties[Constants.TRINKET_PROPERTY1_INDEX], 1);
    adjustPropertyOrTraitStat(trinketProperties, buildState.careerId, buildState.properties[Constants.TRINKET_PROPERTY2_INDEX], 1);
    adjustPropertyOrTraitStat(trinketTraits, buildState.careerId, buildState.traits[Constants.TRINKET_TRAIT_INDEX], 1);

    transaction.update(buildStatsRef, { careers: careers, 
                                        weapons: weapons,
                                        weaponProperties: weaponProperties,
                                        weaponTraits: weaponTraits,
                                        necklaceProperties: necklaceProperties,
                                        necklaceTraits: necklaceTraits,
                                        charmProperties: charmProperties,
                                        charmTraits: charmTraits,
                                        trinketProperties: trinketProperties,
                                        trinketTraits: trinketTraits,
                                        count: firebase.firestore.FieldValue.increment(1) });

}

function updateStats(buildStats, buildStatsRef, buildState, build, transaction) {
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

    // Update the build stats table if the gear has changed
    if (isCareerOrGearChanged(build, buildState)) {
        //build equipment or career has changed, update stats in addition to saving changes
    
        if (buildState.careerId !== build.data().careerId) { // Career changed, decrement all stats from old career, increment all in new career

            adjustCareerStat(careers, build.data().careerId, -1);
            adjustCareerStat(careers, buildState.careerId, 1);

            var oldTalents = [build.data().talent1, build.data().talent2, build.data().talent3, build.data().talent4, build.data().talent5, build.data().talent6];

            adjustCareerTalents(careers, build.data().careerId, oldTalents, -1);
            adjustCareerTalents(careers, buildState.careerId, buildState.talents, 1);

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
            adjustWeaponStat(weapons, buildState.careerId, buildState.primaryWeaponId, 1);
            adjustWeaponPropertyOrTraitStat(weaponProperties, buildState.careerId, buildState.primaryWeaponId, buildState.properties[Constants.PRIMARY_PROPERTY1_INDEX], 1);
            adjustWeaponPropertyOrTraitStat(weaponProperties, buildState.careerId, buildState.primaryWeaponId, buildState.properties[Constants.PRIMARY_PROPERTY2_INDEX], 1);
            adjustWeaponPropertyOrTraitStat(weaponTraits, buildState.careerId, buildState.primaryWeaponId, buildState.traits[Constants.PRIMARY_TRAIT_INDEX], 1);

            adjustWeaponStat(weapons, buildState.careerId, buildState.secondaryWeaponId, 1);
            adjustWeaponPropertyOrTraitStat(weaponProperties, buildState.careerId, buildState.secondaryWeaponId, buildState.properties[Constants.SECONDARY_PROPERTY1_INDEX], 1);
            adjustWeaponPropertyOrTraitStat(weaponProperties, buildState.careerId, buildState.secondaryWeaponId, buildState.properties[Constants.SECONDARY_PROPERTY2_INDEX], 1);
            adjustWeaponPropertyOrTraitStat(weaponTraits, buildState.careerId, buildState.secondaryWeaponId, buildState.traits[Constants.SECONDARY_TRAIT_INDEX], 1);

            adjustPropertyOrTraitStat(necklaceProperties, buildState.careerId, buildState.properties[Constants.NECKLACE_PROPERTY1_INDEX], 1);
            adjustPropertyOrTraitStat(necklaceProperties, buildState.careerId, buildState.properties[Constants.NECKLACE_PROPERTY2_INDEX], 1);
            adjustPropertyOrTraitStat(necklaceTraits, buildState.careerId, buildState.traits[Constants.NECKLACE_TRAIT_INDEX], 1);

            adjustPropertyOrTraitStat(charmProperties, buildState.careerId, buildState.properties[Constants.CHARM_PROPERTY1_INDEX], 1);
            adjustPropertyOrTraitStat(charmProperties, buildState.careerId, buildState.properties[Constants.CHARM_PROPERTY2_INDEX], 1);
            adjustPropertyOrTraitStat(charmTraits, buildState.careerId, buildState.traits[Constants.CHARM_TRAIT_INDEX], 1);

            adjustPropertyOrTraitStat(trinketProperties, buildState.careerId, buildState.properties[Constants.TRINKET_PROPERTY1_INDEX], 1);
            adjustPropertyOrTraitStat(trinketProperties, buildState.careerId, buildState.properties[Constants.TRINKET_PROPERTY2_INDEX], 1);
            adjustPropertyOrTraitStat(trinketTraits, buildState.careerId, buildState.traits[Constants.TRINKET_TRAIT_INDEX], 1);
        }
        else { // Check talents and properties and traits of each weapon and gear item and increment/decrement where necessary\
            // TALENTS
            if (buildState.talents[0] !== build.data().talent1) {
                adjustCareerTalent(careers, build.data().careerId, build.data().talent1, 1, -1);
                adjustCareerTalent(careers, buildState.careerId, buildState.talents[0], 1, 1);
            }
            if (buildState.talents[1] !== build.data().talent2) {
                adjustCareerTalent(careers, build.data().careerId, build.data().talent2, 2, -1);
                adjustCareerTalent(careers, buildState.careerId, buildState.talents[1], 2, 1);
            }
            if (buildState.talents[2] !== build.data().talent3) {
                adjustCareerTalent(careers, build.data().careerId, build.data().talent3, 3, -1);
                adjustCareerTalent(careers, buildState.careerId, buildState.talents[2], 3, 1);
            }
            if (buildState.talents[3] !== build.data().talent4) {
                adjustCareerTalent(careers, build.data().careerId, build.data().talent4, 4, -1);
                adjustCareerTalent(careers, buildState.careerId, buildState.talents[3], 4, 1);
            }
            if (buildState.talents[4] !== build.data().talent5) {
                adjustCareerTalent(careers, build.data().careerId, build.data().talent5, 5, -1);
                adjustCareerTalent(careers, buildState.careerId, buildState.talents[4], 5, 1);
            }
            if (buildState.talents[5] !== build.data().talent6) {                                
                adjustCareerTalent(careers, build.data().careerId, build.data().talent6, 6, -1);
                adjustCareerTalent(careers, buildState.careerId, buildState.talents[5], 6, 1);
            }

            // PRIMARY WEAPON
            if (buildState.primaryWeaponId !== build.data().primaryWeapon.id) {
                adjustWeaponStat(weapons, build.data().careerId, build.data().primaryWeapon.id, -1);
                adjustWeaponPropertyOrTraitStat(weaponProperties, build.data().careerId, build.data().primaryWeapon.id, build.data().primaryWeapon.property1Id, -1);
                adjustWeaponPropertyOrTraitStat(weaponProperties, build.data().careerId, build.data().primaryWeapon.id, build.data().primaryWeapon.property2Id, -1);
                adjustWeaponPropertyOrTraitStat(weaponTraits, build.data().careerId, build.data().primaryWeapon.id, build.data().primaryWeapon.traitId, -1);

                adjustWeaponStat(weapons, buildState.careerId, buildState.primaryWeaponId, 1);
                adjustWeaponPropertyOrTraitStat(weaponProperties, buildState.careerId, buildState.primaryWeaponId, buildState.properties[Constants.PRIMARY_PROPERTY1_INDEX], 1);
                adjustWeaponPropertyOrTraitStat(weaponProperties, buildState.careerId, buildState.primaryWeaponId, buildState.properties[Constants.PRIMARY_PROPERTY2_INDEX], 1);
                adjustWeaponPropertyOrTraitStat(weaponTraits, buildState.careerId, buildState.primaryWeaponId, buildState.traits[Constants.PRIMARY_TRAIT_INDEX], 1);
            } else {
                // Weapon is the same as before, only adjust properties/traits
                //check if properties or trait changed
                if (buildState.properties[Constants.PRIMARY_PROPERTY1_INDEX] !== build.data().primaryWeapon.property1Id) {
                    adjustWeaponPropertyOrTraitStat(weaponProperties, build.data().careerId, build.data().primaryWeapon.id, build.data().primaryWeapon.property1Id, -1);
                    adjustWeaponPropertyOrTraitStat(weaponProperties, buildState.careerId, buildState.primaryWeaponId, buildState.properties[Constants.PRIMARY_PROPERTY1_INDEX], 1);
                }
                if (buildState.properties[Constants.PRIMARY_PROPERTY2_INDEX] !== build.data().primaryWeapon.property2Id) {
                    adjustWeaponPropertyOrTraitStat(weaponProperties, build.data().careerId, build.data().primaryWeapon.id, build.data().primaryWeapon.property2Id, -1);
                    adjustWeaponPropertyOrTraitStat(weaponProperties, buildState.careerId, buildState.primaryWeaponId, buildState.properties[Constants.PRIMARY_PROPERTY2_INDEX], 1);
                }
                if (buildState.traits[Constants.PRIMARY_TRAIT_INDEX] !== build.data().primaryWeapon.traitId) {
                    adjustWeaponPropertyOrTraitStat(weaponTraits, build.data().careerId, build.data().primaryWeapon.id, build.data().primaryWeapon.traitId, -1);
                    adjustWeaponPropertyOrTraitStat(weaponTraits, buildState.careerId, buildState.primaryWeaponId, buildState.traits[Constants.PRIMARY_TRAIT_INDEX], 1);
                }

            }

            // SECONDARY WEAPON
            if (buildState.secondaryWeaponId !== build.data().secondaryWeapon.id) {
                adjustWeaponStat(weapons, build.data().careerId, build.data().secondaryWeapon.id, -1);
                adjustWeaponPropertyOrTraitStat(weaponProperties, build.data().careerId, build.data().secondaryWeapon.id, build.data().secondaryWeapon.property1Id, -1);
                adjustWeaponPropertyOrTraitStat(weaponProperties, build.data().careerId, build.data().secondaryWeapon.id, build.data().secondaryWeapon.property2Id, -1);
                adjustWeaponPropertyOrTraitStat(weaponTraits, build.data().careerId, build.data().secondaryWeapon.id, build.data().secondaryWeapon.traitId, -1);

                adjustWeaponStat(weapons, buildState.careerId, buildState.secondaryWeaponId, 1);
                adjustWeaponPropertyOrTraitStat(weaponProperties, buildState.careerId, buildState.secondaryWeaponId, buildState.properties[Constants.SECONDARY_PROPERTY1_INDEX], 1);
                adjustWeaponPropertyOrTraitStat(weaponProperties, buildState.careerId, buildState.secondaryWeaponId, buildState.properties[Constants.SECONDARY_PROPERTY2_INDEX], 1);
                adjustWeaponPropertyOrTraitStat(weaponTraits, buildState.careerId, buildState.secondaryWeaponId, buildState.traits[Constants.SECONDARY_TRAIT_INDEX], 1);
            } else {

                //check if properties or trait changed
                if (buildState.properties[Constants.SECONDARY_PROPERTY1_INDEX] !== build.data().secondaryWeapon.property1Id) {
                    adjustWeaponPropertyOrTraitStat(weaponProperties, build.data().careerId, build.data().secondaryWeapon.id, build.data().secondaryWeapon.property1Id, -1);
                    adjustWeaponPropertyOrTraitStat(weaponProperties, buildState.careerId, buildState.secondaryWeaponId, buildState.properties[Constants.SECONDARY_PROPERTY1_INDEX], 1);
                }
                if (buildState.properties[Constants.SECONDARY_PROPERTY2_INDEX] !== build.data().secondaryWeapon.property2Id) {
                    adjustWeaponPropertyOrTraitStat(weaponProperties, build.data().careerId, build.data().secondaryWeapon.id, build.data().secondaryWeapon.property2Id, -1);
                    adjustWeaponPropertyOrTraitStat(weaponProperties, buildState.careerId, buildState.secondaryWeaponId, buildState.properties[Constants.SECONDARY_PROPERTY2_INDEX], 1);
                }
                if (buildState.traits[Constants.SECONDARY_TRAIT_INDEX] !== build.data().secondaryWeapon.traitId) {
                    adjustWeaponPropertyOrTraitStat(weaponTraits, build.data().careerId, build.data().secondaryWeapon.id, build.data().secondaryWeapon.traitId, -1);
                    adjustWeaponPropertyOrTraitStat(weaponTraits, buildState.careerId, buildState.secondaryWeaponId, buildState.traits[Constants.SECONDARY_TRAIT_INDEX], 1);
                }
            }
            
            adjustPropertyOrTraitStat(necklaceProperties, build.data().careerId, build.data().necklace.property1Id, -1);
            adjustPropertyOrTraitStat(necklaceProperties, buildState.careerId, buildState.properties[Constants.NECKLACE_PROPERTY1_INDEX], 1);

            adjustPropertyOrTraitStat(necklaceProperties, build.data().careerId, build.data().necklace.property2Id, -1);
            adjustPropertyOrTraitStat(necklaceProperties, buildState.careerId, buildState.properties[Constants.NECKLACE_PROPERTY2_INDEX], 1);

            adjustPropertyOrTraitStat(necklaceTraits, build.data().careerId, build.data().necklace.traitId, -1);
            adjustPropertyOrTraitStat(necklaceTraits, buildState.careerId, buildState.traits[Constants.NECKLACE_TRAIT_INDEX], 1);

            adjustPropertyOrTraitStat(charmProperties, build.data().careerId, build.data().charm.property1Id, -1);
            adjustPropertyOrTraitStat(charmProperties, buildState.careerId, buildState.properties[Constants.CHARM_PROPERTY1_INDEX], 1);

            adjustPropertyOrTraitStat(charmProperties, build.data().careerId, build.data().charm.property2Id, -1);
            adjustPropertyOrTraitStat(charmProperties, buildState.careerId, buildState.properties[Constants.CHARM_PROPERTY2_INDEX], 1);

            adjustPropertyOrTraitStat(charmTraits, build.data().careerId, build.data().charm.traitId, -1);
            adjustPropertyOrTraitStat(charmTraits, buildState.careerId, buildState.traits[Constants.CHARM_TRAIT_INDEX], 1);

            adjustPropertyOrTraitStat(trinketProperties, build.data().careerId, build.data().trinket.property1Id, -1);
            adjustPropertyOrTraitStat(trinketProperties, buildState.careerId, buildState.properties[Constants.TRINKET_PROPERTY1_INDEX], 1);

            adjustPropertyOrTraitStat(trinketProperties, build.data().careerId, build.data().trinket.property2Id, -1);
            adjustPropertyOrTraitStat(trinketProperties, buildState.careerId, buildState.properties[Constants.TRINKET_PROPERTY2_INDEX], 1);

            adjustPropertyOrTraitStat(trinketTraits, build.data().careerId, build.data().trinket.traitId, -1);
            adjustPropertyOrTraitStat(trinketTraits, buildState.careerId, buildState.traits[Constants.TRINKET_TRAIT_INDEX], 1);
            


            // NECKLACE
            if (buildState.properties[Constants.NECKLACE_PROPERTY1_INDEX] !== build.data().necklace.property1Id) {
                adjustPropertyOrTraitStat(necklaceProperties, build.data().careerId, build.data().necklace.property1Id, -1);
                adjustPropertyOrTraitStat(necklaceProperties, buildState.careerId, buildState.properties[Constants.NECKLACE_PROPERTY1_INDEX], 1);
            }
            if (buildState.properties[Constants.NECKLACE_PROPERTY2_INDEX] !== build.data().necklace.property2Id) {
                adjustPropertyOrTraitStat(necklaceProperties, build.data().careerId, build.data().necklace.property2Id, -1);
                adjustPropertyOrTraitStat(necklaceProperties, buildState.careerId, buildState.properties[Constants.NECKLACE_PROPERTY2_INDEX], 1);
            }
            if (buildState.traits[Constants.NECKLACE_TRAIT_INDEX] !== build.data().necklace.traitId) {
                adjustPropertyOrTraitStat(necklaceTraits, build.data().careerId, build.data().necklace.traitId, -1);
                adjustPropertyOrTraitStat(necklaceTraits, buildState.careerId, buildState.traits[Constants.NECKLACE_TRAIT_INDEX], 1);
            }
            
            // CHARM
            if (buildState.properties[Constants.CHARM_PROPERTY1_INDEX] !== build.data().charm.property1Id) {
                adjustPropertyOrTraitStat(charmProperties, build.data().careerId, build.data().charm.property1Id, -1);
                adjustPropertyOrTraitStat(charmProperties, buildState.careerId, buildState.properties[Constants.CHARM_PROPERTY1_INDEX], 1);
            }
            if (buildState.properties[Constants.CHARM_PROPERTY2_INDEX] !== build.data().charm.property2Id) {
                adjustPropertyOrTraitStat(charmProperties, build.data().careerId, build.data().charm.property2Id, -1);
                adjustPropertyOrTraitStat(charmProperties, buildState.careerId, buildState.properties[Constants.CHARM_PROPERTY2_INDEX], 1);
            }
            if (buildState.traits[Constants.CHARM_TRAIT_INDEX] !== build.data().charm.traitId) {
                adjustPropertyOrTraitStat(charmTraits, build.data().careerId, build.data().charm.traitId, -1);
                adjustPropertyOrTraitStat(charmTraits, buildState.careerId, buildState.traits[Constants.CHARM_TRAIT_INDEX], 1);
            }
            
            //TRINKET
            if (buildState.properties[Constants.TRINKET_PROPERTY1_INDEX] !== build.data().trinket.property1Id) {
                adjustPropertyOrTraitStat(trinketProperties, build.data().careerId, build.data().trinket.property1Id, -1);
                adjustPropertyOrTraitStat(trinketProperties, buildState.careerId, buildState.properties[Constants.TRINKET_PROPERTY1_INDEX], 1);
            }
            if (buildState.properties[Constants.TRINKET_PROPERTY2_INDEX] !== build.data().trinket.property2Id) {
                adjustPropertyOrTraitStat(trinketProperties, build.data().careerId, build.data().trinket.property2Id, -1);
                adjustPropertyOrTraitStat(trinketProperties, buildState.careerId, buildState.properties[Constants.TRINKET_PROPERTY2_INDEX], 1);
            }
            if (buildState.traits[Constants.TRINKET_TRAIT_INDEX] !== build.data().trinket.traitId) {
                adjustPropertyOrTraitStat(trinketTraits, build.data().careerId, build.data().trinket.traitId, -1);
                adjustPropertyOrTraitStat(trinketTraits, buildState.careerId, buildState.traits[Constants.TRINKET_TRAIT_INDEX], 1);
            }
        }
        
        transaction.update(buildStatsRef, { 
            careers: careers, 
            weapons: weapons,
            weaponProperties: weaponProperties,
            weaponTraits: weaponTraits,
            necklaceProperties: necklaceProperties,
            necklaceTraits: necklaceTraits,
            charmProperties: charmProperties,
            charmTraits: charmTraits,
            trinketProperties: trinketProperties,
            trinketTraits: trinketTraits
        });
    }
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

function isCareerOrGearChanged(build, buildState) {
    return !(buildState.careerId === build.data().careerId &&
    buildState.primaryWeaponId === build.data().primaryWeapon.id &&
    buildState.secondaryWeaponId === build.data().secondaryWeapon.id &&
    buildState.properties[Constants.PRIMARY_PROPERTY1_INDEX] === build.data().primaryWeapon.property1Id &&
    buildState.properties[Constants.PRIMARY_PROPERTY2_INDEX] === build.data().primaryWeapon.property2Id &&
    buildState.properties[Constants.SECONDARY_PROPERTY1_INDEX] === build.data().secondaryWeapon.property1Id &&
    buildState.properties[Constants.SECONDARY_PROPERTY2_INDEX] === build.data().secondaryWeapon.property2Id &&
    buildState.properties[Constants.NECKLACE_PROPERTY1_INDEX] === build.data().necklace.property1Id &&
    buildState.properties[Constants.NECKLACE_PROPERTY2_INDEX] === build.data().necklace.property2Id &&
    buildState.properties[Constants.CHARM_PROPERTY1_INDEX] === build.data().charm.property1Id &&
    buildState.properties[Constants.CHARM_PROPERTY2_INDEX] === build.data().charm.property2Id &&
    buildState.properties[Constants.TRINKET_PROPERTY1_INDEX] === build.data().trinket.property1Id &&
    buildState.properties[Constants.TRINKET_PROPERTY2_INDEX] === build.data().trinket.property2Id &&
    buildState.traits[Constants.PRIMARY_TRAIT_INDEX] === build.data().primaryWeapon.trait &&
    buildState.traits[Constants.SECONDARY_TRAIT_INDEX] === build.data().secondaryWeapon.trait &&
    buildState.traits[Constants.NECKLACE_TRAIT_INDEX] === build.data().necklace.trait &&
    buildState.traits[Constants.CHARM_TRAIT_INDEX] === build.data().charm.trait &&
    buildState.traits[Constants.TRINKET_TRAIT_INDEX] === build.data().trinket.trait);
}

function isBuildReadyForSaving(buildState) {
    return !buildState.talents.some((talent) => { return talent > 3 || talent < 1; }) && buildState.name.length > 2;
}

export class Build {
    constructor(id) {
        this.id = id;

    }

    
}