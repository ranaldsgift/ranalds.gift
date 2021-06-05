import React, {Component} from 'react';
import './App.css';
import '../../assets/css/Talents.css';
import '../../assets/css/Weapons.css';
import '../../assets/css/Borders.css';
import '../../assets/css/Icons.css';
import '../../assets/css/Dividers.css';
import '../../assets/css/Heroes.css';
import Background from './Background'
import HeroPage from '../heroPage/HeroPage'
import EditBuildPage from '../buildPage/EditBuildPage'
import BuildListPage from '../buildList/BuildListPage'
import { Route, Router } from 'react-router-dom'
import "react-tabs/style/react-tabs.css";
import HeroPageStore from '../../stores/HeroPageStore';
import BuildPageStore from '../../stores/BuildPageStore';
import LoginPage from '../users/LoginPage';
import RegisterPage from '../users/RegisterPage';
import MenuPage from './MenuPage';
import HomePage from './HomePage';
import history from '../../utils/History';
import { auth, db } from '../../utils/Firebase';
import AboutPage from './AboutPage';
import { UserContext } from '../../stores/UserStore';
import UserPageContainer from '../users/UserPageContainer';
import UserViewStore from '../../stores/UserViewStore';
import ViewBuildPage from '../buildPage/ViewBuildPage';
import BuildListPageStore from '../../stores/BuildListPageStore';
import BuildsList from '../buildList/BuildsList';
import { DataHelper } from '../../utils/DataHelper';
import '../../assets/css/Layouts.css';

class App extends Component {
  static contextType = UserContext;

  render() {  
    const [state, updateState] = this.context;

    //DataHelper.getBuildStats();

    auth.onAuthStateChanged((user) => {
      console.log('auth state changed');

      var root = document.getElementById('root');
      if (user !== null) {
        console.log('user logged in');
        root.classList.add('loggedIn');
        
        if (state.userId !== user.uid) {

          db.collection('users').doc(user.uid).get().then((doc) => {

            console.log('setting state to current user ' + user.uid);

             updateState({
              type: "UPDATE_USER_INFO", 
              payload: { 
                userId: user.uid,
                username: doc.data().username,
                email: user.email,
                steam: doc.data().steam,
                twitch: doc.data().twitch,                
                likedBuilds: doc.data().likedBuilds,
                dateCreated: doc.data().dateCreated,
                dateModified: doc.data().dateModified
              }
            });
          }).catch((error) => {
              console.error("Error getting document:", error);
          });

        }

        if (root.dataset.pageName === 'loginPage' || root.dataset.pageName === 'registerPage') {
          setTimeout(() => { history.push('/user/' + user.uid + '/view'); }, 1000)
        }
      }
      else {
        root.classList.remove('loggedIn');
        console.log('removing state to current user ');
        if (state.userId !== '') {
          updateState({
            type: "UPDATE_USER_INFO", 
            payload: { 
              userId: '',
              username: '',
              email: '',
              steam: '',
              twitch: '',
              likedBuilds: [],
              dateCreated: {},
              dateModified: {}
            }
          }); 
        }
      }
    });


    //planned features
    //teams page
    //stats page with breakdowns about builds
    //build comparison tool
    //weapon data numbers
    //CW pages/info/support
    //bestiary/equipment guide
    //user ranks for builds created/likes/supporter/vip/mod
    //admin mod page to manage builds in db
    //additional user stats on user page, # of builds, likes etc
    //about page with credits, source link and contribution page
    //full build summary with all stats after all calculated buffs from talents/properties/traits/etc
    //integrate with a mod that exports data to display current build, or import data from RG to change existing build in game


    return (
      <Router history={history}>
      <div className="App" id="app">
        <MenuPage userId={state.userId}></MenuPage>
        <Background></Background>
        <div className="page-title page-title-label label-01"></div>
        <div className="page-title page-title-label-background"></div>
        <div className="app-container-frame border-06 background7">
          <div className="app-container">
            <Route path="/home" component={HomePage}></Route>
            <Route path="/about" component={AboutPage}></Route>
            <HeroPageStore>
              <Route path="/heroes/:careerId?/:talents?/:melee?/:range?/:necklace?/:charm?/:trinket?" component={HeroPage}></Route>
            </HeroPageStore>
            <BuildListPageStore>
              <Route path="/builds" component={BuildsList}></Route>
            </BuildListPageStore>
            <BuildPageStore>
              <Route path="/build/:buildId/edit" component={EditBuildPage}></Route>
            </BuildPageStore>
            <BuildPageStore>
              <Route path="/build/:buildId/view" component={ViewBuildPage}></Route>
            </BuildPageStore>
            <BuildPageStore>
              <Route path="/build/create" component={EditBuildPage}></Route>
            </BuildPageStore>
              <Route path="/login" component={LoginPage}></Route>
              <Route path="/register" component={RegisterPage}></Route>
              <UserViewStore>
                <Route path="/user/:userId" component={UserPageContainer}></Route>
              </UserViewStore>
            <Route exact path="/" component={HomePage}></Route>
          </div>
        </div>
      </div>
      </Router>
    )
  }
}

export default App;
