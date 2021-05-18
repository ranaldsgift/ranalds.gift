import React, {Component} from 'react';
import './BuildListPage.css';
import HeroSelect from '../heroSelect/HeroSelect'
import BuildList from '../buildList/BuildList'
import BuildListFilters from '../buildList/BuildListFilters'
import { AppContext } from '../../stores/Store';
import { db } from '../../utils/Firebase';
import BuildsList from './BuildsList';

class BuildListPage extends Component {
    static contextType = AppContext;

  render() {
    const [state, updateState] = this.context;

    //alert('rendering build list page for career' + state.careerId);

    var root = document.getElementById('root');
    root.dataset.pageName = 'buildsPage';

    let buildsQuery = db.collection('builds');

    if (!state.isInitialized) {
      buildsQuery.orderBy('dateModified').limit(10).get().then((querySnapshot) => {
        var builds = [];
        querySnapshot.forEach((build) => {
          builds.push({ id: build.id, data: build.data()});
        });
  
        updateState({
          type: "UPDATE_BUILDS_DATA", 
          payload: {
            builds: builds,
            lastDoc: querySnapshot.docs[querySnapshot.docs.length-1],
            currentPage: 1,
            pageCount: Math.round(querySnapshot.size / 10) + 1
          }
        }); 
      });
    }

    return (
        <div className="build-list-page">
            <HeroSelect careerId={state.careerId} updateStateType="UPDATE_CAREER"></HeroSelect>
            <div className="build-list-container border-01 background-12">
            <BuildListFilters></BuildListFilters>
            <BuildsList careerId={state.careerId}></BuildsList>
            {/* <BuildList name="Builds" builds={state.builds} handleNextPage={''} handlePreviousPage={''} handleFilterChange={''}></BuildList> */}
            </div>
        </div>
    );
  }
}

export default BuildListPage;