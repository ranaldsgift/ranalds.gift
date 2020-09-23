import React, {Component} from 'react';
import './BuildList.css';
import './BuildListItem.css';
import BuildListItem from './BuildListItem';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';


class BuildList extends Component {
  render() {
    return (
        <SimpleBar style={{ height: '100%'}}>
          <div className="build-list">
              <BuildListItem></BuildListItem>
              <BuildListItem></BuildListItem>
              <BuildListItem></BuildListItem>
              <BuildListItem></BuildListItem>
              <BuildListItem></BuildListItem>
              <BuildListItem></BuildListItem>
              <BuildListItem></BuildListItem>
              <BuildListItem></BuildListItem>
              <BuildListItem></BuildListItem>
            {this.renderBuilds()}
          </div>
        </SimpleBar>
    );
  }

  renderBuilds() {

  }
}

export default BuildList;