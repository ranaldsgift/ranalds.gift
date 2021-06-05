import React, {Component} from 'react';
import './TraitIcon.css';
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
      var traitData = DataHelper.getTraitFromCategory(this.state.type, this.state.id);

      if (traitData) {
          traitName = traitData.name.toLowerCase().replace(' ', '-');
      }

      return (
        <div className={`trait-icon trait-${traitName} border-04`}>
            <div className="tooltip border-35">
                <span className="name header-underline">{traitData.name}</span>
                <span className="description">{traitData.description}</span>
            </div>
        </div>
    );
  }

}

export default TraitIcon;