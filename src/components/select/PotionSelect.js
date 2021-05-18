import React, {Component} from 'react';
import { DataHelper } from '../../utils/DataHelper';
import { Multiselect } from 'multiselect-react-dropdown';
import { AppContext } from '../../stores/Store';

class PotionSelect extends Component {
  static contextType = AppContext;
    constructor(props) {
        super(props);
    }

  render() {
    let onChangeHandler = this.props.onChangeHandler ? this.props.onChangeHandler : this.selectChangeHandler;

      return (
        <Multiselect closeIcon="cancel" closeOnSelect={false} options={DataHelper.getPotionData()} selectedValues={this.props.selectedValues} 
        displayValue="name" placeholder="Potion" hidePlaceholder="true" 
        onSelect={onChangeHandler.bind(this)} onRemove={onChangeHandler.bind(this)}></Multiselect>
    );
  }

  selectChangeHandler(selectedList, item)  {
    const [state, updateState] = this.context;

    updateState({
        type: "UPDATE_POTION", 
        payload: selectedList
    });
  }

}

export default PotionSelect;