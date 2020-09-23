import React, {Component} from 'react';
import { AppContext } from '../../stores/Store';

class PropertiesSelect extends Component {
    static contextType = AppContext;
  
    render() {
        var properties = this.props.propertyData;
        var propertyOptions = [];

        properties.forEach((property) => {
            propertyOptions.push(<option key={property.id} value={property.id}>{property.name}</option>);
        });

      return (
          <select data-property={this.props.propertyIndex} onChange={this.handlePropertySelectChange.bind(this)} defaultValue={this.props.selected-1}>
              {propertyOptions}
          </select>
      );
    }

    handlePropertySelectChange(e) {
        const [state, updateState] = this.context;
        
        updateState({
            type: 'UPDATE_PROPERTY_SELECT',
            payload: {
                id: e.target.value,
                index: e.target.dataset.property
            }
        });
    }
}

export default PropertiesSelect;