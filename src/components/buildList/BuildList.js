import React, {Component} from 'react';
import './BuildList.css';
import './BuildListItem.css';
import BuildListItem from './BuildListItem';
import 'simplebar/dist/simplebar.min.css';

// accept a userid, if no id provided get all builds with page limits
// if an id is passed, get the builds for this user only

class BuildList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('rendering build list for user ' + this.props.userId);
    console.log(this.props.builds);

    return (
          <div className="build-list border-01 background-16">
            {this.renderBuilds(this.props.builds)}
          </div>
    );
  }

  renderBuilds(builds) {
    console.log('list of builds to render');
    console.log(builds);
    if (!builds || builds.length === 0) {
      return <p>No {this.props.name} in database.</p>;
    }
    var buildsHtml = [];
    builds.forEach((build) => {
      console.log('build item');
      console.log(build.data);
      buildsHtml.push(<BuildListItem buildId={build.id} buildData={build.data}></BuildListItem>)
    });
    return buildsHtml;
  }
}

export default BuildList;