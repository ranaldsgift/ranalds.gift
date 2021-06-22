import React, {Component} from 'react';
import './BuildListPage.css';
import { AppContext } from '../../stores/Store';
import BuildsList from './BuildsList';

class BuildListPage extends Component {
    static contextType = AppContext;

  render() {
    const [state] = this.context;

    document.title = "Latest Builds - Vermintide 2 Builds - Vermintide 2 | ranalds.gift";

    return (
        <div className="build-list-page top-left-shadow">
          <BuildsList name="Latest Builds"
                      sortBy={state.sortBy} 
                      careerId={state.careerId}
                      user={state.user}
                      difficulty={state.difficulty}
                      twitchMode={state.twitchMode}
                      mission={state.mission}
                      potion={state.potion}
                      book={state.book}
                      roles={state.roles}
                      collapseFilters={state.collapseFilters}>            
          </BuildsList>
        </div>
    );
  }
}

export default BuildListPage;