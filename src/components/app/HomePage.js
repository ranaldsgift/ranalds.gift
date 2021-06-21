import './HomePage.css';

function HomePage() {
  var root = document.getElementById('root');
  console.log('loading home page');
  root.classList.add('showNav');
  document.title = `Vermintide 2 Builds - Vermintide 2 | ranalds.gift`;
  //document.title = `Vermintide 2 Builds, Gameplay and Mechanics Information | Ranalds.Gift`;
  return (<div className="home-page">
    <div className="ranalds-finger"></div>
  </div>);
}

export default HomePage;