import React from 'react';
import {BrowserRouter as Router, Switch, Link} from 'react-router-dom';
import PrivateRoute from '../private-route/PrivateRoute';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Query } from 'react-apollo';
import { useTranslation } from 'react-i18next';

import PersonalData from './PersonalData';
import PersonalDataForm from './PersonalDataForm';
import Mission from './Mission';
import MissionForm from './MissionForm';
import Skill from './Skill';
import SkillForm from './SkillForm';
import ErrorMessage from '../error-handler/ErrorMessage';

import './Profile.scss';

function Profile(props) {   
    const { t } = useTranslation();
    const query = gql`
    query {
        getProfile {
          person {
            email
            name
            surname
            address
            phone
            dateOfBirth {
                year
                month
                day
            }
            city {
                name
                code
            }
          }
        }
      }
    `;
    
    return (
        <Query query={query}>
             {({ loading, error, data }) => {
                if(loading) {
                    return (<p>loading</p>);
                }
                if(error) {
                    return (<ErrorMessage errorTitle={t("error.title")} errorMessage={error}/>);
                }
                const personData = data.getProfile.person; 
                return (
                    <div className="profile">
                        <Router>
                            <nav className="side-nav left"> 
                                <ul>
                                    <li><Link to={props.match.url + "/"}>PersonalData</Link></li>
                                    <li><Link to={props.match.url + "/missions"}>Mission</Link></li>
                                    <li><Link to={props.match.url + "/skills"}>Skill</Link></li>
                                </ul> 
                            </nav>
                            <Switch>
                                <PrivateRoute exact path={props.match.url + "/"} component={PersonalData} person={personData} />
                                <PrivateRoute exact path={props.match.url + "/edit"} component={PersonalDataForm}/>
                                <PrivateRoute exact path={props.match.url + "/missions"} component={Mission}/>
                                <PrivateRoute exact path={props.match.url + "/missions/edit"} component={MissionForm}/>
                                <PrivateRoute exact path={props.match.url + "/skills"} component={Skill}/>
                                <PrivateRoute exact path={props.match.url + "/skills/edit"} component={SkillForm}/>
                            </Switch>
                        </Router>
                    </div>
                );
             }}
        </Query>
    );
}

export default Profile;