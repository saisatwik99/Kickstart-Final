import "tailwindcss/dist/base.css";
import "styles/globalStyles.css";
import React from "react";
import { css } from "styled-components/macro"; //eslint-disable-line

import ComponentRenderer from "ComponentRenderer.js";
import MainPage from "pages/LandingPage";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// App Starts from here
export default function App() {

  return (
    <Router>
      <Switch>
        <Route path="/:page/:item">
          <ComponentRenderer />
        </Route>
        <Route path="/:page">
          <ComponentRenderer />
        </Route>
        <Route path="/">
          <MainPage />
        </Route>
      </Switch>
    </Router>
  );
}
