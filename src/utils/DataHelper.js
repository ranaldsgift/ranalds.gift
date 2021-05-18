import {heroesData} from '../data/Heroes'
import {meleeWeaponsData} from '../data/MeleeWeapons'
import {rangeWeaponsData} from '../data/RangeWeapons'
import {weaponsData} from '../data/Weapons'
import {traitsData} from '../data/Traits'
import {propertiesData} from '../data/Properties'
import { PatchList } from '../data/PatchList'
import {missionData} from '../data/Missions'
import {difficultyData} from '../data/Difficulties'
import {potionData} from '../data/Potions'
import {roleData} from '../data/Roles'
import {bookData} from '../data/Books'
import React from 'react';
import { db } from './Firebase'

export class DataHelper {
    static getCareers = () => {
      return heroesData;  
    }
    static getCareer = (careerId) => {
        for (var i = 0; i < heroesData.length; i++) {
            if (heroesData[i].id === parseInt(careerId)) {
              return heroesData[i];
            }
          }
        return null;
    }
    static getMeleeData = (careerId, id) => {  
      console.log('getting melee data for id ' + id);
      return meleeWeaponsData.find((weapon) => { return parseInt(weapon.id) === parseInt(id); });
    }
    static getRangeData = (careerId, id) => {
      if ((parseInt(careerId) !== 6 && parseInt(careerId) !== 16)) {
        return rangeWeaponsData.find((weapon) => { return parseInt(weapon.id) === parseInt(id); });
      }
      return meleeWeaponsData.find((weapon) => { return parseInt(weapon.id) === parseInt(id); });
    }
    static getTraitData = (id, type) => {
      switch (type) {
        case 'melee':
          return traitsData.melee.find((trait) => { return parseInt(trait.id) === parseInt(id); });
        case 'range':
          return traitsData.range.find((trait) => { return parseInt(trait.id) === parseInt(id); });;
        case 'necklace':
          return traitsData.necklace.find((trait) => { return parseInt(trait.id) === parseInt(id); });;
        case 'charm':
          return traitsData.charm.find((trait) => { return parseInt(trait.id) === parseInt(id); });;
        case 'trinket':
          return traitsData.trinket.find((trait) => { return parseInt(trait.id) === parseInt(id); });;  
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

    static getDifficultiesByIds = (ids) => {
      return this.getDataByIds(difficultyData, ids);
    }

    static getMissionsByIds = (ids) => {
      return this.getDataByIds(missionData, ids);
    }

    static getPotionsByIds = (ids) => {
      return this.getDataByIds(potionData, ids);
    }

    static getRolesByIds = (ids) => {
      return this.getDataByIds(roleData, ids);
    }

    static getBooksByIds = (ids) => {
      return this.getDataByIds(bookData, ids);
    }

    static getMissionData = () => {
      return missionData;
    }
    
    static getDifficultyData = () => {
      return difficultyData;
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
      }
    }

    static getWeapon = (weaponId) => {
      //alert(weaponId);
      return weaponsData.find((weapon) => { return weapon.id === parseInt(weaponId); });
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
      return weaponsData.filter((weapon) => { return weapon.canWieldPrimary.includes(parseInt(careerId)); });
    }

    static getSecondaryWeaponsForCareer = (careerId) => {
      return weaponsData.filter((weapon) => { return weapon.canWieldSecondary.includes(parseInt(careerId)); });
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