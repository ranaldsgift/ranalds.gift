import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../utils/Firebase';
import './MenuPage.css';

function MenuPage(props) {
    return (
        <div className="navigation-menu-container"> 
        <div className="nagivation-menu-button" onClick={clickNavigationMenu}><div className="nagivation-menu-overlay"></div></div>   
        <div className="navigation-menu-page">    
            <div className="menu-title-label"></div>      
            <div className="menu-title-divider divider-12"></div>      
            <ul className="app-navigation-container">
              <span className="close-menu-button" onClick={handleCloseNavigationMenu}>x</span>
              <div className="chain-decoration left scroll-10"></div>
              <div className="chain-decoration right scroll-10"></div>
              <li className="app-navigation-button button-01 border-04 buildsPageMenuButton"><Link to="/builds" data-pagename="buildsPage" onClick={clickNavigationMenu}>Builds</Link></li>
              <li className="app-navigation-button button-01 border-04 heroesPageMenuButton"><Link to="/heroes" data-pagename="heroesPage" onClick={clickNavigationMenu}>Heroes</Link></li>
              <li className="app-navigation-button button-01 border-04 createBuildPageMenuButton auth-button"><Link to="/build/create" data-pagename="createBuildPage" onClick={clickNavigationMenu}>Create Build</Link></li>
              <li className="app-navigation-button button-01 border-04 userPageMenuButton auth-button"><Link to={`/user/${props.userId}/view`} data-pagename="userPage" onClick={loadPage.bind()}>My Account</Link></li>
              <li className="app-navigation-button button-01 border-04 loginPageMenuButton unauth-button"><Link to="/login" data-pagename="loginPage" onClick={loadPage.bind()}>Login</Link></li>
              <li className="app-navigation-button button-01 border-04 aboutPageMenuButton"><Link to="/about" data-pagename="aboutPage" onClick={loadPage.bind()}>About</Link></li>
              <li className="app-navigation-button button-01 border-04 logoutMenuButton auth-button" onClick={logoutUser}>Logout</li>
            </ul>
            <div className="menu-title-divider-bottom divider-19"></div>   
        </div>
        </div>
    );
  }

function handleCloseNavigationMenu() {
    var root = document.getElementById('root');
    root.classList.remove('showNav');
}

function loadPage(pageName) {
    console.log('loading page');
    var root = document.getElementById('root');
    console.log(root.classList);
    root.classList.remove('showNav');
    console.log(pageName.currentTarget.dataset.pagename);
    console.log(root.classList);
    //root.classList.add(pageName.currentTarget.dataset.pagename);
}

function logoutUser() {
    auth.signOut().then(function() {
        alert("You have been logged out");
    }).catch(function(error) {
        alert("An error occurred when logging you out");
    });
}

function clickNavigationMenu(){
    var root = document.getElementById('root');

    if (!root.classList.contains('showNav')) {
        root.classList.add('showNav');
        return;
    }
    
    root.classList.remove('showNav');
}

export default MenuPage;