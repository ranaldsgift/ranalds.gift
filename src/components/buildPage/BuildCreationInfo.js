import React, { Component, useContext } from "react"
import { Link } from "react-router-dom";
import { DataHelper } from "../../utils/DataHelper";

function BuildCreationInfo(props) {

    var lastUpdatedDayCount = DataHelper.getDaysSinceDate(props.dateModified)
    var lastUpdatedText = `${lastUpdatedDayCount} days ago`;
    if (lastUpdatedDayCount === 0) {
        lastUpdatedText = `today`;
      }
      else if (lastUpdatedDayCount === 1) {
        lastUpdatedText = `${lastUpdatedDayCount} day ago`;
      }

    return (<div className="build-creation-info">
                <span className="build-author-by">by</span><Link as={Link} to={`/user/${props.userId}/view`} className="build-author">{props.username}</Link><span className="date-updated">{`updated ${lastUpdatedText}`}</span>
            </div>);
}

export default BuildCreationInfo;