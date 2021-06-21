import React, {Component} from 'react';
import './Inventory.css';
import InventoryItemDisplay from './InventoryItemDisplay'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import ItemSelect from './ItemSelect';
import { AppContext } from '../../stores/Store';
import {heroesData} from '../../data/Heroes'
import {meleeWeaponsData} from '../../data/MeleeWeapons'
import {rangeWeaponsData} from '../../data/RangeWeapons'
import { DataHelper } from '../../utils/DataHelper';

class Inventory extends Component {
    static contextType = AppContext;
  render() {
    const [state] = this.context;
    var hero = DataHelper.getCareer(state.careerId);
    hero = hero ? hero : heroesData[0];

    var primaryWeapons = DataHelper.getPrimaryWeaponsForCareer(hero.id);
    var secondaryWeapons = DataHelper.getSecondaryWeaponsForCareer(hero.id);
    
    var primaryWeapon = primaryWeapons.find((weapon) => { return parseInt(weapon.id) === parseInt(state.primaryWeaponId); });
    if (!primaryWeapon) {
        primaryWeapon = primaryWeapons[0];
    }
    
    var secondaryWeapon = secondaryWeapons.find((weapon) => { return parseInt(weapon.id) === parseInt(state.secondaryWeaponId); });
    if (!secondaryWeapon) {
        secondaryWeapon = secondaryWeapons[0];
    }

    return (
        <Tabs className="container-tabs inventory-container top-left-shadow">
            <TabList className="container-tabs-list">
                <Tab>Primary</Tab>
                <Tab>Secondary</Tab>
                <Tab>Equipment</Tab>
            </TabList>
            <TabPanel>
                <ItemSelect type={"primary"} selectedItemId={state.primaryWeaponId} careerId={state.careerId}></ItemSelect>
                <InventoryItemDisplay trait={state.traits[0]} properties={[state.properties[0], state.properties[1]]} item={primaryWeapon} slot="primary"></InventoryItemDisplay>
            </TabPanel>
            <TabPanel>
                <ItemSelect type={"secondary"} selectedItemId={state.secondaryWeaponId} careerId={state.careerId}></ItemSelect>
                <InventoryItemDisplay trait={state.traits[1]} properties={[state.properties[2], state.properties[3]]} item={secondaryWeapon} slot="secondary"></InventoryItemDisplay>
            </TabPanel>
            <TabPanel className="jewelry-tab react-tabs__tab-panel">
                <InventoryItemDisplay trait={state.traits[2]} properties={[state.properties[4], state.properties[5]]} item={{name: 'Necklace', propertyCategory: 'necklace', traitCategory: 'necklace'}}></InventoryItemDisplay>
                <InventoryItemDisplay trait={state.traits[3]} properties={[state.properties[6], state.properties[7]]} item={{name: 'Charm', propertyCategory: 'charm', traitCategory: 'charm'}}></InventoryItemDisplay>
                <InventoryItemDisplay trait={state.traits[4]} properties={[state.properties[8], state.properties[9]]} item={{name: 'Trinket', propertyCategory: 'trinket', traitCategory: 'trinket'}}></InventoryItemDisplay>
            </TabPanel>
        </Tabs>
    );
  }
}

export default Inventory;