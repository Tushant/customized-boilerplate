import React from "react";
import { Switch } from "react-router-dom";
import AsyncRoute from "routing/AsyncRoute";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { makeSelectLocation } from "containers/App/selectors";
import loadParentPage from "../containers/ParentPage/loader";
import loadMyHotelsPage from "../containers/MyHotels/loader";
import loadMyAgentsPage from "../containers/MyAgents/loader";
import loadMyAgentDetailPage from "../containers/MyAgents/MyAgentDetail/loader";
import loadSettingsPage from "../containers/Settings/loader";
import loadNotFoundPage from "containers/NotFoundPage/loader";

function AgentRoutes({ location, cloudinary }) {
  return (
        <Switch location={location}>
          <AsyncRoute
            exact
            path="/agent/dashboard/home"
            load={loadParentPage}
          />
          <AsyncRoute
            exact
            path="/agent/dashboard/my-hotels"
            load={loadMyHotelsPage}
          />
          <AsyncRoute
            exact
            path="/agent/dashboard/my-agents"
            load={loadMyAgentsPage}
          />
          <AsyncRoute
            exact
            path="/agent/dashboard/my-agent/:id"
            load={loadMyAgentDetailPage}
          />
          <AsyncRoute
            exact
            path="/agent/dashboard/settings"
            load={loadSettingsPage}
          />
          <AsyncRoute exact path="*" load={loadNotFoundPage} />
        </Switch>
  );
}

AgentRoutes.propTypes = {
  location: React.PropTypes.object
};

const mapStateToProps = createStructuredSelector({
  location: makeSelectLocation()
});

export default connect(mapStateToProps)(AgentRoutes);
