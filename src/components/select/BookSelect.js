import React, {Component} from 'react';
import { DataHelper } from '../../utils/DataHelper';
import { Multiselect } from 'multiselect-react-dropdown';
import { AppContext } from '../../stores/Store';

class BookSelect extends Component {
  static contextType = AppContext;

  render() {
    let onChangeHandler = this.props.onChangeHandler ? this.props.onChangeHandler : this.selectChangeHandler;

      return (
        <Multiselect showArrow={true} id="bookSelect" closeIcon="cancel" options={DataHelper.getBookData()} selectedValues={this.props.selectedValues} 
        displayValue="name" placeholder="Books" 
        onSelect={onChangeHandler.bind(this)} onRemove={onChangeHandler.bind(this)}
        selectionLimit={2} hidePlaceholder={false}></Multiselect>
    );
  }

  selectChangeHandler(selectedList, item)  {
    const [state, updateState] = this.context;

    var selectedValue = selectedList && selectedList.length > 0 ? selectedList[selectedList.length-1] : '';

    updateState({
        type: "UPDATE_BOOKS", 
        payload: selectedValue
    });
  }

}

export default BookSelect;