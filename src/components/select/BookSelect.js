import React, {Component} from 'react';
import { DataHelper } from '../../utils/DataHelper';
import { Multiselect } from 'multiselect-react-dropdown';
import { AppContext } from '../../stores/Store';

class BookSelect extends Component {
  static contextType = AppContext;

    constructor(props) {
        super(props);
    }

  render() {
    let onChangeHandler = this.props.onChangeHandler ? this.props.onChangeHandler : this.selectChangeHandler;

      return (
        <Multiselect closeIcon="cancel" closeOnSelect={false} options={DataHelper.getBookData()} selectedValues={this.props.selectedValues} 
        displayValue="name" placeholder="Books" hidePlaceholder="true" 
        onSelect={onChangeHandler.bind(this)} onRemove={onChangeHandler.bind(this)}></Multiselect>
    );
  }

  selectChangeHandler(selectedList, item)  {
    const [state, updateState] = this.context;

    updateState({
        type: "UPDATE_BOOKS", 
        payload: selectedList
    });
  }

}

export default BookSelect;