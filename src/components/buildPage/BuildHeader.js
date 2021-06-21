import React, { useContext } from "react"
import { Link } from "react-router-dom";
import { AppContext } from "../../stores/Store";
import BuildCreationInfo from "./BuildCreationInfo";
import BuildPatch from "./BuildPatch";
import BuildRating from "./BuildRating";

function BuildHeader(props) {

    const [state] = useContext(AppContext);

    return (<div className="build-header-details-container ">
                <span className="build-header heading">{state.name}</span>
                <BuildRating likeCount={state.likeCount} author={state.userId} buildId={state.buildId}></BuildRating>
                <div className="build-information-container">
                    <BuildCreationInfo userId={state.userId} username={state.username} dateModified={state.dateModified}></BuildCreationInfo>
                    <span className="text-divider-02"></span>
                    <BuildPatch patchNumber={state.patch}></BuildPatch>    
                    <Link to={`/build/${state.buildId}/edit`} className="edit-build-button button-02">edit</Link>
                </div>
            </div>);
}

export default BuildHeader;