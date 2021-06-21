import React, {Component} from 'react';
import { DataHelper } from '../../utils/DataHelper';
import { Multiselect } from 'multiselect-react-dropdown';
import { AppContext } from '../../stores/Store';

class UserSelect extends Component {
  static contextType = AppContext;
    constructor(props) {
        super(props);

        this.state = {
          users: []
        }
    }

  async getUsers() {
    if (this.state.users.length === 0) {
      var users = await DataHelper.getUsers();
      this.setState({users: users});
      return users;
    }
    return this.state.users;
  }

  render() {
      let onChangeHandler = this.props.onChangeHandler ? this.props.onChangeHandler : this.selectChangeHandler;

      this.getUsers();

      return (
        <Multiselect showArrow={true} id="userSelect" closeIcon="cancel" options={this.state.users} selectedValues={this.props.selectedValues}
         displayValue="username" placeholder="Author"
         onSelect={onChangeHandler.bind(this)} onRemove={onChangeHandler.bind(this)}
         selectionLimit={2} hidePlaceholder={false}></Multiselect>
    );
  }

  selectChangeHandler(selectedList, item)  {
    const [state, updateState] = this.context;

    var selectedValue = selectedList && selectedList.length > 0 ? selectedList[selectedList.length-1] : '';

    updateState({
        type: "UPDATE_USER", 
        payload: selectedValue
    });
  }

}

export default UserSelect;