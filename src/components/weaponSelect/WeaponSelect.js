import React, {Component} from 'react';
import './WeaponSelect.css';

class WeaponSelect extends Component {
  constructor(props) {
    super(props);
    this.weaponSelectChanged.bind(this.weaponSelectChanged);
  }
  render() {
    return (
        <div className={this.props.type + "-container inventory-item-container border-01"}>
        <p className={this.props.type + "-header"} style={{textTransform: 'uppercase'}}>{this.props.type}</p>
        <div className={this.props.type + "-divider divider-06"}></div>
        {this.renderWeapons()}
    </div>
    );
  }

  renderWeapon() {
    return (
      <div className="weapon-background">
        <div className="sienna-sword">
          <div className="weapon-icon" onClick={this.itemSelectChanged}></div>
        </div>
      </div>
    );
  }

  renderWeapons() {
    if (this.props.type === 'melee') {
        return (
            <div className="weapon-container">
              {this.renderWeapon()}
                <div className="weapon-background"><div className="sienna-sword"><div className="weapon-icon" onClick={this.weaponSelectChanged}></div></div></div>
                <div className="weapon-background"><div className="sienna-firesword"><div className="weapon-icon"></div></div></div>
                <div className="weapon-background"><div className="sienna-dagger"><div className="weapon-icon"></div></div></div>
                <div className="weapon-background"><div className="sienna-mace"><div className="weapon-icon"></div></div></div>
                <div className="weapon-background"><div className="sienna-crowbill"><div className="weapon-icon"></div></div></div>
                <div className="weapon-background"><div className="sienna-flail"><div className="weapon-icon selected"></div></div></div>
            </div>            
        );
    } else {
        return (            
        <div className="weapon-container">
            <div className="weapon-background"><div className="sienna-fireball"><div className="weapon-icon"></div></div></div>
            <div className="weapon-background"><div className="sienna-conflag selected"><div className="weapon-icon"></div></div></div>
            <div className="weapon-background"><div className="sienna-beam"><div className="weapon-icon"></div></div></div>
            <div className="weapon-background"><div className="sienna-mace"><div className="weapon-icon"></div></div></div>
            <div className="weapon-background"><div className="sienna-bolt"><div className="weapon-icon"></div></div></div>
            <div className="weapon-background"><div className="sienna-flamestorm"><div className="weapon-icon selected"></div></div></div>
        </div>
        );
    }
  }

  weaponSelectChanged(e) {
    
  }

  meleeSelectChanged(e) {
    const [state, updateState] = this.context;
    updateState({type: "UPDATE_MELEE", payload: { tier: parseInt(e.currentTarget.dataset.tier), talent: parseInt(e.currentTarget.dataset.talent)}})
  }

  rangeSelectChanged(e) {
    const [state, updateState] = this.context;
    updateState({type: "UPDATE_RANGE", payload: { tier: parseInt(e.currentTarget.dataset.tier), talent: parseInt(e.currentTarget.dataset.talent)}})
  }

  handleItemClick(e) {

    e.currentTarget.classList.add('selected');
  }
}

export default WeaponSelect;