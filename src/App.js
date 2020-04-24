import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./i18n";

import Home from "./home/Home";
import Dashboard from "./dashboard/Dashboard";

import "./App.scss";

// TODO add some logic to alter the navbar

function App() {
  const { t } = useTranslation();

  return (
    <Router>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">{t("navbar.home")}</Link>
            </li>
            <li>
              <Link to="/dashboard">{t("navbar.dashboard")}</Link>
            </li>
          </ul>
        </nav>
      </header>
      <body>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
        </Switch>
      </body>
    </Router>
  );
}

export default App;
