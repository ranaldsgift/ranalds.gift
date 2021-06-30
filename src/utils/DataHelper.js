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
import React from 'react';
import { db } from './Firebase'

let users = null;
let userBuildAuthors = null;

export class DataHelper {
    static getCareers = () => {
      return heroesData;  
    }
    static getCareer = (careerId) => {
      var careerMap = heroesDataMap.find((career) => {return career.id === parseInt(careerId);});
      var career = null;

      if (careerMap) {
        career = heroesData.find((career) => { return career.codeName === careerMap.codeName })
      }

      if (!career) {
        career = heroesData[0];
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
        case "range":
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

    static getTraitFromCategory = (category, traitId) => {
      switch (category) {
        case "melee":
          return traitsData.melee.find((property) => { return parseInt(property.id) === parseInt(traitId); });
        case "range":
          return traitsData.range.find((property) => { return parseInt(property.id) === parseInt(traitId); });
        case "magic":
          return traitsData.magic.find((property) => { return parseInt(property.id) === parseInt(traitId); });
        case "necklace":
          return traitsData.necklace.find((property) => { return parseInt(property.id) === parseInt(traitId); });
        case "charm":
          return traitsData.charm.find((property) => { return parseInt(property.id) === parseInt(traitId); });
        case "trinket":
          return traitsData.trinket.find((property) => { return parseInt(property.id) === parseInt(traitId); });
        default:
          return null;
      }
    }

    static getTraitsForCategory = (category) => {
      switch (category) {
        case "melee":
          return traitsData.melee;
        case "range":
          return traitsData.range;
        case "magic":
          return traitsData.magic;
        case "necklace":
          return traitsData.necklace;
        case "charm":
          return traitsData.charm;
        case "trinket":
          return traitsData.trinket;
        default:
          return null;
      }
    }

    static getWeapon = (weaponId) => {
      var weapon = this.getWeaponByCodename(this.getCodename(weaponId));

      if (weapon) {
        weapon.id = weaponId;
      }

      return weapon;
      //return weaponsData.find((weapon) => { return weapon.id === parseInt(weaponId); });
    }

    static getCodename = (weaponId) => {
      var weapon = weaponsDataMap.find((weapon) => { return weapon.id === parseInt(weaponId); });
      return weapon ? weapon.codeName : null;
    }

    static getWeaponByCodename = (weaponCodename) => {
      var weapon  = weaponsData.find((weapon) => { return weapon.codeName === weaponCodename.toString(); });

      if (!weapon) {
        return null;
      }

      weapon.id = this.getWeaponId(weaponCodename);
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
      var weapons = weaponsData.filter((weapon) => { return weapon.canWieldPrimary.includes(parseInt(careerId)); });

      var mappedWeapons = weapons.map(weapon =>
        ({...weapon, id: this.getWeaponId(weapon.codeName)})
      );

      return mappedWeapons;
    }

    static getSecondaryWeaponsForCareer = (careerId) => {
      var weapons = weaponsData.filter((weapon) => { return weapon.canWieldSecondary.includes(parseInt(careerId)); });

      var mappedWeapons = weapons.map((weapon) => {
        return {...weapon, id: this.getWeaponId(weapon.codeName)}
      });

      return mappedWeapons;
    }

    static getWeaponId = (codename) => {
      var mappedWeapon =  weaponsDataMap.find((weapon) => { return weapon.codeName === codename; });
      return mappedWeapon ? mappedWeapon.id : null;
    }

    static getBuildStats = () => {
/*       let careers = [];

      this.getCareers().forEach((career) => {
        let primaryWeapons = this.getPrimaryWeaponsForCareer(career.id);
        let secondaryWeapons = this.getSecondaryWeaponsForCareer(career.id);

        let weaponData = [];

        primaryWeapons.forEach((weapon) => {
          let properties = this.getPropertiesForCategory(weapon.propertyCategory)

          let propertyData = [];
          properties.forEach((property) => {
            propertyData.push({
              id: property.id,
              count: 0
            });
          });

          let traits = this.getTraitsForCategory(weapon.traitCategory);

          let traitData = [];
          traits.forEach((trait) => {
            traitData.push({
              id: trait.id,
              count: 0
            });
          });

          weaponData.push({
            id: weapon.id,
            count: 0,
            properties: propertyData,
            traits: traitData
          });
        });

        secondaryWeapons.forEach((weapon) => {
          let properties = this.getPropertiesForCategory(weapon.propertyCategory)

          let propertyData = [];
          properties.forEach((property) => {
            propertyData.push({
              id: property.id,
              count: 0
            });
          });

          let traits = this.getTraitsForCategory(weapon.traitCategory);

          let traitData = [];
          traits.forEach((trait) => {
            traitData.push({
              id: trait.id,
              count: 0
            });
          });

          weaponData.push({
            id: weapon.id,
            count: 0,
            properties: propertyData,
            traits: traitData
          });
        });

        let careerData = {
          id: career.id,
          count: 0,
          weapons: weaponData
        };

        careers.push(careerData);
      });
      console.log(careers);

      db.collection('builds').doc('stats').set({
        careers: careers
      }); */

/*       db.collection('builds').doc('stats').get().then((document) => {
        console.log(document.data());
      }); */
    }
  }