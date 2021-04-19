import React, {Component} from 'react';
import './WeaponIcon.css';

class WeaponIcon extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.id,
            type: props.type
        }
    }

  render() {
      return (
        <div class="weapon-icon-container weapon-background" data-id={this.state.id} data-type={this.state.type}>
            <div class="weapon-icon">
                <div class="weapon-icon-border"></div>
            </div>
        </div>
    );
  }

}

export default WeaponIcon;