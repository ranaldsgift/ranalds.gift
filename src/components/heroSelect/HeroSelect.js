import React, {Component, useContext} from 'react';
import './HeroSelect.css';
import { AppContext } from '../../stores/Store';
import { DataHelper } from '../../utils/DataHelper';

class HeroSelect extends Component {
  constructor(props) {
    super(props);
    this.renderHeroes = this.renderHeroes.bind(this);
    this.updateHeroSelect = this.updateHeroSelect.bind(this);

    var career = DataHelper.getCareer(props.careerId);

    this.state = {
      heroId: career ? career.heroId : 1,
      hideHeroSelect: false
    }
  }

  static contextType = AppContext;

  render() {
    var heroId = parseInt(this.state.heroId);
    return (
      <div className="hero-select-container" data-hero={heroId} data-collapsed={this.state.hideHeroSelect}>
        <span className="hero-select-header border-01 tab-button" title="Show/Hide Hero Selection" onClick={this.toggleHeroSelect.bind(this)}>
            Hero Selection
        </span>
        <div className="hero-character-icons border-01 background-34 left-shadow">
          <div className="kruber-character-icon character-icon" data-hero={1} data-selected={heroId === 1} onClick={this.updateCharacterSelect.bind(this)}></div>
          <div className="bardin-character-icon character-icon" data-hero={2} data-selected={heroId === 2} onClick={this.updateCharacterSelect.bind(this)}></div>
          <div className="kerillian-character-icon character-icon" data-hero={3} data-selected={heroId === 3} onClick={this.updateCharacterSelect.bind(this)}></div>
          <div className="saltzpyre-character-icon character-icon" data-hero={4} data-selected={heroId === 4} onClick={this.updateCharacterSelect.bind(this)}></div>
          <div className="sienna-character-icon character-icon" data-hero={5} data-selected={heroId === 5} onClick={this.updateCharacterSelect.bind(this)}></div>
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
  }

  renderHeroes() {
    var selectedCareerId = this.props.careerId;
    var selectedCareers = this.props.selectedValues;

    let heroIconList = [];

    var heroesData = DataHelper.getCareers();

    for (var i = 0; i < heroesData.length; i++) {
      
      let careerId = heroesData[i].id;
      let heroId = heroesData[i].heroId;
      let heroClassName = "hero-select-icon hero-icon border-02";
      
      if (parseInt(selectedCareerId) === parseInt(careerId)) {
          heroClassName += " selected";
      }

      if (selectedCareers && selectedCareers.indexOf(parseInt(careerId)) > -1) {
        heroClassName += " selected";
      }

      heroIconList.push(<div data-hero={heroId} data-career={careerId} onClick={this.updateHeroSelect.bind(this)}
        key={careerId} className={heroClassName}></div>);

      if (careerId === 12 || careerId === 15) {
        careerId = careerId === 12 ? 19 : 20;
        heroClassName = "hero-select-icon hero-icon border-02";
        heroIconList.push(<div data-hero={heroId} data-career={careerId} onClick={this.updateHeroSelect.bind(this)}
          key={careerId} className={heroClassName}></div>);
      }
    }
    return heroIconList;
  }

  updateHeroSelect(e) {
    const [state, updateState] = this.context;
    if (this.hasParentWithMatchingSelector(e.target, '.build-list-container') && e.target.classList.contains('selected')) { 
      updateState({type: "UPDATE_CAREER", payload: 0});
    }
    else {
      updateState({type: "UPDATE_CAREER", payload: parseInt(e.target.dataset.career)});
    }
  }
  
  hasParentWithMatchingSelector (target, selector) {
    return [...document.querySelectorAll(selector)].some(el =>
      el !== target && el.contains(target)
    )
  }
}

export default HeroSelect;
