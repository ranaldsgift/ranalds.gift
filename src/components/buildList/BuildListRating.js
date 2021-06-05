import React, { Component, useContext } from "react"
import { Link } from "react-router-dom";
import { AppContext } from "../../stores/Store";
import { UserContext } from "../../stores/UserStore";
import { auth, db } from "../../utils/Firebase";

function BuildListRating(props) {
    return (
          <div className="rating">            
            <span className="rating-count" title="Number of ratings">{props.likeCount}</span>
            <div className="rating-icon" title="Rating"></div>
          </div>);
}

export default BuildListRating;