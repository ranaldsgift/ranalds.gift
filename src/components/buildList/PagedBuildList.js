import React, {Component} from 'react';
import './BuildList.css';
import './BuildListItem.css';
import BuildListItem from './BuildListItem';
import 'simplebar/dist/simplebar.min.css';
import BuildsListStore from '../../stores/PagedBuildListStore';
import { db } from '../../utils/Firebase';
import { AppContext } from '../../stores/Store';
import BuildList from './BuildList';
import BuildListContainer from './BuildListContainer';
import PagedBuildListStore from '../../stores/PagedBuildListStore';

// accept a userid, if no id provided get all builds with page limits
// if an id is passed, get the builds for this user only

class PagedBuildList extends Component {
  constructor(props) {
    super(props);

/* 
    this.state = {
      builds: [],
      isDataLoaded: false
    }; */
  }


  //current page index and total pages from props

  //specify the type of build list... or make specific types of build lists...
  //filters based on properties: userid, careerid, patch

  //static contextType = AppContext;

  render() {
    //const [state, updateState] = this.context;


/*     if (!this.state.isDataLoaded) {
      let buildList = [];
  
      let buildsQuery = db.collection("builds");
  
      var filters = [{ field: 'userId', comparison: '==', value: 'il853JiLs8VoxVPRU97p0kxp8Ks2' }];
  
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
  
        this.setState({builds: buildList, isDataLoaded: true})
      });
    } */

    return (
      <PagedBuildListStore>
        <BuildListContainer></BuildListContainer>
      </PagedBuildListStore>
    );
  }
}

export default PagedBuildList;