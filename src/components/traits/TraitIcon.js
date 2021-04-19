import React, {Component} from 'react';
import { DataHelper } from '../../utils/DataHelper';

class TraitIcon extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.id,
            type: props.type
        }
    }

  render() {
      var traitName = '';
      var traitData = DataHelper.getTraitData(this.state.id, this.state.type);

      if (traitData) {
          console.log(traitData);
          traitName = traitData.name.toLowerCase().replace(' ', '-');
      }

      return (
        <div className={`trait-icon trait-${traitName} border-10`}></div>
    );
  }

}

export default TraitIcon;