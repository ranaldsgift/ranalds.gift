import React, {Component, useEffect, useRef} from 'react';
import './BuildList.css';
import './BuildListItem.css';
import BuildListItem from './BuildListItem';
import 'simplebar/dist/simplebar.min.css';
import BuildsListStore from '../../stores/PagedBuildListStore';
import { db } from '../../utils/Firebase';
import { AppContext } from '../../stores/Store';

// accept a userid, if no id provided get all builds with page limits
// if an id is passed, get the builds for this user only

class BuildList extends Component {
  constructor(props) {
    super(props);


/*     this.state = {
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
  
        var builds = [];
        querySnapshot.forEach((build) => {
          buildList.push({ id: build.id, data: build.data()});
        });
  
        this.setState({builds: buildList, isDataLoaded: true})
      });
    } */
    /* 
     if (!this.state.isDataLoaded) {
    this.setState({isDataLoaded: true})
     } */

    return (
          <div data-page-number={1} data-last-page={false} className="build-list border-01 background-20">
            <span className="build-list-header header-underline">{this.props.name}</span>
            {/* <button className="build-list-page-button" onClick={this.props.handleNextPage}>Next Page</button> */}
            {this.renderBuilds(this.props.builds)}
          </div>
    );
  }

  renderBuilds(builds) {
    console.log('list of builds to render');
    console.log(builds);
    if (!builds || builds.length === 0) {
      return <p>No {this.props.name} in database.</p>;
    }
    var buildsHtml = [];
    builds.forEach((build) => {
      buildsHtml.push(<BuildListItem key={build.id} buildId={build.id} buildData={build.data}></BuildListItem>)
    });
    return buildsHtml;
  }
}

export default BuildList;