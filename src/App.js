import React, {useState} from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './i18n';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { AuthContext } from "./context/auth";

import PrivateRoute from './private-route/PrivateRoute';
import Home from './home/Home';
import Dashboard from './dashboard/Dashboard';
import Login from './login/Login';
import Signup from './login/Signup';

import './App.scss';

// TODO add some logic to alter the navbar
// if the user is connected, then remove the sign in and sign up button
// then add the user profile button
function App() {
  const { t } = useTranslation();
  const existingToken = JSON.parse(localStorage.getItem("token"));
  const [authToken, setAuthToken] = useState(existingToken);
  
  // const setToken = (data) => {
  //   localStorage.setItem("token", JSON.stringify(data));
  //   setAuthToken(data);
  // }

  const httpLink = createHttpLink({
    uri: 'http://localhost:3003/graphql'
  });
  
  const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });

  function profile() {
    console.log(authToken);
    return authToken
      ? <p>profile</p>
      : null;
  }

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken}}>
      <ApolloProvider client={client}>
        <Router>
          <header>
            <nav>
              <ul>
                <li>
                  <Link to="/">{t("navbar.home")}</Link>
                </li>
                {authToken && <li>
                  <Link to="/dashboard">{t("navbar.dashboard")}</Link>
                </li>}
                {!authToken && <li>
                  <Link to="/login">{t("authentication.login")}</Link>
                </li>}
                {!authToken && <li>
                  <Link to="/signup">{t("authentication.signup")}</Link>
                </li>}
                {authToken && <li>
                  <Link onClick={() => setAuthToken()} to={{pathname: "/", state: {referer: ''}}}>{t("authentication.logout")}</Link>
                </li>}
              </ul>
            </nav>
          </header>
          <section>
                {/* <AuthContext.Consumer>{ value => <p>{value}</p>}</AuthContext.Consumer> */}
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <PrivateRoute  path="/dashboard" component={Dashboard} />
            </Switch>
          </section>
        </Router>
      </ApolloProvider>
    </AuthContext.Provider>
  );
}

export default App;
