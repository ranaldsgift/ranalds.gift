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
        <Multiselect closeIcon="cancel" options={DataHelper.getPotionData()} selectedValues={this.props.selectedValues} 
        displayValue="name" placeholder="Potion" 
        onSelect={onChangeHandler.bind(this)} onRemove={onChangeHandler.bind(this)}
        selectionLimit={1} hidePlaceholder={false}></Multiselect>
    );
  }

  selectChangeHandler(selectedList, item)  {
    const [state, updateState] = this.context;

    var selectedValue = selectedList && selectedList.length > 0 ? selectedList[0] : '';

    updateState({
        type: "UPDATE_POTION", 
        payload: selectedValue
    });
  }

}

export default PotionSelect;