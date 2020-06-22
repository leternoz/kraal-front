import React, {useState} from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './i18n';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { AuthContext } from "./context/context";

import PrivateRoute from './private-route/PrivateRoute';
import Home from './home/Home';
import Dashboard from './dashboard/Dashboard';
import Login from './login/Login';
import Signup from './login/Signup';
import Profile from './user/Profile';

import './App.scss';

function App() {
  const { t } = useTranslation();
  const existingToken = JSON.parse(localStorage.getItem("token"));
  const [authToken, setAuthToken] = useState(existingToken);
  
  const httpLink = createHttpLink({
    uri: 'http://localhost:3003/graphql'
  });

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: authToken ? `Bearer ${authToken}` : ''
      }
    }
  });
  
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  function logout() {
    setAuthToken();
    client.resetStore();
  }

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken }}>
      <ApolloProvider client={client}>
        <Router>
          <header>
            <nav>
              <div className="logo"></div>
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
                  <Link to="/profile">{t("navbar.profile")}</Link>
                </li>}
                {authToken && <li>
                  <Link onClick={() => logout()} to={{pathname: "/", state: {referer: ''}}}>{t("authentication.logout")}</Link>
                </li>}
              </ul>
            </nav>
          </header>
          <section>
                {/* <AuthContext.Consumer>{ value => <p>{value}</p>}</AuthContext.Consumer> */}
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
                <PrivateRoute path="/profile" component={Profile} />
                <PrivateRoute  path="/dashboard" component={Dashboard} />
            </Switch>
          </section>
        </Router>
      </ApolloProvider>
    </AuthContext.Provider>
  );
}

export default App;
