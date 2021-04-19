import {heroesData} from '../data/Heroes'
import {meleeWeaponsData} from '../data/MeleeWeapons'
import {rangeWeaponsData} from '../data/RangeWeapons'
import {traitsData} from '../data/Traits'
import {propertiesData} from '../data/Properties'
import { PatchList } from '../data/PatchList'

export class DataHelper {
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
}