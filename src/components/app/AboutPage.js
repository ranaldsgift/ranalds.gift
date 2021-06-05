import React, {Component} from 'react';
import './AboutPage.css';

class AboutPage extends Component {

  render() {
    var root = document.getElementById('root');
    root.dataset.pageName = 'aboutPage';

    return (
        <div className="about-page border-01 top-left-shadow">
          <div className="about-container">
            <h2 className="header-underline">About Ranald's Gift</h2>
            <p>Ranald's Gift is a project developed by myself, <span class="link">B-Fir3</span>, and other community contributors such as <span class="link">Craven</span> and <span class="link">Esawo</span>. You can see a full list of contributors <a href="https://github.com/ranaldsgift/ranaldsgift/graphs/contributors">here</a>. If you would like to contribute, you can find the project on github <a href="https://github.com/ranaldsgift/ranaldsgift">here</a>.</p>
            <p>The project began when I was inspired by <a href="https://fadler.github.io/vermintidebuilds/">Imbaer's Vermintide Builds</a> webapp. My first release was <a href="http://verminbuilds.com/">VerminBuilds.com</a> in April 2018 which initially just allowed linking of builds via static hashes, but eventually allowed users to create accounts and save builds to a database. The last update it received gave it a weapons page which allowed users to see detailed damage profile summaries for melee weapons.</p>
            <p>In October 2019 I released <a href="https://www.ranaldsgift.com/">Ranald's Gift</a> which is essentially a full visual overhaul of the original VerminBuilds. This release did not include additional functionality for saving builds, but was intended to be developed eventually.</p>
            <p>In April 2021 I started working on the website again with the goal of implementing the functionality to create user accounts and save builds. This update involved a great deal of planning and was designed with future feature development in mind.</p>
            <p>This project would not be possible without the support of Fatshark. The visual assets used on this website are property of Fatshark. The two exceptions is the animated video background which is from <a href="https://motiondesktop.com/warhammer-vermintide-2-live-wallpaper_24599.html">MotionDesktop</a> and the anvil logo icon which is from <a href="https://icon-icons.com/icon/anvil/39400">icon-icons</a> used under the <a href="https://creativecommons.org/licenses/by/4.0/">Creative Commons license</a>.</p>
          </div>
          <div className="roadmap-container divider-03 top">
            <h2 className="header-underline">Roadmap</h2>
            <p>Please keep in mind that I develop this project on my own time, and neither myself nor any of the project contributors are being paid for our time. This is a project with hundreds of hours of development work at this point. The ultimate goal is to make this the main resource for Vermintide 2 gameplay and mechanics information, in addition to being a resource for the community to share their character loadouts.</p>
            <p>Development may be slow at times, and none of the planned features are guaranteed. If you would like to help support further development of the project and help ensure that these features are eventually completed, you can hit the donate button below. All donations are optional but are <i>greatly</i> appreciated. Because supporters are essential to the growth of this project, I will be listing everyone who donates in the section below this one, unless they wish to remain anonymous.</p>
            <button className="button-01 donate-button">Donate</button>
          </div>
          <div className="planned-features-container">
            <h2 className="header-underline">Planned Features</h2>
            <ul>
              <li>Add individual pages for each Career</li>
              <p>Display stats for gear used by the career based on saved builds</p>
              <li>Add individual pages for each Weapon</li>
              <p>Display stats for properties and traits for the weapon based on saved builds</p>
              <p>Display stats for career usage rate for the weapon based on saved builds</p>
              <li>Add individual pages for each Equipment item</li>
              <p>Display stats for career usage rate for the property or trait on necklaces, charms and trinkets based on saved builds</p>
            </ul>
          </div>
          <div className="supporters-container divider-03 top">
            <h2 className="header-underline">List of Supporters</h2>
            <p>None yet!</p>
          </div>
        </div>
    );
  }
}

export default AboutPage;