import React, {Component} from 'react';
import { DataHelper } from '../../utils/DataHelper';
import { Multiselect } from 'multiselect-react-dropdown';
import { AppContext } from '../../stores/Store';

class RoleSelect extends Component {
  static contextType = AppContext;

  render() {
    let onChangeHandler = this.props.onChangeHandler ? this.props.onChangeHandler : this.selectChangeHandler;

      return (
        <Multiselect showArrow={true} closeOnSelect={false} showCheckbox={true} id="roleSelect" closeIcon="cancel" options={DataHelper.getRoleData()} selectedValues={this.props.selectedValues}
        displayValue="name" placeholder="Roles" selectionLimit={10}
        onSelect={onChangeHandler.bind(this)} onRemove={onChangeHandler.bind(this)}></Multiselect>
    );
  }

  selectChangeHandler(selectedList, item)  {
    const [state, updateState] = this.context;

    updateState({
        type: "UPDATE_ROLES", 
        payload: selectedList
    });
  }

}

export default RoleSelect;