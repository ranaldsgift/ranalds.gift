import React, {Component} from 'react';
import './HeroSelect.css';
import { AppContext } from '../../stores/Store';
import {heroesData} from '../../data/Heroes'

class HeroSelect extends Component {
  constructor(props) {
    super(props);
    this.renderHeroes = this.renderHeroes.bind(this);
    this.updateHeroSelect = this.updateHeroSelect.bind(this);

    this.state = {
      heroId: 1,
      hideHeroSelect: false
    }
  }

  static contextType = AppContext;

  render() {
    return (
      <div className="hero-select-container top-left-shadow" data-hero={this.state.heroId} data-collapsed={this.state.hideHeroSelect}>
        <div className="hero-select-header border-01" title="Show/Hide Hero Selection" onClick={this.toggleHeroSelect.bind(this)}>
          <div className="hero-select-header-background">
            <p>Hero Selection</p>
          </div>
        </div>
        <div className="hero-character-icons border-01 background-34 left-shadow">
          <div className="kruber-character-icon character-icon" data-hero={1} data-selected={this.state.heroId == 1} onClick={this.updateCharacterSelect.bind(this)}></div>
          <div className="bardin-character-icon character-icon" data-hero={2} data-selected={this.state.heroId == 2} onClick={this.updateCharacterSelect.bind(this)}></div>
          <div className="kerillian-character-icon character-icon" data-hero={3} data-selected={this.state.heroId == 3} onClick={this.updateCharacterSelect.bind(this)}></div>
          <div className="saltzpyre-character-icon character-icon" data-hero={4} data-selected={this.state.heroId == 4} onClick={this.updateCharacterSelect.bind(this)}></div>
          <div className="sienna-character-icon character-icon" data-hero={5} data-selected={this.state.heroId == 5} onClick={this.updateCharacterSelect.bind(this)}></div>
        </div>
        <div className="hero-icon-wrapper background-12 border-01">
          <div className="hero-icon-container">
          {this.renderHeroes(this.props.heroSelectHandler)}
          </div>
        </div>
      </div>
    );
  }

  updateCharacterSelect(e) {
    this.setState({heroId: e.target.dataset.hero});
  }

  toggleHeroSelect() {
    this.setState({ hideHeroSelect: !this.state.hideHeroSelect });
/*     var heroSelectContainer = document.querySelector('.hero-icon-container');
    if (!heroSelectContainer.style.display || heroSelectContainer.style.display === 'grid') {
      heroSelectContainer.style.display = 'none';
    }
    else {
      heroSelectContainer.style.display = 'grid';
    } */
  }

  renderHeroes() {
    var selectedCareerId = this.props.careerId;
    var selectedCareers = this.props.selectedValues;
    console.log('selected careers ' + selectedCareers);

    let heroIconList = [];

    for (var i = 0; i < heroesData.length; i++) {
      
      let careerId = heroesData[i].id;
      let heroId = heroesData[i].heroId;
      let heroClassName = "hero-select-icon border-02 hero-icon-0" + careerId;
      let keyValue = "hero-icon-0" + careerId;
      if (careerId>9){
          heroClassName = "hero-select-icon border-02 hero-icon-" + careerId;
          keyValue = "hero-icon-" + careerId;
      }
      
      if (parseInt(selectedCareerId) === parseInt(careerId)) {
          heroClassName += " selected";
      }

      if (selectedCareers && selectedCareers.indexOf(parseInt(careerId)) > -1) {
        heroClassName += " selected";
      }

      if (this.props.onSelect) {
        heroIconList.push(<div data-hero={heroId} data-career={careerId} onClick={this.props.onSelect}
          key={keyValue} className={heroClassName}></div>);
      }
      else {      
        heroIconList.push(<div data-hero={heroId} data-career={careerId} onClick={this.updateHeroSelect}
                             key={keyValue} className={heroClassName}></div>);
      }
    }
    return heroIconList;
  }

  updateHeroSelect(e) {
    const [state, updateState] = this.context;
    updateState({type: "UPDATE_CAREER", payload: parseInt(e.target.dataset.career)})
  }
}

export default HeroSelect;
