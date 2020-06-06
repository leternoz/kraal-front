import React from 'react';
import {BrowserRouter as Router, Switch, Link} from 'react-router-dom';
import PrivateRoute from '../private-route/PrivateRoute';

import PersonalData from './PersonalData';
import PersonalDataForm from './PersonalDataForm';
import Mission from './Mission';
import MissionForm from './MissionForm';
import Skill from './Skill';
import SkillForm from './SkillForm';

import './Profile.scss';

function Profile(props) {    
    return (
        <div className="profile">
            <Router>
                <nav class="side-nav left"> 
                    <ul>
                        <li><Link to={props.match.url + "/"}>PersonalData</Link></li>
                        <li><Link to={props.match.url + "/missions"}>Mission</Link></li>
                        <li><Link to={props.match.url + "/skills"}>Skill</Link></li>
                    </ul> 
                </nav>
                <Switch>
                    <PrivateRoute exact path={props.match.url + "/"} component={PersonalData}/>
                    <PrivateRoute exact path={props.match.url + "/edit"} component={PersonalDataForm}/>
                    <PrivateRoute exact path={props.match.url + "/missions"} component={Mission}/>
                    <PrivateRoute exact path={props.match.url + "/missions/edit"} component={MissionForm}/>
                    <PrivateRoute exact path={props.match.url + "/skills"} component={Skill}/>
                    <PrivateRoute exact path={props.match.url + "/skills/edit"} component={SkillForm}/>
                </Switch>
            </Router>
        </div>
    );
}

export default Profile;