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

class Inventory extends Component {
    static contextType = AppContext;
  render() {
    const [state] = this.context;
    var hero = heroesData.find((hero) => { return hero.id === parseInt(state.careerId); });
    hero = hero ? hero : heroesData[0];
    var heroWeapons = meleeWeaponsData.filter((weapon) => { return weapon.canWield.indexOf(hero.codeName) >= 0; });
    
    var melee = heroWeapons.find((weapon) => { return parseInt(weapon.id) === parseInt(state.meleeId); });
    if (!melee) {
        melee = heroWeapons[0];
    }
    
    if (parseInt(state.careerId) !== 6 && parseInt(state.careerId) !== 16) {
        heroWeapons = rangeWeaponsData.filter((weapon) => { return weapon.canWield.indexOf(hero.codeName) >= 0; });
    }
    
    var range = heroWeapons.find((weapon) => { return parseInt(weapon.id) === parseInt(state.rangeId); });
    if (!range) {
        range = heroWeapons[0];
    }
    return (
        <Tabs className="container-tabs inventory-container">
            <TabList className="container-tabs-list">
                <Tab>Melee</Tab>
                <Tab>Range</Tab>
                <Tab>Jewelry</Tab>
            </TabList>
            <TabPanel>
                <ItemSelect type={"melee"}></ItemSelect>
                <InventoryItemDisplay trait={state.traits[0]} properties={[state.properties[0], state.properties[1]]} item={melee} type={"melee"}></InventoryItemDisplay>
            </TabPanel>
            <TabPanel>
                <ItemSelect type={"range"}></ItemSelect>
                <InventoryItemDisplay trait={state.traits[1]} properties={[state.properties[2], state.properties[3]]} item={range} type={"range"}></InventoryItemDisplay>
            </TabPanel>
            <TabPanel className="jewelry-tab react-tabs__tab-panel">
                <InventoryItemDisplay trait={state.traits[2]} properties={[state.properties[4], state.properties[5]]} item={{name: 'Necklace'}} type={"necklace"}></InventoryItemDisplay>
                <InventoryItemDisplay trait={state.traits[3]} properties={[state.properties[6], state.properties[7]]} item={{name: 'Charm'}} type={"charm"}></InventoryItemDisplay>
                <InventoryItemDisplay trait={state.traits[4]} properties={[state.properties[8], state.properties[9]]} item={{name: 'Trinket'}} type={"trinket"}></InventoryItemDisplay>
            </TabPanel>
        </Tabs>
    );
  }
}

export default Inventory;