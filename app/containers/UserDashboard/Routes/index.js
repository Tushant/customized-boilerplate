import React from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { makeSelectLocation } from "containers/App/selectors";
import loadApplyForAgentPage from "../containers/Agent/Loadable";
import loadParentPage from "../containers/ParentPage/Loadable";
import loadNotFoundPage from "containers/NotFoundPage/Loadable";

function UserRoutes({ location }) {
  return (
    <Switch location={location}>
      <Route exact path="/user/dashboard/home" load={loadParentPage} />
      <Route
        exact
        path="/user/dashboard/apply/for/agent"
        load={loadApplyForAgentPage}
      />
      <Route exact path="/user/dashboard/*" load={loadNotFoundPage} />
    </Switch>
  );
}

const mapStateToProps = createStructuredSelector({
  location: makeSelectLocation()
});

export default connect(mapStateToProps)(UserRoutes);
