import React from "react";
import Switch from "react-router-dom/Switch";
import Route from "react-router-dom/Route";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { makeSelectLocation } from "containers/App/selectors";
import loadParentPage from "../containers/ParentPage/Loadable";
import loadMyHotelsPage from "../containers/MyHotels/Loadable";
import loadMyAgentsPage from "../containers/MyAgents/Loadable";
import loadMyAgentDetailPage from "../containers/MyAgents/MyAgentDetail/Loadable";
import loadSettingsPage from "../containers/Settings/Loadable";
import loadNotFoundPage from "containers/NotFoundPage/Loadable";

function AgentRoutes({ location }) {
  return (
    <Switch location={location}>
      <Route exact path="/agent/dashboard" component={loadParentPage} />
      <Route
        exact
        path="/agent/dashboard/my-hotels"
        component={loadMyHotelsPage}
      />
      <Route
        exact
        path="/agent/dashboard/my-agents"
        component={loadMyAgentsPage}
      />
      <Route
        exact
        path="/agent/dashboard/my-agent/:id"
        component={loadMyAgentDetailPage}
      />
      <Route
        exact
        path="/agent/dashboard/settings"
        component={loadSettingsPage}
      />
      <Route exact path="*" component={loadNotFoundPage} />
    </Switch>
  );
}

const mapStateToProps = createStructuredSelector({
  location: makeSelectLocation()
});

export default connect(mapStateToProps)(AgentRoutes);
