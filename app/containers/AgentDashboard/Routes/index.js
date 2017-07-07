import React from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { makeSelectLocation } from "containers/App/selectors";
import loadParentPage from "../containers/ParentPage/Loadable";
import loadMyHotelsPage from "../containers/MyHotels/Loadable";
import loadMyAgentsPage from "../containers/MyAgents/Loadable";
import loadMyAgentDetailPage
  from "../containers/MyAgents/MyAgentDetail/Loadable";
import loadSettingsPage from "../containers/Settings/Loadable";
import loadNotFoundPage from "containers/NotFoundPage/Loadable";

function AgentRoutes({ location }) {
  return (
    <Switch location={location}>
      <Route exact path="/agent/dashboard" load={loadParentPage} />
      <Route exact path="/agent/dashboard/my-hotels" load={loadMyHotelsPage} />
      <Route exact path="/agent/dashboard/my-agents" load={loadMyAgentsPage} />
      <Route
        exact
        path="/agent/dashboard/my-agent/:id"
        load={loadMyAgentDetailPage}
      />
      <Route exact path="/agent/dashboard/settings" load={loadSettingsPage} />
      <Route exact path="*" load={loadNotFoundPage} />
    </Switch>
  );
}

const mapStateToProps = createStructuredSelector({
  location: makeSelectLocation()
});

export default connect(mapStateToProps)(AgentRoutes);
