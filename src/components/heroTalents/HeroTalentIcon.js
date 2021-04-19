import React, {Component} from 'react';
import './HeroTalentIcon.css';

class HeroTalentIcon extends Component {
    constructor(props) {
        super(props);

        this.state = {
            talentNumber: props.talentNumber,
            tier: props.tier,
            careerId: props.careerId
        }
    }

  render() {
      return (<div className='talent-icon' data-talent={this.state.talentNumber} data-tier={this.state.tier} data-career={this.state.careerId}></div>);
  }

}

export default HeroTalentIcon;