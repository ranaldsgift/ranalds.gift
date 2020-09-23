import React, {Component} from 'react';
import './ItemSelect.css';
import { AppContext } from '../../stores/Store';
import {heroesData} from '../../data/Heroes'
import {meleeWeaponsData} from '../../data/MeleeWeapons'
import {rangeWeaponsData} from '../../data/RangeWeapons'

class ItemSelect extends Component {
  static contextType = AppContext;

  render() {
    return (
        <div className={this.props.type + "-container inventory-item-container border-01"}>
            <p className={this.props.type + "-header"} style={{textTransform: 'uppercase'}}>{this.props.type}</p>
            <div className={this.props.type + "-divider divider-06"}></div>
            {this.renderItems()}
        </div>
    );
  }

  renderItems() {
    const [state] = this.context;

    if (this.props.type === 'melee') {
        return this.renderItemContainer(meleeWeaponsData, this.props.type, state.meleeId);
    } else {
      if (parseInt(state.careerId) === 6 || parseInt(state.careerId) === 16) {
        return this.renderItemContainer(meleeWeaponsData, this.props.type, state.rangeId);
      }
        return this.renderItemContainer(rangeWeaponsData, this.props.type, state.rangeId);
    }
  }

  renderItemContainer(itemsData, itemType, selectedItemId) {
    const [state, updateState] = this.context;
    var weaponsContainerHtml = [];

    var hero = heroesData.find((hero) => { return parseInt(hero.id) === parseInt(state.careerId); });
    hero = hero ? hero : heroesData[0];
    
    var heroItems = itemsData.filter((item) => { return item.canWield.indexOf(hero.codeName) >= 0; });
    
    var item = heroItems.find((item) => { return parseInt(item.id) === parseInt(selectedItemId); });
    if (!item) {
      item = heroItems[0];
        updateState({
          type: "UPDATE_ITEM_SELECT", 
          payload: { 
              id: item.id, 
              type: itemType
          }
      });
    }
    
    for (var i = 0; i < heroItems.length; i++) {
      item = heroItems[i];
      weaponsContainerHtml.push(this.renderItem(item, itemType, parseInt(item.id) === parseInt(selectedItemId)));
    }

    return (
        <div className="weapon-container">
            {weaponsContainerHtml}
        </div>            
    );
  }

  renderItem(item, itemType, selected) {
    var weaponIconClass = selected ? 'weapon-icon selected' : 'weapon-icon';
    return <div key={item.id} className="weapon-background">
              <div className={item.codeName}>
                  <div className={weaponIconClass} data-id={item.id} data-type={itemType} onClick={this.itemSelectChanged.bind(this)}></div>
              </div>
          </div>;
  }

  itemSelectChanged(e) {
    const [state, updateState] = this.context;
    updateState({
        type: "UPDATE_ITEM_SELECT", 
        payload: { 
            id: parseInt(e.currentTarget.dataset.id), 
            type: e.currentTarget.dataset.type
        }
    });
  }

  handleItemClick(e) {

    e.currentTarget.classList.add('selected');
  }
}

export default ItemSelect;