import React, {Component} from 'react';
import './App.css';
import '../../assets/css/Talents.css';
import '../../assets/css/Weapons.css';
import '../../assets/css/Icons.css';
import '../../assets/css/Heroes.css';
import '../../assets/css/Layouts.css';
import Background from './Background'
import HeroPage from '../heroPage/HeroPage'
import EditBuildPage from '../buildPage/EditBuildPage'
import BuildListPage from '../buildList/BuildListPage'
import { Route, Router } from 'react-router-dom'
import "react-tabs/style/react-tabs.css";
import HeroPageStore from '../../stores/HeroPageStore';
import BuildsListPageStore from '../../stores/BuildsListPageStore';
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

class App extends Component {
  static contextType = UserContext;

  render() {  
    const [state, updateState] = this.context;

    auth.onAuthStateChanged((user) => {
      console.log('auth state changed')
      console.log(user);

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
              dateCreated: {},
              dateModified: {}
            }
          }); 
        }
      }
    });

    return (
      <Router history={history}>
      <div className="App" id="app">
        <MenuPage userId={state.userId}></MenuPage>
        <Background></Background>
        <div className="page-title page-title-label label-01"></div>
        <div className="page-title page-title-label-background"></div>
        <div className="app-container-frame border-06">
          <div className="app-container background-35">
            <Route path="/home" component={HomePage}></Route>
            <Route path="/about" component={AboutPage}></Route>
            <HeroPageStore>
              <Route path="/heroes/:careerId?/:talents?/:melee?/:range?/:necklace?/:charm?/:trinket?" component={HeroPage}></Route>
            </HeroPageStore>
            <BuildsListPageStore>
              <Route path="/builds" component={BuildListPage}></Route>
            </BuildsListPageStore>
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
          </div>
        </div>
      </div>
      </Router>
    )
  }
}

export default App;
