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
              <span className="close-menu-button" onClick={handleCloseNavigationMenu}></span>
              <div className="chain-decoration left scroll-10"></div>
              <div className="chain-decoration right scroll-10"></div>
              <li className="app-navigation-button button-01 border-04 buildsPageMenuButton"><Link to="/builds" data-pagename="buildsPage" onClick={clickNavigationMenu.bind()}>Builds</Link></li>
              <li className="app-navigation-button button-01 border-04 heroesPageMenuButton"><Link to="/heroes" data-pagename="heroesPage" onClick={clickNavigationMenu.bind()}>Heroes</Link></li>
              <li className="app-navigation-button button-01 border-04 createBuildPageMenuButton auth-button"><Link to="/build/create" data-pagename="createBuildPage" onClick={clickNavigationMenu.bind()}>Create Build</Link></li>
              <li className="app-navigation-button button-01 border-04 aboutPageMenuButton"><Link to="/about" data-pagename="aboutPage" onClick={clickNavigationMenu.bind()}>About</Link></li>
              <li className="app-navigation-button button-01 border-04 userPageMenuButton auth-button"><Link to={`/user/${props.userId}/view`} data-pagename="userPage" onClick={clickNavigationMenu.bind()}>My Account</Link></li>
              <li className="app-navigation-button button-01 border-04 loginPageMenuButton unauth-button"><Link to="/login" data-pagename="loginPage" onClick={clickNavigationMenu.bind()}>Login</Link></li>
              <li className="app-navigation-button button-01 border-04 logoutMenuButton auth-button" onClick={logoutUser}>Logout</li>
            </ul>
            <div className="menu-title-divider-bottom divider-19"></div>  
            <a className="discord-button" href="https://discord.gg/ZQrEeE69EF"></a>
        </div>
        </div>
    );
  }

function handleCloseNavigationMenu() {
    var root = document.getElementById('root');
    root.classList.remove('showNav');
}

function logoutUser() {
    auth.signOut().then(function() {
        //setTimeout(() => { history.push(`/home`); }, 1000);
    }).catch(function(error) {
        alert("An error occurred when logging you out");
    });
}

function clickNavigationMenu(e){
    var root = document.getElementById('root');

    if (!root.classList.contains('showNav')) {
        root.classList.add('showNav');
        return;
    }
    root.dataset.pagename = e.currentTarget.dataset.pagename;
    root.classList.remove('showNav');
}

export default MenuPage;