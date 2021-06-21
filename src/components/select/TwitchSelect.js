import React, {Component, PureComponent} from 'react';
import { DataHelper } from '../../utils/DataHelper';
import { Multiselect } from 'multiselect-react-dropdown';
import { AppContext } from '../../stores/Store';

class TwitchSelect extends Component {
  static contextType = AppContext;

  render() {
    let onChangeHandler = this.props.onChangeHandler ? this.props.onChangeHandler : this.selectChangeHandler;

      return (
        <Multiselect showArrow={true} id="twitchSelect" closeIcon="cancel" options={DataHelper.getTwitchData()} selectedValues={this.props.selectedValues}
         displayValue="name" placeholder="Twitch Mode"
         onSelect={onChangeHandler.bind(this)} onRemove={onChangeHandler.bind(this)}
         selectionLimit={2} hidePlaceholder={false}></Multiselect>
    );
  }

  selectChangeHandler(selectedList, item)  {
    const [state, updateState] = this.context;

    var selectedValue = selectedList && selectedList.length > 0 ? selectedList[selectedList.length-1] : null;

    updateState({
        type: "UPDATE_TWITCH", 
        payload: selectedValue
    }); 
  }
}

export default TwitchSelect;