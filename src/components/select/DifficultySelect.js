import React, {Component, PureComponent} from 'react';
import { DataHelper } from '../../utils/DataHelper';
import { Multiselect } from 'multiselect-react-dropdown';
import { AppContext } from '../../stores/Store';

class DifficultySelect extends Component {
  static contextType = AppContext;

  render() {
    let onChangeHandler = this.props.onChangeHandler ? this.props.onChangeHandler : this.selectChangeHandler;

      return (
        <Multiselect showArrow={true} id="difficultySelect" closeIcon="cancel" options={DataHelper.getDifficultyData()} selectedValues={this.props.selectedValues}
         displayValue="name" placeholder="Difficulty"
         onSelect={onChangeHandler.bind(this)} onRemove={onChangeHandler.bind(this)}
         selectionLimit={2} hidePlaceholder={false}></Multiselect>
    );
  }

  selectChangeHandler(selectedList, item)  {
    const [state, updateState] = this.context;

    var selectedValue = selectedList && selectedList.length > 0 ? selectedList[selectedList.length-1] : null;

    updateState({
        type: "UPDATE_DIFFICULTY", 
        payload: selectedValue
    }); 
  }
}

export default DifficultySelect;