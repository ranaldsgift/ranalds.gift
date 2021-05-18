import React, {Component} from 'react';
import './BuildList.css';
import './BuildListItem.css';
import BuildListItem from './BuildListItem';
import 'simplebar/dist/simplebar.min.css';
import { db } from '../../utils/Firebase';
import { AppContext } from '../../stores/Store';
import BuildList from './BuildList';
import { PagedBuildListContext } from '../../stores/PagedBuildListStore';

// accept a userid, if no id provided get all builds with page limits
// if an id is passed, get the builds for this user only

class BuildListContainer extends Component {
  constructor(props) {
    super(props);

  }


  //current page index and total pages from props

  //specify the type of build list... or make specific types of build lists...
  //filters based on properties: userid, careerid, patch

  static contextType = PagedBuildListContext;

  render() {
    const [state, updateState] = this.context;


    if (!state.isDataLoaded) {
      let buildList = [];
  
      let buildsQuery = db.collection("builds");
  
      var filters = [{ field: 'userId', comparison: '==', value: 'il853JiLs8VoxVPRU97p0kxp8Ks2' }]; // this.props.filters; //this.props.filters; 
  
      if (this.props.filters) {
        filters = this.props.filters;
      }
  
      filters.forEach((filter) => {
        buildsQuery = buildsQuery.where(filter.field, filter.comparison, filter.value);
      });
  
      buildsQuery.limit(10).get().then((querySnapshot) => {
        querySnapshot.forEach((build) => {
          buildList.push({ id: build.id, data: build.data()});
        });
  
        updateState({
          type: "UPDATE_PAGED_DATA", 
          payload: {
            builds: buildList,
            lastDoc: querySnapshot.docs[querySnapshot.docs.length-1],
            currentPage: 1,
            totalPages: Math.round(querySnapshot.size / 10) + 1
          }
        });
      });
    }

    return (
      <BuildList builds={state.builds}></BuildList>
    );
  }
}

export default BuildListContainer;