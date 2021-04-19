import React, {Component} from 'react';
import './AboutPage.css';

class AboutPage extends Component {

  render() {
    var root = document.getElementById('root');
    root.dataset.pageName = 'aboutPage';

    return (
        <div className="about-page">
        </div>
    );
  }
}

export default AboutPage;