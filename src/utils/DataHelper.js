import {heroesData} from '../data/Heroes'
import {heroesDataMap} from '../data/HeroesDataMap'
import {meleeWeaponsData} from '../data/MeleeWeapons'
import {rangeWeaponsData} from '../data/RangeWeapons'
import {weaponsData} from '../data/Weapons'
import {twitchData} from '../data/Twitch'
import {weaponsDataMap} from '../data/WeaponsDataMap'
import {traitsData} from '../data/Traits'
import {propertiesData} from '../data/Properties'
import { PatchList } from '../data/PatchList'
import {missionData} from '../data/Missions'
import {sortByData} from '../data/BuildSortOptions'
import {difficultyData} from '../data/Difficulties'
import {potionData} from '../data/Potions'
import {roleData} from '../data/Roles'
import {bookData} from '../data/Books'
import {correctedTalentsData} from '../data/CorrectedTalents'
import {correctedPerksData} from '../data/CorrectedPerks'
import {correctedPassivesData} from '../data/CorrectedPassives'
import {correctedSkillsData} from '../data/CorrectedSkills'
import {unlistedPerksData} from '../data/UnlistedPerks'
import React from 'react';
import { db } from './Firebase'
import { traitsDataMap } from '../data/TraitsDataMap'

let users = null;
let userBuildAuthors = null;
let weapons = null;
let traits = {};

export class DataHelper {
    static getCareers = () => {
      var values = Object.values(heroesData);
      var keys = Object.keys(heroesData);
      var valueMap = values.map((obj, index) => {
        obj.codeName = keys[index];
        var careerMap = heroesDataMap.find((career) => { return career.codeName === keys[index] });
        if (careerMap) {
          obj.id = careerMap.id;
          obj.sortOrder = careerMap.sortOrder;
          obj.heroId = careerMap.heroId;
        }
        return obj;
       });
       return valueMap.sort((a, b) => { return a.sortOrder > b.sortOrder ? 1 : a.sortOrder < b.sortOrder ? -1 : 0; });
    }
    static getCareer = (careerId) => {

      return this.getCareers().find((career) => { return career.id === parseInt(careerId); })
      var careerMap = heroesDataMap.find((career) => {return career.id === parseInt(careerId);});
      var career = null;

      var careers = this.getCareers();
      if (careerMap) {
        career = careers.find((career) => { return career.codeName === careerMap.codeName })
      }

      if (!career) {
        career = careers[0];
        careerId = 1
      }

      career.id = careerId;
      return career;
    }
    
    static getCareerTalents = (careerId) => {
      var career = this.getCareer(careerId);
      return career ? career.talents : null;
    }

    static getCorrectedTalent = (careerId, tierNumber, talentNumber) => {
      return correctedTalentsData.find((talent) => {return talent.careerId === parseInt(careerId) && talent.tier === parseInt(tierNumber) && talent.talent === parseInt(talentNumber)});
    }

    static getCorrectedPerk = (careerId, perkName) => {
      return correctedPerksData.find((perk) => {return perk.careerId === parseInt(careerId) && perk.name.toLowerCase() === perkName.toLowerCase()});
    }

    static getCorrectedPassive = (careerId) => {
      return correctedPassivesData.find((passive) => {return passive.careerId === parseInt(careerId)});
    }

    static getCorrectedSkill = (careerId) => {
      return correctedSkillsData.find((skill) => {return skill.careerId === parseInt(careerId)});
    }

    static getUnlistedPerks = (careerId) => {
      return unlistedPerksData.filter((perk) => { return perk.careerId === parseInt(careerId); });
    }

    static getTraitData = (id, type) => {
      switch (type) {
        case 'melee':
          return traitsData.melee.find((trait) => { return parseInt(trait.id) === parseInt(id); });
        case 'range':
          return traitsData.range.find((trait) => { return parseInt(trait.id) === parseInt(id); });
        case 'necklace':
          return traitsData.necklace.find((trait) => { return parseInt(trait.id) === parseInt(id); });
        case 'charm':
          return traitsData.charm.find((trait) => { return parseInt(trait.id) === parseInt(id); });
        case 'trinket':
          return traitsData.trinket.find((trait) => { return parseInt(trait.id) === parseInt(id); });
        default:
          return null;
      }
    }
    static getPropertyData = (id, type) => {
      return propertiesData.find((trait) => { return parseInt(trait.id) === parseInt(id); });
    }
    static getPatchFromDate = (date) => {
      var filteredPatchList = PatchList.filter((patch) => {
          return patch.date < date;
      });

      return filteredPatchList[filteredPatchList.length - 1];
    }

    static getDaysSinceDate = (date) => {
      var millisecondsPerDay = 24 * 60 * 60 * 1000;
      return Math.floor((Date.parse(new Date()) - Date.parse(date)) / millisecondsPerDay);
    }
    
    static getPatchFromDateForType = (date, updateType) => {
      var filteredPatchList = PatchList.filter((patch) => {
          return patch.date < date && patch.type === updateType;
      });

      return filteredPatchList[filteredPatchList.length - 1];
    }

    static getDataByIds = (data, ids) => {
      return data.filter((item) => { return ids.includes(item.id); });
    }

    static getDataById = (data, id) => {
      return data.find((item) => { return item.id === id; });
    }

    static getDifficultyById = (id) => {
      return this.getDataById(difficultyData, id);
    }

    static getDifficultiesByIds = (ids) => {
      return this.getDataByIds(difficultyData, ids);
    }

    static getMissionById = (id) => {
      return this.getDataById(missionData, id);
    }

    static getMissionsByIds = (ids) => {
      return this.getDataByIds(missionData, ids);
    }

    static getPotionById = (id) => {
      return this.getDataById(potionData, id);
    }

    static getPotionsByIds = (ids) => {
      return this.getDataByIds(potionData, ids);
    }

    static getRolesByIds = (ids) => {
      return this.getDataByIds(roleData, ids);
    }

    static getBookById = (id) => {
      return this.getDataById(bookData, id);
    }

    static getTwitchById = (id) => {
      return this.getDataById(twitchData, id);
    }

    static getBooksByIds = (ids) => {
      return this.getDataByIds(bookData, ids);
    }

    static getSortByData = () => {
      return sortByData;
    }

    static getSortOrderById = (id) => {
      return sortByData.find((sortOrder) => { return sortOrder.id === id; });
    }

    static getMissionData = () => {
      return missionData;
    }
    
    static getDifficultyData = () => {
      return difficultyData;
    }
    
    static getTwitchData = () => {
      return twitchData;
    }
    
    static getPotionData = () => {
      return potionData;
    }
    
    static getRoleData = () => {
      return roleData;
    }

    static getBookData = () => {
      return bookData;
    }

    static async getUsers() {
      if (!users) {
        return await db.collection('stats').doc('users').get().then((usersDoc) => {
          if (!usersDoc) {
            return [];
          }
          users = usersDoc.data().usernames; 
          return usersDoc.data().usernames;
        });
      }
      return users;
    }

    static async getUserBuildAuthors() {
      if (!userBuildAuthors) {
        return await db.collection('stats').doc('users').get().then((usersDoc) => {
          if (!usersDoc) {
            return [];
          }
          userBuildAuthors = usersDoc.data().usernames.filter((user) => { return user.isBuildAuthor; }); 
          return userBuildAuthors;
        });
      }
      return userBuildAuthors;
    }

    static renderListOptions = (data) => {
      let html = [];
      data.forEach(item => {
          html.push(<option key={item.id} value={item.id}>{item.name}</option>);
      });
      return html;
    }

    static getPropertiesForCategory = (category) => {
      switch (category) {
        case "melee":
          return propertiesData.melee;
        case "range":
          return propertiesData.range;
        case "necklace":
          return propertiesData.necklace;
        case "charm":
          return propertiesData.charm;
        case "trinket":
          return propertiesData.trinket;
        default:
          return null;
      }
    }

    static getPropertyFromCategory = (category, propertyId) => {
      switch (category) {
        case "melee":
          return propertiesData.melee.find((property) => { return parseInt(property.id) === parseInt(propertyId); });
        case "ranged":
          return propertiesData.range.find((property) => { return parseInt(property.id) === parseInt(propertyId); });
        case "necklace":
          return propertiesData.necklace.find((property) => { return parseInt(property.id) === parseInt(propertyId); });
        case "charm":
          return propertiesData.charm.find((property) => { return parseInt(property.id) === parseInt(propertyId); });
        case "trinket":
          return propertiesData.trinket.find((property) => { return parseInt(property.id) === parseInt(propertyId); });
        default:
          return null;
      }
    }

    static getTraitMap = (category, traitId) => {
      var categoryTraits = traitsDataMap[category];

      if (!categoryTraits) {
        return null;
      }
      return categoryTraits.find((trait) => { return parseInt(trait.id) === parseInt(traitId); });
    }

    static getTraitMapByName = (category, name) => {
      var categoryTraits = traitsDataMap[category];
      
      if (!categoryTraits) {
        return null;
      }
      return Object.values(categoryTraits).find((trait) => { return trait.name.toLowerCase() === name.toLowerCase(); });
    }

    static getMappedTraits = (category) => {
      if (!traits[category]) {
        var traitKeys = Object.keys(traitsData[category]);
        var categoryTraits = Object.values(traitsData[category]).map((trait, index) => {
          var traitMap = this.getTraitMapByName(category, trait.name);
  
          if (traitMap) {
            trait.id = parseInt(traitMap.id);
            trait.codeName = traitKeys[index];
          }
          return trait;
        });

        categoryTraits = categoryTraits.sort((a, b) => { return a.id > b.id ? 1 : a.id < b.id ? -1 : 0; });

        traits[category] = categoryTraits;
      }

      return traits[category];
    }

    static getTraitFromCategory = (category, traitId) => {
      return this.getMappedTraits(category).find((trait) => { return parseInt(trait.id) === parseInt(traitId); });
    }

    static getTraitsForCategory = (category) => {
      switch (category) {
        case "melee":
          return traitsData.melee;
        case "range":
        case "ranged_ammo":
          return traitsData.ranged_ammo;
        case "magic":
        case "ranged_heat":
          return traitsData.ranged_heat;
        case "ranged_energy":
          return traitsData.ranged_energy
        case "defence_accessory":
          return traitsData.necklace;
        case "offence_accessory":
          return traitsData.charm;
        case "utility_accessory":
          return traitsData.trinket;
        default:
          return null;
      }
    }

    static getWeapon = (weaponId) => {
      var weapon  = this.getWeapons().find((weapon) => { return weapon.id === parseInt(weaponId); });

      if (!weapon) {
        return null;
      }
      
      return weapon;
    }

    static getWeaponCodename = (weaponId) => {
      var weapon = this.getWeapons().find((weapon) => { return weapon.id === parseInt(weaponId); });
      return weapon ? weapon.codeName : null;
    }

    static getWeapons = () => {
      if (!weapons) {
        var values = Object.values(weaponsData);
        var keys = Object.keys(weaponsData);
        weapons = values.map((obj, index) => {
          obj.codeName = keys[index];
          var weaponMap = weaponsDataMap.find((weapon) => { return weapon.codeName === keys[index] });
          if (weaponMap) {
            obj.id = parseInt(weaponMap.id);
          }
          return obj;
         });

      }

      return weapons;      
    }

    static getWeaponByCodename = (weaponCodename) => {
      var weapon  = this.getWeapons().find((weapon) => { return weapon.codeName === weaponCodename.toString(); });

      if (!weapon) {
        return null;
      }
      
      return weapon;
    }
    
    static arraysEqual = (a, b) => {
      if (a === b) return true;
      if (a == null || b == null) return false;
      if (a.length !== b.length) return false;
    
      // If you don't care about the order of the elements inside
      // the array, you should sort both arrays here.
      // Please note that calling sort on an array will modify that array.
      // you might want to clone your array first.
    
      for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
      }
      return true;
    }

    static getTraitFromWeapon = (weaponId, traitId) => {
      var weapon = this.getWeapon(weaponId);
      if (!weapon) {
        return;
      }
      return this.getTraitFromCategory(weapon.propertyCategory, traitId);
    }

    static getPropertyFromWeapon = (weaponId, propertyId) => {
      var weapon = this.getWeapon(weaponId);
      if (!weapon) {
        return;
      }
      return this.getPropertyFromCategory(weapon.propertyCategory, propertyId);
    }

    static getPrimaryWeaponsForCareer = (careerId) => {
      var career = this.getCareer(parseInt(careerId));
      var weapons = this.getWeapons().filter((weapon) => { return weapon.canWieldPrimary.includes(career.codeName); });
      return weapons;

      var mappedWeapons = weapons.map(weapon =>
        ({...weapon, id: this.getWeaponId(weapon.codeName)})
      );

      return mappedWeapons;
    }

    static getSecondaryWeaponsForCareer = (careerId) => {
      var career = this.getCareer(parseInt(careerId));
      var weapons = this.getWeapons().filter((weapon) => { return weapon.canWieldSecondary.includes(career.codeName); });
      return weapons;

      var mappedWeapons = weapons.map((weapon) => {
        return {...weapon, id: this.getWeaponId(weapon.codeName)}
      });

      return mappedWeapons;
    }

    static getWeaponId = (codename) => {
      var mappedWeapon =  weaponsDataMap.find((weapon) => { return weapon.codeName === codename; });
      return mappedWeapon ? mappedWeapon.id : null;
    }
  }