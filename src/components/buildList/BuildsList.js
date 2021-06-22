import React, {Component} from 'react';
import './BuildList.css';
import './BuildListItem.css';
import BuildListItem from './BuildListItem';
import 'simplebar/dist/simplebar.min.css';
import { db } from '../../utils/Firebase';
import { AppContext } from '../../stores/Store';
import { DataHelper } from '../../utils/DataHelper';
import MissionSelect from '../select/MissionSelect';
import DifficultySelect from '../select/DifficultySelect';
import RoleSelect from '../select/RoleSelect';
import PotionSelect from '../select/PotionSelect';
import HeroSelect from '../heroSelect/HeroSelect';
import BookSelect from '../select/BookSelect';
import UserSelect from '../select/UserSelect';
import SortBySelect from '../select/SortBySelect';
import TwitchSelect from '../select/TwitchSelect';

class BuildsList extends Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);

    this.state = {
      name: props.name ? props.name : 'Latest Builds',
      builds: [],
      buildsCount: 0,
      firstBuildDoc: {},
      lastBuildDoc: {},
      currentPage: 1,
      isLastPage: true,
      user: props.user ? props.user : 0,
      careerId: props.careerId ? props.careerId : 0,
      careers: [],
      difficulty: props.difficulty ? props.difficulty : null,
      twitchMode: props.twitchMode ? props.twitchMode : null,
      mission: props.mission ? props.mission : null,
      potion: props.potion ? props.potion : null,
      book: props.book ? props.book : null,
      roles: props.roles ? props.roles : [],
      sortBy: props.sortBy ? props.sortBy : null,
      likedBy: props.likedBy ? props.likedBy : null,
      exclude: props.exclude ? props.exclude : null,
      difficulties: [],
      missions: [],
      potions: [],
      books: [],
      isDataLoaded: false,
      isLoadingData: false,
      filters: [],
      pageLimit: props.pageLimit ? props.pageLimit : 5,
      hideFilters: props.hideFilters,
      hidePages: props.hidePages,
      collapseFilters: props.collapseFilters
    };
  }
  
  componentDidUpdate(prevProps) {
    //alert('update');
/*     alert(this.props.careerId);
    alert(!this.areBuildFiltersChanged(prevProps, this.props)); */
      if (this.arePropsChanged(prevProps, this.props)) {
        this.setState({
          name: this.props.name ? this.props.name : "Latest Builds",
          user: this.props.user ? this.props.user : 0,
          careerId: this.props.careerId ? this.props.careerId : 0,
          difficulty: this.props.difficulty ? this.props.difficulty : null,
          twitchMode: this.props.twitchMode ? this.props.twitchMode : null,
          mission: this.props.mission ? this.props.mission : null,
          potion: this.props.potion ? this.props.potion : null,
          book: this.props.book ? this.props.book : null,
          roles: this.props.roles ? this.props.roles : [],
          sortBy: this.props.sortBy ? this.props.sortBy : null,
          likedBy: this.props.likedBy ? this.props.likedBy : null,
          exclude: this.props.exclude ? this.props.exclude : null,
          collapseFilters: this.props.collapseFilters,
          isDataLoaded: !this.areBuildFiltersChanged(prevProps, this.props)
        });
      }
  }

  areBuildFiltersChanged(prevProps, newProps) { 
    if (prevProps.careerId !== newProps.careerId) {
      return true;
    }

    if ((!prevProps.user && newProps.user) ||
        (prevProps.user && !newProps.user) ||
        (prevProps.user && newProps.user && prevProps.user.id !== newProps.user.id)) {
      return true;
    }

    if ((!prevProps.difficulty && newProps.difficulty) ||
        (prevProps.difficulty && !newProps.difficulty) ||
        (prevProps.difficulty && newProps.difficulty && prevProps.difficulty.id !== newProps.difficulty.id)) {
      return true;
    }

    if ((!prevProps.twitchMode && newProps.twitchMode) ||
        (prevProps.twitchMode && !newProps.twitchMode) ||
        (prevProps.twitchMode && newProps.twitchMode && prevProps.twitchMode.id !== newProps.twitchMode.id)) {
      return true;
    }

    if ((!prevProps.potion && newProps.potion) ||
        (prevProps.potion && !newProps.potion) ||
        (prevProps.potion && newProps.potion && prevProps.potion.id !== newProps.potion.id)) {
      return true;
    }

    if ((!prevProps.book && newProps.book) ||
        (prevProps.book && !newProps.book) ||
        (prevProps.book && newProps.book && prevProps.book.id !== newProps.book.id)) {
      return true;
    }

    if ((!prevProps.mission && newProps.mission) ||
        (prevProps.mission && !newProps.mission) ||
        (prevProps.mission && newProps.mission && prevProps.mission.id !== newProps.mission.id)) {
      return true;
    }

    if ((!prevProps.roles && newProps.roles) ||
        (prevProps.roles && !newProps.roles) ||
        (prevProps.roles && newProps.roles && !DataHelper.arraysEqual(prevProps.roles, newProps.roles))) {
      return true;
    }

    if ((!prevProps.sortBy && newProps.sortBy) ||
        (prevProps.sortBy && !newProps.sortBy) ||
        (prevProps.sortBy && newProps.sortBy && prevProps.sortBy.id !== newProps.sortBy.id)) {
      return true;
    }

    if ((!prevProps.likedBy && newProps.likedBy) ||
        (prevProps.likedBy && !newProps.likedBy) ||
        (prevProps.likedBy && newProps.likedBy && prevProps.likedBy.id !== newProps.likedBy.id)) {
      return true;
    }

    if (prevProps.exclude !== newProps.exclude) {
      return true;
    }

    return false;
  }

  arePropsChanged(prevProps, newProps) {
    if (this.areBuildFiltersChanged(prevProps, newProps)) {
      return true;
    }   

    if (prevProps.name !== newProps.name) {
      return true;
    }

    if (prevProps.exclude !== newProps.exclude) {
      return true;
    }

    if (prevProps.collapseFilters !== newProps.collapseFilters) {
      return true;
    }

    return false;
  }

  render() {
    if (!this.state.isDataLoaded && !this.state.isLoadingData) {
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
        <button className="previous-page-button build-list-page-button tab-button disabled">Previous</button>
        <button className="next-page-button build-list-page-button tab-button" onClick={this.clickNextPage.bind(this)}>Next</button>
      </div>
      );
    }

    if (this.state.isLastPage) {
      return (
      <div className="page-controls">
        <button className="previous-page-button build-list-page-button tab-button" onClick={this.clickPreviousPage.bind(this)}>Previous</button>
        <button className="next-page-button build-list-page-button tab-button disabled">Next</button>
      </div>
      );
    }

    return (
    <div className="page-controls">
      <button className="previous-page-button build-list-page-button tab-button" onClick={this.clickPreviousPage.bind(this)}>Previous</button>
      <button className="next-page-button build-list-page-button tab-button" onClick={this.clickNextPage.bind(this)}>Next</button>
    </div>
    );
  }

  getKeyFromProps() {
    return `${this.props.careerId}${this.props.userId}${this.props.difficulty?this.props.difficulty.id:0}${this.props.mission?this.props.mission.id:0}${this.props.book?this.props.book.id:0}${this.props.potion?this.props.potion.id:0}`;
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
      <div /* key={this.getKeyFromProps()}  */className={`${buildListClassName}`} 
      data-hide-filters={this.state.hideFilters}
      data-collapsed={this.state.collapseFilters}
      data-page-number={this.state.currentPage} 
      data-last-page={this.state.isLastPage}>
        <span className="tab-button build-list-filters-header" onClick={this.buildListFiltersToggle.bind(this)}>Build List Filters</span>
        <div className="build-list-filters-container" >
          {this.renderHeroSelect()}
          <span className="tab-button">Filters</span>
          {this.renderFilters(this.state.filters)}
        </div>
        {this.renderPageControls()}
        <div data-page-number={this.state.currentPage} data-last-page={this.state.isLastPage} className="build-list border-01 background-20">
          <span className="build-list-header header-underline">{this.state.name}</span>
          {this.renderBuilds(this.state.builds)}
        </div>
      </div>
    );
  }

  buildListFiltersToggle() {
    if (this.context) {
      const [state, updateState] = this.context;
      
      updateState({
        type: "UPDATE_FILTER_COLLAPSE_STATE", 
        payload: !this.state.collapseFilters
      });
    }
    else {
      this.setState({collapseFilters: !this.state.collapseFilters});
    }
  }

  loadBuildList() {
    this.setState({isLoadingData: true});

    let buildsQuery = this.getOrderedBuildsQuery();

    buildsQuery = buildsQuery.limit(this.state.pageLimit + 1);

    buildsQuery.get().then((querySnapshot) => {
      let buildList = [];
      let isLastPage = false;

      querySnapshot.forEach((build) => {
        if (!this.state.exclude || this.state.exclude !== build.id) {
          buildList.push({ id: build.id, data: build.data()});
        }        
      });

      if (buildList.length < (this.state.pageLimit + 1)) {
        isLastPage = true;
      }
      else {        
        buildList.pop(); // remove extra item from the list, it's only to check for last page
      }

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
    var orderQuery = { sortBy: 'dateModified', sortOrder: 'desc' };

    if (this.state.sortBy) {
      orderQuery.sortBy = this.state.sortBy.id;
    }

    return this.getBuildsQuery().orderBy(orderQuery.sortBy, orderQuery.sortOrder);
  }

  getPageCount() {
    return Math.round(this.state.buildsCount / this.state.pageLimit) + 1;
  }

  clickNextPage() {
    if (this.state.isLastPage) {
      return;
    }

    let buildsQuery = this.getOrderedBuildsQuery();

    buildsQuery.startAfter(this.state.lastBuildDoc).limit(this.state.pageLimit + 1).get().then((querySnapshot) => {
      var builds = [];
      querySnapshot.forEach((build) => {
        builds.push({ id: build.id, data: build.data()});
      });

      let isLastPage = false;

      console.log(querySnapshot.docs.length < (this.state.pageLimit + 1));

      if (querySnapshot.docs.length < (this.state.pageLimit + 1)) {
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

    buildsQuery.endBefore(this.state.firstBuildDoc).limitToLast(this.state.pageLimit).get().then((querySnapshot) => {
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
      //alert('filter ' + this.state.careerId);
      filters.push({ field: 'careerId', comparison: '==', value: this.state.careerId });
    }

    if (this.state.user) {
      var userId = this.state.user.id;
      filters.push({ field: 'userId', comparison: '==', value: userId });
    }

    if (this.state.difficulty) {
      var difficultyId = this.state.difficulty.id;
      filters.push({ field: 'difficulty', comparison: '==', value: difficultyId });
    }

    if (this.state.twitchMode) {
      var twitchId = this.state.twitchMode.id;
      filters.push({ field: 'twitch', comparison: '==', value: twitchId });
    }

    if (this.state.mission) {
      var missionId = this.state.mission.id;
      filters.push({ field: 'mission', comparison: '==', value: missionId });
    }

    if (this.state.potion) {
      var potionId = this.state.potion.id;
      filters.push({ field: 'potion', comparison: '==', value: potionId });
    }

    if (this.state.book) {
      var bookId = this.state.book.id;
      filters.push({ field: 'book', comparison: '==', value: bookId });
    }

    if (this.state.likedBy) {
      var likedBy = this.state.likedBy.id;
      filters.push({ field: 'likes', comparison: 'array-contains', value: likedBy });
    }

    if (this.state.roles.length > 0) {
      let selectedValues = [];
      this.state.roles.forEach((item) => {
        selectedValues.push(item.id);
      });
      filters.push({ field: 'roles', comparison: 'array-contains-any', value: selectedValues });
    }

    //add additional optional filters from props
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
    alert('test')
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

    var selectedSort = this.state.sortBy ? [this.state.sortBy] : [];
    var selectedUser = this.state.user ? [this.state.user] : [];
    var selectedDifficulties = this.state.difficulty ? [this.state.difficulty] : [];
    var selectedMissions = this.state.mission ? [this.state.mission] : [];
    var selectedPotions = this.state.potion ? [this.state.potion] : [];
    var selectedBooks = this.state.book ? [this.state.book] : [];
    var selectedRoles = this.state.roles ? this.state.roles : [];
    var selectedTwitchMode = this.state.twitchMode ? [this.state.twitchMode] : [];

    return (
        <div className="select-filters-container border-01 background-12 left-shadow">
          <SortBySelect selectedValues={selectedSort}></SortBySelect>
          <UserSelect selectedValues={selectedUser}></UserSelect>
          <DifficultySelect selectedValues={selectedDifficulties}></DifficultySelect>
          <TwitchSelect selectedValues={selectedTwitchMode}></TwitchSelect>
          <MissionSelect selectedValues={selectedMissions}></MissionSelect>
          <PotionSelect selectedValues={selectedPotions}></PotionSelect>
          <BookSelect selectedValues={selectedBooks}></BookSelect>
          <RoleSelect selectedValues={selectedRoles}></RoleSelect>
        </div>
    );
  }

  renderBuilds(builds) {
    if (!this.state.isDataLoaded) {
      return (<span className="build-list-label">Loading Builds...</span>);
    }
    
    if (!builds || builds.length === 0) {
      return (<span className="build-list-label">No builds in database.</span>);
    }

    var buildsHtml = [];
    builds.forEach((build) => {
        buildsHtml.push(<BuildListItem key={build.id} buildId={build.id} buildData={build.data}></BuildListItem>);
    });

    if (buildsHtml.length === 0) {      
      return (<span className="build-list-label">No builds matching the criteria.</span>);
    }
    return buildsHtml;
  }
}

export default BuildsList;