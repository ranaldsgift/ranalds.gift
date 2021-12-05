import React, {Component} from 'react';
import './BuildListPage.css';
import { AppContext } from '../../stores/Store';
import BuildsList from './BuildsList';
import { DataHelper } from '../../utils/DataHelper';

class BuildListPage extends Component {
    static contextType = AppContext;

  render() {
    // TODO - Get params from URL to initiatilze the list. Update the URL params when selecting filters.
    const [state] = this.context;

    document.title = "Latest Builds - Vermintide 2 Builds - Vermintide 2 | ranalds.gift";

    return (
        <div className="build-list-page top-left-shadow">
          <BuildsList match={this.props.match} name="Latest Builds"
                      sortBy={state.sortBy} 
                      careerId={state.careerId}
                      user={state.user}
                      difficulty={state.difficulty}
                      twitchMode={state.twitchMode}
                      mission={state.mission}
                      potion={state.potion}
                      book={state.book}
                      roles={state.roles}
                      collapseFilters={state.collapseFilters}
                      builds={state.builds}
                      firstBuildDoc={state.firstBuildDoc}
                      lastBuildDoc={state.lastBuildDoc}
                      currentPage={state.currentPage}
                      isLastPage={state.isLastPage}
                      isLoadingData={state.isLoadingData}
                      isDataLoaded={state.isDataLoaded}
                      updateCommand={'UPDATE_BUILDS_DATA'}>
          </BuildsList>
        </div>
    );
  }
}

export default BuildListPage;