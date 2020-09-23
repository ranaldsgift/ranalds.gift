import React, {Component} from 'react';
import './HeroSelect.css';
import { AppContext } from '../../stores/Store';
import {heroesData} from '../../data/Heroes'

class HeroSelect extends Component {
  constructor(props) {
    super(props);
    this.renderHeroes = this.renderHeroes.bind(this);
    this.updateHeroSelect = this.updateHeroSelect.bind(this);
  }

  static contextType = AppContext;

  render() {
    return (
      <div className="hero-select-container background-12">
        <div className="hero-select-header border-01">
          <div className="hero-select-header-background">
            <p>Hero Selection</p>
          </div>
        </div>
        <div className="hero-icon-container background-12 border-01">
        {this.renderHeroes()}
        </div>
      </div>
    );
  }

  renderHeroes() {
    var selectedCareerId = this.props.careerId;

    let heroIconList = [];

    for (var i = 0; i < heroesData.length; i++) {
      let careerId = heroesData[i].id;
      let heroClassName = "border-02 hero-icon-0" + careerId;
      let keyValue = "hero-icon-0" + careerId;
      if (careerId>9){
          heroClassName = "border-02 hero-icon-" + careerId;
          keyValue = "hero-icon-" + careerId;
      }
      
      if (parseInt(selectedCareerId) === parseInt(careerId)) {
          heroClassName += " selected";
      }
      
      heroIconList.push(<div data-career={careerId} onClick={this.updateHeroSelect}
                           key={keyValue} className={heroClassName}></div>);
    }
    return heroIconList;
  }

  updateHeroSelect(e) {
    const [state, updateState] = this.context;
    updateState({type: "UPDATE_CAREER", payload: e.target.dataset.career})
  }
}

export default HeroSelect;
