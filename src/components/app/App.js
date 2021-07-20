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
import { Route, Router, Link } from 'react-router-dom'
import "react-tabs/style/react-tabs.css";
import HeroPageStore from '../../stores/HeroPageStore';
import BuildPageStore from '../../stores/BuildPageStore';
import LoginPage from '../users/LoginPage';
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
import '../../assets/css/Layouts.css';
import PrivacyPolicy from './PrivacyPolicy';

class App extends Component {
  static contextType = UserContext;

  toggleBackground() {
    const [state, updateState] = this.context;

    if (auth.currentUser) {    
      db.collection('users').doc(auth.currentUser.uid).update({ showVideo: !state.showVideo }).then((doc) => {
        console.log('Saved user setting for background video.');
      });
    }
    updateState({
      type: "TOGGLE_BACKGROUND"
    });

  }

  render() {  
    const [state, updateState] = this.context;

    auth.onAuthStateChanged((user) => {

      var root = document.getElementById('root');
      if (user !== null) {
        root.classList.add('loggedIn');
        
        if (state.userId !== user.uid) {

          db.collection('users').doc(user.uid).get().then((doc) => {

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
                dateModified: doc.data().dateModified,
                showVideo: doc.data().showVideo
              }
            });
          }).catch((error) => {
              console.error("Error getting document:", error);
          });

        }
      }
      else {
        root.classList.remove('loggedIn');
        
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
      <Route exact path="/" component={MenuPage}></Route>
      <Route exact path="/menu" component={MenuPage}></Route>
      <Route exact path="/home" component={MenuPage}></Route> 
      <div className="App" id="app" data-auth={auth.currentUser ? true : false} data-showvideo={state.showVideo}>
        <div className="navigation-menu-container"> 
          <Link to="/menu" className="nagivation-menu-button"><div className="nagivation-menu-overlay"></div></Link>
        </div>
        <Background hideVideo={!state.showVideo} toggleBackground={this.toggleBackground.bind(this)}></Background>
        <span className="page-title page-title-label label-01">Ranald's Gift</span>
        <div className="page-title page-title-label-background"></div>
        <div className="app-container-frame">
          <div className="app-container border-06 background7">
            <Route path="/about" component={AboutPage}></Route>
            <Route path="/privacy" component={PrivacyPolicy}></Route>
            <HeroPageStore>
              <Route path="/heroes/:careerId?/:talents?/:primary?/:secondary?/:necklace?/:charm?/:trinket?" component={HeroPage}></Route>
            </HeroPageStore>
            <BuildListPageStore>
              <Route path="/builds" component={BuildListPage}></Route>
            </BuildListPageStore>
            <BuildPageStore>
              <Route path="/build/:buildId/edit" component={EditBuildPage}></Route>
            </BuildPageStore>
            <BuildPageStore>
              <Route path="/build/:buildId/view" component={ViewBuildPage}></Route>
            </BuildPageStore>
            <BuildPageStore>
              <Route path="/build/create/:careerId?/:talents?/:primary?/:secondary?/:necklace?/:charm?/:trinket?" component={EditBuildPage}></Route>
            </BuildPageStore>
              <Route path="/login" component={LoginPage}></Route>
              <Route path="/register" component={LoginPage}></Route>
              <UserViewStore>
                <Route path="/user/:userId" component={UserPageContainer}></Route>
              </UserViewStore>
            <Route exact path="/support" render={() => { window.location.href = 'https://www.paypal.com/donate/?hosted_button_id=C4GWNTDGWWC3N'; }}></Route>
          </div>
        </div>
      </div>
      </Router>
    )
  }
}

export default App;
