import React, { Component, useContext } from "react"

function BuildPatch(props) {
    return (<div><span>Patch</span><span>{props.patchNumber}</span></div>);
}

export default BuildPatch;