import React, {Component, useEffect, useRef} from 'react';
import './BuildList.css';
import './BuildListItem.css';
import BuildListItem from './BuildListItem';
import 'simplebar/dist/simplebar.min.css';
import BuildsListStore from '../../stores/PagedBuildListStore';
import { db } from '../../utils/Firebase';
import { AppContext } from '../../stores/Store';
import { DataHelper } from '../../utils/DataHelper';
import MissionSelect from '../select/MissionSelect';
import DifficultySelect from '../select/DifficultySelect';
import RoleSelect from '../select/RoleSelect';
import PotionSelect from '../select/PotionSelect';
import HeroSelect from '../heroSelect/HeroSelect';

// accept a userid, if no id provided get all builds with page limits
// if an id is passed, get the builds for this user only

class BuildsList extends Component {
  constructor(props) {
    super(props);


    this.state = {
      builds: [],
      buildsCount: 0,
      firstBuildDoc: {},
      lastBuildDoc: {},
      currentPage: 1,
      isLastPage: true,
      userId: 0,
      username: '',
      careerId: 0,
      careers: [],
      difficulties: [],
      missions: [],
      potions: [],
      roles: [],
      isDataLoaded: false,
      isLoadingData: false,
      filters: [],
      pageItemLimit: 8,
      hideFilters: false,
      hidePages: false
    };
  }

  render() {
    //get filters from props

    if (!this.state.isDataLoaded) {
      this.loadBuildList();
    }

    return (this.renderList());
  }

  renderHeroSelect() {
    if (this.state.hideFilters) {
      return null;
    }

    return (
      <HeroSelect careerId={this.state.careerId} onSelect={this.updateHeroSelect.bind(this)}></HeroSelect>
    );
  }

  renderPageControls() {
    if (this.state.hidePages) {
      return null;
    }

    if (this.state.currentPage === 1 && this.state.isLastPage) {      
      return null;
    }

    if (this.state.currentPage === 1) {
      return (
      <div className="page-controls">
        <button className="build-list-page-button tab-button disabled">Previous</button>
        <button className="build-list-page-button tab-button" onClick={this.clickNextPage.bind(this)}>Next</button>
      </div>
      );
    }

    if (this.state.isLastPage) {
      return (
      <div className="page-controls">
        <button className="build-list-page-button tab-button" onClick={this.clickPreviousPage.bind(this)}>Previous</button>
        <button className="build-list-page-button tab-button disabled">Next</button>
      </div>
      );
    }

    return (
    <div className="page-controls">
      <button className="build-list-page-button tab-button" onClick={this.clickPreviousPage.bind(this)}>Previous</button>
      <button className="build-list-page-button tab-button" onClick={this.clickNextPage.bind(this)}>Next</button>
    </div>
    );
  }

  renderList() {
    var buildListClassName = 'build-list-container';

    if (!this.state.hidePages && !this.state.hideFilters) {
      buildListClassName = 'paged-build-list filtered-build-list build-list-container';
    }
    else if (!this.state.hidePages) {
      buildListClassName = 'filtered-build-list build-list-container';
    }
    else if (!this.state.hideFilters) {      
      buildListClassName = 'paged-build-list build-list-container';
    }

    return (      
      <div className={buildListClassName}>
        {this.renderHeroSelect()}
        {this.renderFilters(this.state.filters)}
        {this.renderPageControls()}
        <div data-page-number={1} data-last-page={false} className="build-list border-01 background-20">
          <span className="build-list-header header-underline">Builds</span>
          {this.renderBuilds(this.state.builds)}
        </div>
      </div>
    );
  }

  loadBuildList() {
    this.state.isLoadingData = true;
  

    let buildsQuery = this.getOrderedBuildsQuery();

    buildsQuery.limit(this.state.pageItemLimit + 1).get().then((querySnapshot) => {
      let buildList = [];
      let isLastPage = false;

      if (querySnapshot.docs.length < (this.state.pageItemLimit + 1)) {
        isLastPage = true;
      }
      else {        
        buildList.pop(); // remove extra item from the list, it's only to check for last page
      }

      querySnapshot.forEach((build) => {
        buildList.push({ id: build.id, data: build.data()});
      });
      
      this.setState({builds: buildList, 
                    firstBuildDoc: querySnapshot.docs[0],
                    lastBuildDoc: isLastPage ? querySnapshot.docs[querySnapshot.docs.length-1] : querySnapshot.docs[querySnapshot.docs.length-2], 
                    currentPage: 1,
                    isLastPage: isLastPage,
                    buildsCount: querySnapshot.docs.length,
                    isDataLoaded: true, 
                    isLoadingData: false
                  });
    });
  }

  getOrderedBuildsQuery() {
    return this.getBuildsQuery().orderBy('dateModified', 'desc');
  }

  getPageCount() {
    return Math.round(this.state.buildsCount / this.state.pageItemLimit) + 1;
  }

  clickNextPage() {
    if (this.state.isLastPage) {
      return;
    }

    let buildsQuery = this.getOrderedBuildsQuery();

    buildsQuery.startAfter(this.state.lastBuildDoc).limit(this.state.pageItemLimit + 1).get().then((querySnapshot) => {
      var builds = [];
      querySnapshot.forEach((build) => {
        builds.push({ id: build.id, data: build.data()});
      });

      let isLastPage = false;

      console.log(querySnapshot.docs.length < (this.state.pageItemLimit + 1));

      if (querySnapshot.docs.length < (this.state.pageItemLimit + 1)) {
        isLastPage = true;
      }
      else {        
        builds.pop(); // remove 11th item from the list, it's only to check for last page
      }

      var newPage = this.state.currentPage + 1;

      this.setState({builds: builds, 
                    firstBuildDoc: querySnapshot.docs[0],
                    lastBuildDoc: isLastPage ? querySnapshot.docs[querySnapshot.docs.length-1] : querySnapshot.docs[querySnapshot.docs.length-2], 
                    currentPage: newPage,
                    isLastPage: isLastPage,
                    buildsCount: querySnapshot.docs.length,
                    isDataLoaded: true, 
                    isLoadingData: false
                  });
    });
  }

  clickPreviousPage() {
    if (this.state.currentPage <= 0) {
      return;
    }

    let buildsQuery = this.getOrderedBuildsQuery();

    buildsQuery.endBefore(this.state.firstBuildDoc).limitToLast(this.state.pageItemLimit).get().then((querySnapshot) => {
      var builds = [];
      querySnapshot.forEach((build) => {
        builds.push({ id: build.id, data: build.data()});
      });

      var newPage = this.state.currentPage - 1;      

      this.setState({builds: builds, 
        firstBuildDoc: querySnapshot.docs[0],
        lastBuildDoc: querySnapshot.docs[querySnapshot.docs.length-1], 
        currentPage: newPage,
        isLastPage: false,
        buildsCount: querySnapshot.docs.length,
        isDataLoaded: true, 
        isLoadingData: false
      });
    });
  }

  getBuildsQuery() {
  
    let buildsQuery = db.collection("builds");

    let filters = [];

    if (this.state.careerId > 0) {
      filters.push({ field: 'careerId', comparison: '==', value: this.state.careerId })
    }

    if (this.state.difficulties.length > 0) {
      var difficultyId = this.state.difficulties[0].id;
      filters.push({ field: 'difficulty', comparison: '==', value: difficultyId })
    }

    if (this.state.missions.length > 0) {
      var missionId = this.state.missions[0].id;
      filters.push({ field: 'mission', comparison: '==', value: missionId })
    }

    if (this.state.potions.length > 0) {
      var potionId = this.state.potions[0].id;
      filters.push({ field: 'potion', comparison: '==', value: potionId })
    }

    if (this.state.roles.length > 0) {
      let selectedValues = [];
      this.state.roles.forEach((item) => {
        selectedValues.push(item.id);
      });
      filters.push({ field: 'roles', comparison: 'in', value: selectedValues })
    }

    if (this.props.filters) {
      this.props.filters.forEach((filter) => { filters.push({field: filter.field, comparison: filter.comparison, value: filter.value}) });
    }

    filters.forEach((filter) => {
      buildsQuery = buildsQuery.where(filter.field, filter.comparison, filter.value);
    });

    buildsQuery = buildsQuery.where('isDeleted', '==', false);

    return buildsQuery;
  }

  updateHeroSelect(e) {
    var careerId = parseInt(e.target.dataset.career);
    if (e.target.classList.contains('selected')) {
      this.setState({ careerId: 0, isDataLoaded: false });
    }
    else {
      this.setState({ careerId: careerId, isDataLoaded: false });
    }
  }

  renderFilters(filters) {
    if (this.state.hideFilters) {
      return null;
    }

    return (
        <div className="select-filters-container border-01 left-shadow">
          <DifficultySelect selectedValues={this.state.difficulties} onSelectHandler={this.handleDifficultySelected.bind(this)} onRemoveHandler={''}></DifficultySelect>
          <MissionSelect></MissionSelect>
          <PotionSelect></PotionSelect>
          <RoleSelect></RoleSelect>
        </div>
    );
  }

  handleDifficultySelected(selectedList, selectedItem)  {
    this.setState({ difficulties: selectedList, isDataLoaded: false })
  }

  renderBuilds(builds) {
    if (this.state.isLoadingData) {
      return (<span className="build-list-label">Loading Builds...</span>);
    }
    
    if (!builds || builds.length === 0) {
      return (<span class="build-list-label">No builds in database.</span>);
    }

    var buildsHtml = [];
    builds.forEach((build) => {
      buildsHtml.push(<BuildListItem key={build.id} buildId={build.id} buildData={build.data}></BuildListItem>)
    });
    return buildsHtml;
  }
}

export default BuildsList;