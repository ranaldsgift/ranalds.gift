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
import { BrowserRouter, Route, Link } from 'react-router-dom'
import "react-tabs/style/react-tabs.css";
import HeroPageStore from '../../stores/HeroPageStore';
import BuildsListPageStore from '../../stores/BuildsListPageStore';
import BuildPageStore from '../../stores/BuildPageStore';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
      <div className="App">
        <Background></Background>
        <div className="page-title-label label-01"></div>
        <div className="page-title-label-background"></div>
        <div className="app-container-frame border-06">
          <div className="app-container background-35">
            <ul className="app-navigation-container hidden">
              <li className="app-navigation-button border-04"><Link to="/builds" >Builds</Link></li>
              <li className="empty"></li>
              <li className="app-navigation-button border-04"><Link to="/heroes" >Heroes</Link></li>
            </ul>
            <HeroPageStore>
            <Route path="/:careerId?/:talents?/:melee?/:range?/:necklace?/:charm?/:trinket?" component={HeroPage}></Route>
            </HeroPageStore>
            <BuildsListPageStore>
            <Route path="/builds" component={BuildListPage}></Route>
            </BuildsListPageStore>
            <BuildPageStore>
            <Route path="/build/:buildId/edit" component={EditBuildPage}></Route>
            </BuildPageStore>
          </div>
        </div>
      </div>
      </BrowserRouter>
    )
  }
}

export default App;
