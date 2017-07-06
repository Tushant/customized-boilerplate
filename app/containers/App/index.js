/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from "react";
import { Helmet } from "react-helmet";
import { Switch, Route } from "react-router-dom";

import HomePage from "containers/HomePage/Loadable";
import NotFoundPage from "containers/NotFoundPage/Loadable";
import AdminDashboard from "containers/AdminDashboard/Loadable";
import HomeLayout from "containers/HomePage/containers/HomeLayout";
import BlankLayout from "containers/HomePage/containers/BlankLayout";
import TermsAndConditions from "components/TermsAndConditions";

export class App extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    setTimeout(
      console.log.bind(
        console,
        "%cXcelTrip",
        "font: 5em sans-serif; color: red;"
      ),
      0
    );
  }
  render() {
    return (
      <article>
        <Helmet
          titleTemplate="%s - React.js Boilerplate"
          defaultTitle="React.js Boilerplate"
        >
          <meta
            name="description"
            content="A React.js Boilerplate application"
          />
        </Helmet>
        <Switch>
          <Route
            exact
            path="/"
            render={() => <HomeLayout><HomePage /></HomeLayout>}
          />
          <Route
            path="/terms-and-conditions"
            render={() => <HomeLayout><TermsAndConditions /></HomeLayout>}
          />
          <Route path="/admin" component={AdminDashboard} />
          <Route
            path=""
            render={() => <BlankLayout><NotFoundPage /></BlankLayout>}
          />
        </Switch>
      </article>
    );
  }
}

export default App;
