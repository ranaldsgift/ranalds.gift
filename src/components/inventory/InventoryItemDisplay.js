import React, {Component} from 'react';
import './InventoryItemDisplay.css';
import PropertiesSelect from '../properties/PropertiesSelect';
import {propertiesData} from '../../data/Properties'
import {traitsData} from '../../data/Traits'
import {AppContext} from '../../stores/Store'
import TraitsSelect from '../traits/TraitsSelect';

class InventoryItemDisplay extends Component 
{
  static contextType = AppContext;
    render() {
      const [state] = this.context;

      var property1Index, property2Index, traitIndex;
      
      switch (this.props.item.traitCategory) {
        case 'melee':
          property1Index = this.props.slot === "primary" ? 0 : 2;
          property2Index = this.props.slot === "primary" ? 1 : 3;
          traitIndex = this.props.slot === "primary" ? 0 : 1;
          return this.renderItemDisplay(this.props.item, propertiesData.melee, traitsData.melee, property1Index, property2Index, traitIndex);
        case 'range':
          property1Index = this.props.slot === "primary" ? 0 : 2;
          property2Index = this.props.slot === "primary" ? 1 : 3;
          traitIndex = this.props.slot === "primary" ? 0 : 1;
          return this.renderItemDisplay(this.props.item, propertiesData.range, traitsData.range, property1Index, property2Index, traitIndex);
        case 'magic':
          return this.renderItemDisplay(this.props.item, propertiesData.range, traitsData.magic, 2, 3, 1);
        case 'necklace':
          return this.renderItemDisplay(this.props.item, propertiesData.necklace, traitsData.necklace, 4, 5, 2);
        case 'charm':
          return this.renderItemDisplay(this.props.item, propertiesData.charm, traitsData.charm, 6, 7, 3);
        case 'trinket':
          return this.renderItemDisplay(this.props.item, propertiesData.trinket, traitsData.trinket, 8, 9, 4);    
        default:
          throw new Error("Can't render inventory item display");
      }
    }
    renderItemDisplay(item, propertyData, traitData, propertyIndex1, propertyIndex2, traitIndex) {
      var itemDescription = item.description ? item.description : '';
      
      var itemStaminaHtml = '';
      if (item.stamina) {
        itemStaminaHtml = <div className="item-stamina">
                            <div className="stamina-angle-background"><div className={`stamina-angle stamina-angle-${item.blockAngle}`}><div className="stamina-icon"></div></div></div>
                            <p className="item-stamina-text">{item.stamina}</p>
                          </div>;
      }
      const [state] = this.context;

      var property1Index = propertyData.findIndex((property) => { return parseInt(property.id) === parseInt(this.props.properties[0]); });
      var property2Index = propertyData.findIndex((property) => { return parseInt(property.id) === parseInt(this.props.properties[1]); });

      var property1 = propertyData[property1Index];
      var property2 = propertyData[property2Index];
      var trait = traitData.find((trait) => { return parseInt(trait.id) === parseInt(this.props.trait); });
      var propertyModifier1 = property1.name.toLowerCase().indexOf('stamina') >= 0 ? '' : '%';
      var propertyModifier2 = property2.name.toLowerCase().indexOf('stamina') >= 0 ? '' : '%';

      var propertyData1 = propertyData.slice();
      var propertyData2 = propertyData.slice();
      propertyData1.splice(property2Index, 1);
      propertyData2.splice(property1Index, 1);

      return (
          <div className="inventory-item-display-container" data-id={item.id}>
              <p className="inventory-item-header">{item.name}</p>
              <div className="inventory-item-summary-container">
                  <p className="item-power-level">300</p>
                  {itemStaminaHtml}
                  <div className="item-properties-container">
                    <li className="item-property-1">{`+ ${parseFloat(property1.max_value).toFixed(1)}${propertyModifier1} ${property1.name}`}</li>
                    <PropertiesSelect propertyData={propertyData1} propertyIndex={propertyIndex1} selected={state.properties[propertyIndex1]}></PropertiesSelect>
                    <li className="item-property-2">{`+ ${parseFloat(property2.max_value).toFixed(1)}${propertyModifier2} ${property2.name}`}</li>
                    <PropertiesSelect propertyData={propertyData2} propertyIndex={propertyIndex2} selected={state.properties[propertyIndex2]}></PropertiesSelect>
                  </div>
                  <div className="item-trait-container">
                    <div className={`item-trait-icon trait-icon trait-${trait.name.toLowerCase().replace(/'/g,'').replace(/ /g, '-')} border-04`}></div>
                    <p className="item-trait-name">{trait.name}</p>
                    <TraitsSelect data={traitData} index={traitIndex} selected={state.traits[traitIndex]}></TraitsSelect>
                    <p className="item-trait-description">{trait.description}</p>
                  </div>
              </div>
              <p className="inventory-item-footer border-01">{itemDescription.replace(/weapon_keyword_/g, '').replace(/_/g, ' ').split(',').join(', ')}</p>
          </div>
      );
    }      
}

export default InventoryItemDisplay;