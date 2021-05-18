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
      careers: [],
      difficulties: [],
      missions: [],
      potions: [],
      roles: [],
      isDataLoaded: false,
      isLoadingData: false,
      filters: [],
      pageItemLimit: 10,
      hideFilters: false,
      hidePages: false
    };
  }

  //current page index and total pages from props

  //specify the type of build list... or make specific types of build lists...
  //filters based on properties: userid, careerid, patch

  //static contextType = AppContext;


  //accept props: 
  //filters
  //current page number
  //last build document

  render() {
    //get filters from props
    //alert('rendering builds list');
    console.log(this.state);

    if (!this.state.isDataLoaded) {

      this.loadBuildList();
    }

    if (this.state.isLoadingData) {
      console.log('builds list data is still loading');

      if (this.state.hidePages && this.state.hideFilters) {
        return (
              <div data-page-number={1} data-last-page={false} className="build-list border-01 background-13">
                <span class="build-list-header header-underline">Builds</span>
                <span class="build-list-label">Loading Builds...</span>
              </div>
        );
      }

      if (this.state.hidePages) {
        return (
        <div className="filtered-build-list build-list-container">
          <HeroSelect selectedValues={this.state.careers} onSelect={this.updateHeroSelect.bind(this)}></HeroSelect>
          {this.renderFilters(this.state.filters)}
          <div data-page-number={1} data-last-page={false} className="build-list border-01 background-13">
            <span class="build-list-header header-underline">Builds</span>
                <span class="build-list-label">Loading Builds...</span>
          </div>
        </div>
        );
      }

      if (this.state.hideFilters) {
        return (
          <div className="build-list-container">
            <div data-page-number={1} data-last-page={false} className="build-list border-01 background-13">
              <span class="build-list-header header-underline">Builds</span>
            </div>
          </div>
        );    
      }
      
      return (
        <div className="filtered-build-list build-list-container">
          <HeroSelect selectedValues={this.state.careers} onSelect={this.updateHeroSelect.bind(this)}></HeroSelect>
          {this.renderFilters(this.state.filters)}
          <div data-page-number={1} data-last-page={false} className="build-list border-01 background-13">
            <span class="build-list-header header-underline">Builds</span>
          </div>
        </div>
        );
    }

    if (this.state.hideFilters && this.state.hidePages) {
      return (
            <div data-page-number={1} data-last-page={false} className="build-list border-01 background-13">
              <span class="build-list-header header-underline">Builds</span>
              {this.renderBuilds(this.state.builds)}
            </div>
      );
    }

    if (this.state.hidePages) {
      return (
          <div className="filtered-build-list build-list-container">
          <HeroSelect selectedValues={this.state.careers} onSelect={this.updateHeroSelect.bind(this)}></HeroSelect>
            {this.renderFilters(this.state.filters)}
            <div data-page-number={1} data-last-page={false} className="build-list border-01 background-13">
              <span class="build-list-header header-underline">Builds</span>
              {this.renderBuilds(this.state.builds)}
            </div>
          </div>
      );   
    }

    if (this.state.hideFilters) {
      if (this.state.currentPage === 1 && this.state.isLastPage) { // less items than page size, don't display page controls
        return (
            <div className="build-list-container">
              <div data-page-number={1} data-last-page={this.state.isLastPage} className="build-list border-01 background-13">
                <span class="build-list-header header-underline">Builds</span>
                {this.renderBuilds(this.state.builds)}
              </div>
            </div>
        );      
      }
  
      if (this.state.isLastPage) {
        return (
            <div className="paged-build-list build-list-container">
              <div className="page-controls">
                <button className="build-list-page-button tab-button" onClick={this.clickPreviousPage.bind(this)}>Previous</button>
                <button className="build-list-page-button tab-button disabled">Next</button>
              </div>
              <div data-page-number={1} data-last-page={this.state.isLastPage} className="build-list border-01 background-13">
                <span class="build-list-header header-underline">Builds</span>
                {this.renderBuilds(this.state.builds)}
              </div>
            </div>
        );      
      }
  
      if (this.state.currentPage === 1) {
        return (
          <div className="paged-build-list build-list-container">
            <div className="page-controls">
              <button className="build-list-page-button tab-button disabled">Previous</button>
              <button className="build-list-page-button tab-button" onClick={this.clickNextPage.bind(this)}>Next</button>
            </div>
            <div data-page-number={1} data-last-page={false} className="build-list border-01 background-13">
              <span class="build-list-header header-underline">Builds</span>
              {this.renderBuilds(this.state.builds)}
            </div>
          </div>
        );      
      } 

      return (
        <div className="paged-build-list build-list-container">
          <div className="page-controls">
            <button className="build-list-page-button tab-button" onClick={this.clickPreviousPage.bind(this)}>Previous</button>
            <button className="build-list-page-button tab-button" onClick={this.clickNextPage.bind(this)}>Next</button>
          </div>
          <div data-page-number={1} data-last-page={false} className="build-list border-01 background-13">
            <span class="build-list-header header-underline">Builds</span>
            {this.renderBuilds(this.state.builds)}
          </div>
        </div>
      );    
    }


    //Show both filters and page controls

    if (this.state.currentPage === 1 && this.state.isLastPage) {
      return (
          <div className="filtered-build-list build-list-container">
          <HeroSelect selectedValues={this.state.careers} onSelect={this.updateHeroSelect.bind(this)}></HeroSelect>
            {this.renderFilters(this.state.filters)}
            <div data-page-number={1} data-last-page={false} className="build-list border-01 background-13">
              <span class="build-list-header header-underline">Builds</span>
              {this.renderBuilds(this.state.builds)}
            </div>
          </div>
      );      
    }

    if (this.state.isLastPage) {
      return (
          <div className="paged-build-list filtered-build-list build-list-container">
          <HeroSelect selectedValues={this.state.careers} onSelect={this.updateHeroSelect.bind(this)}></HeroSelect>
            {this.renderFilters(this.state.filters)}
            <div className="page-controls">
              <button className="build-list-page-button tab-button" onClick={this.clickPreviousPage.bind(this)}>Previous</button>
              <button className="build-list-page-button tab-button disabled">Next</button>
            </div>
            <div data-page-number={1} data-last-page={false} className="build-list border-01 background-13">
              <span class="build-list-header header-underline">Builds</span>
              {this.renderBuilds(this.state.builds)}
            </div>
          </div>
      );      
    }

    if (this.state.currentPage === 1) {
      return (
          <div className="paged-build-list filtered-build-list build-list-container">
            <HeroSelect selectedValues={this.state.careers} onSelect={this.updateHeroSelect.bind(this)}></HeroSelect>
            {this.renderFilters(this.state.filters)}
            <div className="page-controls">
              <button className="build-list-page-button tab-button disabled">Previous</button>
              <button className="build-list-page-button tab-button" onClick={this.clickNextPage.bind(this)}>Next</button>
            </div>
            <div data-page-number={1} data-last-page={false} className="build-list border-01 background-13">
              <span class="build-list-header header-underline">Builds</span>
              {this.renderBuilds(this.state.builds)}
            </div>
          </div>
      );      
    }

    return (
        <div className="paged-build-list filtered-build-list build-list-container">
        <HeroSelect selectedValues={this.state.careers} onSelect={this.updateHeroSelect.bind(this)}></HeroSelect>
          {this.renderFilters(this.state.filters)}
          <div className="page-controls">
            <button className="build-list-page-button tab-button" onClick={this.clickPreviousPage.bind(this)}>Previous</button>
            <button className="build-list-page-button tab-button" onClick={this.clickNextPage.bind(this)}>Next</button>
          </div>
          <div data-page-number={1} data-last-page={false} className="build-list border-01 background-13">
            <span class="build-list-header header-underline">Builds</span>
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
        buildList.pop(); // remove 11th item from the list, it's only to check for last page
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

    if (this.state.careers.length > 0) {
      filters.push({ field: 'careerId', comparison: 'in', value: this.state.careers })
    }

    if (this.state.difficulties.length > 0) {
      let selectedDifficulties = [];
      this.state.difficulties.forEach((item) => {
        selectedDifficulties.push(item.id);
      });
      filters.push({ field: 'difficulty', comparison: 'in', value: selectedDifficulties })
    }

    if (this.state.missions.length > 0) {
      let selectedValues = [];
      this.state.missions.forEach((item) => {
        selectedValues.push(item.id);
      });
      filters.push({ field: 'mission', comparison: 'in', value: selectedValues })
    }

    if (this.state.potions.length > 0) {
      let selectedValues = [];
      this.state.potions.forEach((item) => {
        selectedValues.push(item.id);
      });
      filters.push({ field: 'potion', comparison: 'array-contains-any', value: selectedValues })
    }

    if (this.state.roles.length > 0) {
      let selectedValues = [];
      this.state.roles.forEach((item) => {
        selectedValues.push(item.id);
      });
      filters.push({ field: 'roles', comparison: 'array-contains-any', value: selectedValues })
    }

    if (this.props.filters) {
      filters = this.props.filters;
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
      var careers = this.state.careers;
      const index = careers.indexOf(careerId);
      if (index > -1) {
        careers.splice(index, 1);
      }
      this.setState({ careers: careers, isDataLoaded: false })
    } else {
      var careers = this.state.careers;
      careers.push(careerId);
      this.setState({ careers: careers, isDataLoaded: false })
    }
  }

  renderFilters(filters) {
 /*    let filtersHtml = [];

    //handlers get passed to change the state
    //state changed refreshes page
    filtersHtml.push(<div class="filters-container">
      <HeroSelect selectedValues={this.state.careers} onSelect={this.updateHeroSelect.bind(this)}></HeroSelect>
      <div className="select-filters-container"></div>
      <DifficultySelect></DifficultySelect>
      <MissionSelect></MissionSelect>
      <PotionSelect></PotionSelect>
      <RoleSelect></RoleSelect>
      </div>
    ); */


    return (
        <div className="select-filters-container">
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
    console.log('list of builds to render');
    console.log(builds);
    if (!builds || builds.length === 0) {
      return <p>No builds in database.</p>;
    }
    var buildsHtml = [];
    builds.forEach((build) => {
      buildsHtml.push(<BuildListItem key={build.id} buildId={build.id} buildData={build.data}></BuildListItem>)
    });
    return buildsHtml;
  }
}

export default BuildsList;