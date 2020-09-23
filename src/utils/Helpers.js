import {meleeWeaponsData} from '../../data/MeleeWeapons'
import {rangeWeaponsData} from '../../data/RangeWeapons'

export const GetWeaponIcon = (weaponId, weaponType, selected) => {
    var weapon = meleeWeaponsData.find((weapon) => { return weapon.id == weaponId; });

    if (weaponType == "range") {
        weapon = rangeWeaponsData.find((weapon) => { return weapon.id == weaponId; });
    }
    var weaponIconClass = selected ? 'weapon-icon selected' : 'weapon-icon';

    return (
    <div className="weapon-background">
        <div className={weapon.codeName}>
            <div className={weaponIconClass} data-id={weapon.id} data-type="melee" onClick={this.itemSelectChanged.bind(this)}></div>
        </div>
    </div>
    );
}