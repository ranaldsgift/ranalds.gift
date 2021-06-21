import React from "react"
import parse from 'html-react-parser'

function BuildGuide(props) {

    if (!props.description || props.description.length === 0) {
        return null;
    } 
    return (<div className="build-guide-container divider-03 top">
        <div className="build-guide border-09 ql-editor">{parse(props.description)}</div>
    </div>);
}

export default BuildGuide;