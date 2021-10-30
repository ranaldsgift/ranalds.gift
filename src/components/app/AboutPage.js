import React, {Component} from 'react';
import './AboutPage.css';

class AboutPage extends Component {

  componentDidMount() {
    document.title = "About - Roadmap - Supporters | ranalds.gift";
  }

  render() {
    return (
        <div className="about-page border-01 top-left-shadow">
          <div className="about-container">
            <h2 className="header-underline">About Ranald's Gift</h2>
            <p>Ranald's Gift is a project developed by myself, <a className="link" href="/user/eKauxjk0DsWcwKr2d2QU0rENB5x1/view">B-Fir3</a>, and other community contributors such as <span className="link">Craven</span> and <span className="link">Esawo</span>. You can see a full list of contributors <a href="https://github.com/ranaldsgift/ranalds.gift/graphs/contributors">here</a>. If you would like to contribute, you can find the project on github <a href="https://github.com/ranaldsgift/ranalds.gift">here</a>.</p>
            <p>The project began when I was inspired by <a href="https://fadler.github.io/vermintidebuilds/">Imbaer's Vermintide Builds</a> webapp. My first release was <a href="http://verminbuilds.com/">VerminBuilds.com</a> in April 2018 which initially just allowed linking of builds via static hashes, but eventually allowed users to create accounts and save builds to a database. The last update it received gave it a weapons page which allowed users to see detailed damage profile summaries for melee weapons.</p>
            <p>In October 2019 I released <a href="https://www.ranaldsgift.com/">Ranald's Gift</a> which is essentially a full visual overhaul of the original VerminBuilds. This release did not include additional functionality for saving builds, but was intended to be developed eventually.</p>
            <p>In April 2021 I started working on the website again with the goal of implementing the functionality to create user accounts and save builds. This update involved a great deal of planning and was designed with future feature development in mind.</p>
            <p>This project would not be possible without the support of Fatshark. The visual assets used on this website are property of Fatshark. The exceptions are: Ranald's beautiful middle finger posted by <a href="https://www.reddit.com/user/CasinoDuelist">/u/CasinoDuelist</a> and the video background which is from <a href="https://motiondesktop.com/warhammer-vermintide-2-live-wallpaper_24599.html">MotionDesktop</a> used under the <a href="https://creativecommons.org/licenses/by/4.0/">Creative Commons license</a>.</p>
            <p>The website is currently ad-free, with sponsored banners appearing only at the bottom of this page. The website is not free to operate there are costs for the domain and database, as well as all the work that goes into development. To help keep the website ad-free, please consider supporting the development of the project by clicking the Donate button below.</p>
          </div>
          <div className="roadmap-container divider-03 top">
            <h2 className="header-underline">Roadmap</h2>
            <p>Please keep in mind that I develop this project on my own time, and neither myself nor any of the project contributors are being paid for our time. This is a project with hundreds of hours of development work at this point. The ultimate goal is to make this the main resource for Vermintide 2 gameplay and mechanics information, in addition to being a resource for the community to share their character loadouts.</p>
            <p>Development may be slow at times, and none of the planned features are guaranteed. If you would like to help support further development of the project and help ensure that these features are eventually completed, you can hit the Donate button below. All donations are optional but are <i>greatly</i> appreciated. Please leave your username in the message if you decide to support so that you can be easily identified if you wish to be. Because supporters are essential to the growth of this project, I will be listing everyone who donates in the section below this one, unless they wish to remain anonymous.</p>
            <button className="button-01 donate-button"><a href="https://www.paypal.com/donate/?hosted_button_id=C4GWNTDGWWC3N" target="_blank" rel="noreferrer">Donate</a></button>
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
              <li>Add detailed weapon damage data</li>
              <p>Display detailed weapon damage tables for each weapon similar to <a href="https://docs.google.com/spreadsheets/d/1jESmZ3kHLDWyma-iksiKLrWI5l-2Php5BvAysgxc_zI/edit#gid=62597031">OrangeChris' Damage &amp; Breakpoint Calculator</a></p>
              <p>Create a custom combo database for users to save custom combos for each weapon</p>
              <p>Display a high priority breakpoint summary in an overview section on each weapon page</p>
              <p>Support for different difficulties as well as custom Hero Power</p>
              <li>Add a "Team" page</li>
              <p>Display multiple builds with a brief summary overview, similar to <a href="https://steamcommunity.com/sharedfiles/filedetails/?id=1455893647">Player List Plus</a></p>
              <li>Add a stream overlay view for builds</li>
              <p>Display a build summary with transparent graphics usable in a browser source in OBS</p>
              <p>Implement functionality to support the <a href="https://steamcommunity.com/sharedfiles/filedetails/?id=1504702573">Info Dump For Streaming</a> mod</p>
              <li>Add additional database functionality</li>
              <p>Let users delete their builds, or delete their user accounts</p>
              <li>Add a complete enemy Beastiary</li>
              <p>Show detailed enemy data similar to <a href="https://steamcommunity.com/sharedfiles/filedetails/?id=1431393962">Vermitannica (Beastiary)</a> mod</p>
              <li>Add support for other languages</li>
              <p>With enough community support we could definitely add support for additional languages in the future</p>
              <li>Add roles for user accounts</li>
              <p>Roles for moderators, supporters, developers and others could be added for user accounts</p>
              <p>Roles could have custom UI elements for their builds</p>
              <li>Add a global search for the entire website</li>
              <p>Once other features are implemented, allow users to search for careers, enemies, weapons, etc. from a persistent search box in the header</p>
              <li>Add a page for FightTheTide</li>
              <p>Show the Vermintide 2 community event schedule</p>
              <p>Show history of Vermintide community events</p>
              <p>Show scores from Vermintide community tournaments</p>
              <li>Pipe Dreams</li>
              <p>Create a mod that allows users to load builds from ranalds.gift directly into their Vermintide 2 game</p>
              <li>Dedicated Servers</li>
              <p>Not likely</p>
            </ul>
          </div>
          <div className="supporters-container divider-03 top">
            <h2 className="header-underline">List of Supporters</h2>
            <p><a href="https://www.ranalds.gift/user/J5DUTj98hhMy13zmAc0AuPDJgaw2/view">Royale w/ Cheese</a></p>
            <p><a href="https://www.ranalds.gift/user/ppXwQUdKLhbLZFzWfTyGdXl4z8f2/view">Esawo</a></p>
            <p><a href="https://www.ranalds.gift/user/zRPkXwvmgoZk0yWaYq6HAZi5s3L2/view">Exan</a></p>
            <p><a href="https://www.ranalds.gift/user/vE0SE9erLqYle0upDoVuymIDiIu2/view">ScareCrowClock</a></p>
            <p><a href="https://www.ranalds.gift/user/78T7T1URr5OzVJrUdSLBt2EWCek1/view">«§ëvënPrøxy»</a></p>
            <p>MannyBlanc</p>
            <p><a href="https://www.ranalds.gift/user/flVp52HdEUXfrPrNfqzbjk8AQN93/view">Wildfire</a></p>
            <p>Craacked</p>
            <p>Saryk</p>
          </div>
          <div className="privacy-container">
            <h2 className="header-underline">Privacy Policy</h2>
            <p>You can view our Privacy Policy <a href="/privacy">here.</a></p>
          </div>
          <p className="divider-03 top">This <a href="https://www.etsy.com/ca/shop/Minipott">etsy shop</a> is owned and operated by my girlfriend and fellow rat slayer, Minipott. She creates handmade pottery and has a lovely shop filled with beautiful items. Check it out!</p>
          <a style={{textAlign: 'center'}} href="https://www.etsy.com/ca/shop/Minipott"><img style={{width: '100%', maxWidth: '800px', margin: '0 auto'}} alt="Minipott's Etsy Store" src="https://i.etsystatic.com/isbl/6c93d9/36441098/isbl_3360x840.36441098_dstjxy2g.jpg?version=1"></img></a>
        </div>
    );
  }
}

export default AboutPage;
