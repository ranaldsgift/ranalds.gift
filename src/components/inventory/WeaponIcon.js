import React, {Component} from 'react';
import { DataHelper } from '../../utils/DataHelper';
import InventoryItemDisplay from './InventoryItemDisplay';
import './WeaponIcon.css';
import WeaponTooltip from './WeaponTooltip';

class WeaponIcon extends Component {

  render() {
    var weaponIconClass = this.props.selected ? 'weapon-icon selected' : 'weapon-icon';
    var weaponData = DataHelper.getWeapon(this.props.id);

      return (
        <div key={this.props.id} className="weapon-icon border-04" data-id={this.props.id} data-selected={this.props.selected} data-slot={this.props.slot} onClick={this.props.handleClick}>
          <div className="tooltip border-35">
              <span className="name header-underline">{weaponData.name}</span>
              <span className="description">{weaponData.description ? weaponData.description.replace(/weapon_keyword_/g, '').replace(/_/g, ' ').split(',').join(', ') : ''}</span>
          </div>
        </div>
    );
  }

}

export default WeaponIcon;