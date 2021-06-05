import React, { useContext } from "react"
import { AppContext } from "../../stores/Store";
import { UserContext } from "../../stores/UserStore";
import BuildCreationInfo from "./BuildCreationInfo";
import BuildPatch from "./BuildPatch";
import BuildRating from "./BuildRating";

function BuildHeader(props) {

    const [state, updateState] = useContext(AppContext);
    const [userState, updateUserState] = useContext(UserContext);

    return (<div className="build-header-details-container ">
                <span className="build-header heading">{state.name}</span>
                <BuildRating likeCount={state.likeCount} author={state.userId} buildId={state.buildId}></BuildRating>
                <div className="build-information-container">
                    <BuildCreationInfo userId={state.userId} username={state.username} dateModified={state.dateModified}></BuildCreationInfo>
                    <span className="text-divider-02"></span>
                    <BuildPatch patchNumber={state.patch}></BuildPatch>                    
                </div>
            </div>);
}

export default BuildHeader;