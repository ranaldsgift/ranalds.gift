import React, {Component} from 'react';
import { DataHelper } from '../../utils/DataHelper';
import { Multiselect } from 'multiselect-react-dropdown';
import { AppContext } from '../../stores/Store';

class DifficultySelect extends Component {
  static contextType = AppContext;

    constructor(props) {
        super(props);
    }

  render() {
      let onChangeHandler = this.props.onChangeHandler ? this.props.onChangeHandler : this.selectChangeHandler;

      console.log('difficulty selectTTTTT');
      console.log(this.props.selectedValues);

      return (
        <Multiselect closeIcon="cancel" options={DataHelper.getDifficultyData()} selectedValues={this.props.selectedValues}
         displayValue="name" placeholder="Difficulty"
         onSelect={onChangeHandler.bind(this)} onRemove={onChangeHandler.bind(this)}
         selectionLimit={1} hidePlaceholder={false}></Multiselect>
    );
  }

  selectChangeHandler(selectedList, item)  {
    const [state, updateState] = this.context;

    var selectedValue = selectedList && selectedList.length > 0 ? selectedList[0] : '';

    updateState({
        type: "UPDATE_DIFFICULTY", 
        payload: selectedValue
    });
  }
}

export default DifficultySelect;