import { DataHelper } from "../../utils/DataHelper";
import HeroTalentIcon from "./HeroTalentIcon";
import "./HeroTalentSummary.css";

function HeroTalentSummary(props) {
    return (
        <div className="hero-talent-summary"
        data-career={props.careerId}
        data-talent1={props.talents[0]}
        data-talent2={props.talents[1]}
        data-talent3={props.talents[2]}
        data-talent4={props.talents[3]}
        data-talent5={props.talents[4]}
        data-talent6={props.talents[5]}
        >
            <HeroTalentIcon careerId={props.careerId} talentNumber={1} tier={1}></HeroTalentIcon>
            <HeroTalentIcon careerId={props.careerId} talentNumber={2} tier={1}></HeroTalentIcon>
            <HeroTalentIcon careerId={props.careerId} talentNumber={3} tier={1}></HeroTalentIcon>
            <HeroTalentIcon careerId={props.careerId} talentNumber={1} tier={2}></HeroTalentIcon>
            <HeroTalentIcon careerId={props.careerId} talentNumber={2} tier={2}></HeroTalentIcon>
            <HeroTalentIcon careerId={props.careerId} talentNumber={3} tier={2}></HeroTalentIcon>
            <HeroTalentIcon careerId={props.careerId} talentNumber={1} tier={3}></HeroTalentIcon>
            <HeroTalentIcon careerId={props.careerId} talentNumber={2} tier={3}></HeroTalentIcon>
            <HeroTalentIcon careerId={props.careerId} talentNumber={3} tier={3}></HeroTalentIcon>
            <HeroTalentIcon careerId={props.careerId} talentNumber={1} tier={4}></HeroTalentIcon>
            <HeroTalentIcon careerId={props.careerId} talentNumber={2} tier={4}></HeroTalentIcon>
            <HeroTalentIcon careerId={props.careerId} talentNumber={3} tier={4}></HeroTalentIcon>
            <HeroTalentIcon careerId={props.careerId} talentNumber={1} tier={5}></HeroTalentIcon>
            <HeroTalentIcon careerId={props.careerId} talentNumber={2} tier={5}></HeroTalentIcon>
            <HeroTalentIcon careerId={props.careerId} talentNumber={3} tier={5}></HeroTalentIcon>
            <HeroTalentIcon careerId={props.careerId} talentNumber={1} tier={6}></HeroTalentIcon>
            <HeroTalentIcon careerId={props.careerId} talentNumber={2} tier={6}></HeroTalentIcon>
            <HeroTalentIcon careerId={props.careerId} talentNumber={3} tier={6}></HeroTalentIcon>
        </div>
    );
}

export default HeroTalentSummary;