import React, { useContext } from "react"
import { AppContext } from "../../stores/Store";
import { UserContext } from "../../stores/UserStore";
import BuildCreationInfo from "./BuildCreationInfo";
import BuildPatch from "./BuildPatch";
import BuildRating from "./BuildRating";

function BuildGuide(props) {

    const [state, updateState] = useContext(AppContext);
    const [userState, updateUserState] = useContext(UserContext);

    if (!state.description || state.description.length === 0) {
        return null;
    } 

    return (<textarea className="input-build-description border-02 background-18" wrap="hard" placeholder="Describe your build" value={state.description} readOnly></textarea>);
}

export default BuildGuide;