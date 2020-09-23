import React, {Component} from 'react';
import './BuildListPage.css';
import HeroSelect from '../heroSelect/HeroSelect'
import BuildList from '../buildList/BuildList'
import BuildListFilters from '../buildList/BuildListFilters'
import { AppContext } from '../../stores/Store';

class BuildListPage extends Component {
    static contextType = AppContext;

  render() {
    const [state] = this.context;

    return (
        <div className="build-list-page">
            <HeroSelect careerId={state.careerId} updateStateType="UPDATE_CAREER"></HeroSelect>
            <div className="build-list-container border-01 background-12">
            <BuildListFilters></BuildListFilters>
            <BuildList></BuildList>
            </div>
        </div>
    );
  }
}

export default BuildListPage;