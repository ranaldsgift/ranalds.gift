import React, {Component} from 'react';
import './WeaponIcon.css';

class WeaponIcon extends Component {
    constructor(props) {
        super(props);
    }

  render() {
    var weaponIconClass = this.props.selected ? 'weapon-icon selected' : 'weapon-icon';
      return (
        <div key={this.props.id} className="weapon-icon-container weapon-background" data-id={this.props.id} data-slot={this.props.slot} onClick={this.props.handleClick}>
            <div className={weaponIconClass}>
                <div className="weapon-border"></div>
            </div>
        </div>
    );
  }

}

export default WeaponIcon;