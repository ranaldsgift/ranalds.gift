import React from "react"

function BuildListRating(props) {
    return (
          <div className="rating">            
            <span className="rating-count" title="Number of ratings">{props.likeCount}</span>
            <div className="rating-icon" title="Rating"></div>
          </div>);
}

export default BuildListRating;