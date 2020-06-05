import React from 'react';
import {BrowserRouter as Router, Switch, Link} from 'react-router-dom';
import PrivateRoute from '../private-route/PrivateRoute';

import PersonalData from './PersonalData';
import PersonalDataForm from './PersonalDataForm';
import Mission from './Mission';
import MissionForm from './MissionForm';
import Skill from './Skill';
import SkillForm from './SkillForm';


function Profile(props) {    
    return (
        <div>
            <Router>
                <nav class="side-nav left">   
                    <li><Link to={props.match.url + "/profile/personal-data"}>Profile</Link></li>
                    <li><Link to={props.match.url + "/profile/personal-data/edit"}>ProfileForm</Link></li>
                    <li><Link to={props.match.url + "/profile/missions"}>Mission</Link></li>
                    <li><Link to={props.match.url + "/profile/missions/edit"}>MissionForm</Link></li>
                    <li><Link to={props.match.url + "/profile/skills"}>Skill</Link></li>
                    <li><Link to={props.match.url + "/profile/skills/edit"}>SkillForm</Link></li>
                </nav>
                <Switch>
                    <PrivateRoute exact path={props.match.url + "/profile/personal-data"} component={PersonalData}/>
                    <PrivateRoute exact path={props.match.url + "/profile/personal-data/edit"} component={PersonalDataForm}/>
                    <PrivateRoute exact path={props.match.url + "/profile/missions"} component={Mission}/>
                    <PrivateRoute exact path={props.match.url + "/profile/missions/edit"} component={MissionForm}/>
                    <PrivateRoute exact path={props.match.url + "/profile/skills"} component={Skill}/>
                    <PrivateRoute exact path={props.match.url + "/profile/skills/edit"} component={SkillForm}/>
                </Switch>
            </Router>
        </div>
    );
}

export default Profile;