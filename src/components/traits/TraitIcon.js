import React, {Component} from 'react';
import './TraitIcon.css';
import { DataHelper } from '../../utils/DataHelper';

class TraitIcon extends Component {
    
  render() {
      var traitName = '';
      var traitData = DataHelper.getTraitFromCategory(this.props.type, this.props.id);
    
      if (traitData) {
          traitName = traitData.name.toLowerCase().replace(' ', '-');
      }

      return (
        <div className={`trait-icon trait-${traitName} border-04`} data-type={this.props.type} data-id={this.props.id}>
            <div className="tooltip border-35">
                <span className="name header-underline">{traitData.name}</span>
                <span className="description">{traitData.description}</span>
            </div>
        </div>
    );
  }

}

export default TraitIcon;