import React, {Component} from 'react';
import './HeroEquipment.css';
import WeaponSelect from '../weaponSelect/WeaponSelect';

class HeroEquipment extends Component {
  render() {
    return (
        <div className="hero-equipment-container background-27">
            <WeaponSelect type={"melee"}></WeaponSelect>
            <WeaponSelect type={"range"}></WeaponSelect>
      </div>
    );
  }
}

export default HeroEquipment;
