import React, {Component} from 'react';
import { AppContext } from '../../stores/Store';

class TraitsSelect extends Component {
    static contextType = AppContext;
  
    render() {
        var traits = this.props.data;
        var traitOptions = [];

        traits.forEach((trait) => {
            traitOptions.push(<option key={trait.id} value={trait.id}>{trait.name}</option>);
        });

      return (
          <select data-trait={this.props.index} onChange={this.handleTraitSelectChange.bind(this)} defaultValue={this.props.selected-1}>
              {traitOptions}
          </select>
      );
    }

    handleTraitSelectChange(e) {
        const [state, updateState] = this.context;
        
        updateState({
            type: "UPDATE_TRAIT_SELECT",
            payload: {
                id: e.target.value,
                index: e.target.dataset.trait
            }
        });
    }
}

export default TraitsSelect;