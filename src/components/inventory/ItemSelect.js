import React, {Component} from 'react';
import './ItemSelect.css';
import { AppContext } from '../../stores/Store';
import {heroesData} from '../../data/Heroes'
import {meleeWeaponsData} from '../../data/MeleeWeapons'
import {rangeWeaponsData} from '../../data/RangeWeapons'
import {weaponsData} from '../../data/Weapons'
import WeaponIcon from './WeaponIcon';

class ItemSelect extends Component {
  static contextType = AppContext;

  render() {
    return (
        <div className={this.props.type + "-container inventory-item-container border-01 background-27"}>
            <p className={this.props.type + "-header inventory-item-container-header"} style={{textTransform: 'uppercase'}}>{this.props.type}</p>
            <div className={this.props.type + "-divider divider-06"}></div>
            {this.renderItems()}
        </div>
    );
  }

  renderItems() {
    const [state] = this.context;

    return this.renderItemContainer(this.props.type, this.props.selectedItemId, this.props.careerId);

/*     if (this.props.type === 'melee') {
        return this.renderItemContainer(meleeWeaponsData, this.props.type, state.meleeId, 1);
    } else {
      if (parseInt(state.careerId) === 6 || parseInt(state.careerId) === 16) {
        return this.renderItemContainer(meleeWeaponsData, "melee", state.rangeId, 2);
      }
        return this.renderItemContainer(rangeWeaponsData, this.props.type, state.rangeId, 2);
    } */
  }

  renderItemContainer(itemType, selectedItemId, careerId) {
    const [state, updateState] = this.context;
    var weaponsContainerHtml = [];

    var hero = heroesData.find((hero) => { return parseInt(hero.id) === parseInt(careerId); });
    hero = hero ? hero : heroesData[0];

    var weaponsForHero = [];

    if (itemType === "primary") {
      weaponsForHero = weaponsData.filter((item) => { return item.canWieldPrimary.includes(careerId); });
    } 
    else if (itemType === "secondary") {
      weaponsForHero = weaponsData.filter((item) => { return item.canWieldSecondary.includes(careerId); });
    }

    var selectedWeapon = weaponsForHero.find((item) => { return parseInt(item.id) === parseInt(selectedItemId); });

    if (!selectedWeapon) {
      selectedWeapon = weaponsForHero[0];
        
        updateState({
          type: "UPDATE_ITEM_SELECT", 
          payload: { 
              id: parseInt(selectedWeapon.id),
              type: itemType
          }
      });
    }
    
    for (var i = 0; i < weaponsForHero.length; i++) {
      var weapon = weaponsForHero[i];
      weaponsContainerHtml.push(this.renderItem(weapon, itemType, parseInt(weapon.id) === parseInt(selectedItemId)));
    }

    return (
        <div className="weapon-container">
            {weaponsContainerHtml}
        </div>            
    );
  }

  renderItem(item, itemType, selected) {
    return <WeaponIcon key={item.id} id={item.id} slot={itemType} selected={selected} handleClick={this.itemSelectChanged.bind(this)}></WeaponIcon>;
  }

  itemSelectChanged(e) {
    const [state, updateState] = this.context;
    updateState({
        type: "UPDATE_ITEM_SELECT", 
        payload: { 
            id: parseInt(e.currentTarget.dataset.id), 
            type: e.currentTarget.dataset.slot
        }
    });
  }

  handleItemClick(e) {

    e.currentTarget.classList.add('selected');
  }
}

export default ItemSelect;