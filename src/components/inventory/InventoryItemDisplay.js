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

      switch (this.props.type) {
        case 'melee':
          if (parseInt(state.careerId) === 6 && this.props.item.name.indexOf('Throwing Axes') >= 0) {
            return this.renderItemDisplay(this.props.item, propertiesData.range, traitsData.range, 0, 1, 0);
          }
          return this.renderItemDisplay(this.props.item, propertiesData.melee, traitsData.melee, 0, 1, 0);
        case 'range':
          if (parseInt(state.careerId) === 6 && this.props.item.name.indexOf('Throwing Axes') < 0 || parseInt(state.careerId) === 16) {
            return this.renderItemDisplay(this.props.item, propertiesData.melee, traitsData.melee, 2, 3, 1);
          }
          return this.renderItemDisplay(this.props.item, propertiesData.range, traitsData.range, 2, 3, 1);
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

      var property1 = propertyData.find((property) => { return parseInt(property.id) === parseInt(this.props.properties[0]); });
      var property2 = propertyData.find((property) => { return parseInt(property.id) === parseInt(this.props.properties[1]); });
      var trait = traitData.find((trait) => { return parseInt(trait.id) === parseInt(this.props.trait); });
      var propertyModifier1 = property1.name.toLowerCase().indexOf('stamina') >= 0 ? '' : '%';
      var propertyModifier2 = property2.name.toLowerCase().indexOf('stamina') >= 0 ? '' : '%';

      return (
          <div className="inventory-item-display-container">
              <p className="inventory-item-header">{item.name}</p>
              <div className="inventory-item-summary-container">
                  <p className="item-power-level">300</p>
                  {itemStaminaHtml}
                  <div className="item-properties-container">
                    <li className="item-property-1">{`+ ${parseFloat(property1.max_value).toFixed(1)}${propertyModifier1} ${property1.name}`}</li>
                    <PropertiesSelect propertyData={propertyData} propertyIndex={propertyIndex1} selected={state.properties[propertyIndex1]}></PropertiesSelect>
                    <li className="item-property-2">{`+ ${parseFloat(property2.max_value).toFixed(1)}${propertyModifier2} ${property2.name}`}</li>
                    <PropertiesSelect propertyData={propertyData} propertyIndex={propertyIndex2} selected={state.properties[propertyIndex2]}></PropertiesSelect>
                  </div>
                  <div className="item-trait-container">
                    <div className={`item-trait-icon trait-icon trait-${trait.name.toLowerCase().replace(/'/g,'').replace(/ /g, '-')} border-04`}></div>
                    <p className="item-trait-name">{trait.name}</p>
                    <TraitsSelect data={traitData} index={traitIndex} selected={state.properties[propertyIndex2]}></TraitsSelect>
                    <p className="item-trait-description">{trait.description}</p>
                  </div>
              </div>
              <p className="inventory-item-footer">{itemDescription.replace(/weapon_keyword_/g, '').replace(/_/g, ' ').split(',').join(', ')}</p>
          </div>
      );
    }      
}

export default InventoryItemDisplay;