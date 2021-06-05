import React, {Component} from 'react';
import { DataHelper } from '../../utils/DataHelper';

class WeaponTooltip extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.id
        }
    }

  render() {
    var item = DataHelper.getWeapon(this.state.id);
    var itemDescription = item.description ? item.description : '';
    
    var itemStaminaHtml = '';
    if (item.stamina) {
      itemStaminaHtml = <div className="item-stamina">
                          <div className="stamina-angle-background"><div className={`stamina-angle stamina-angle-${item.blockAngle}`}><div className="stamina-icon"></div></div></div>
                          <p className="item-stamina-text">{item.stamina}</p>
                        </div>;
    }

      return (
        <div className="inventory-item-display-container">
            <p className="inventory-item-header">{item.name}</p>
            <div className="inventory-item-summary-container">
                <p className="item-power-level">300</p>
                {itemStaminaHtml}
            </div>
            <p className="inventory-item-footer border-01">{itemDescription.replace(/weapon_keyword_/g, '').replace(/_/g, ' ').split(',').join(', ')}</p>
        </div>
    );
  }

}

export default WeaponTooltip;