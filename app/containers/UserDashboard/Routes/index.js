import React from "react";
import { Switch } from "react-router-dom";
import AsyncRoute from "routing/AsyncRoute";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { makeSelectLocation } from "containers/App/selectors";
import loadApplyForAgentPage from "../containers/Agent/loader";
import loadParentPage from "../containers/ParentPage/loader";
import loadNotFoundPage from "containers/NotFoundPage/loader";

function UserRoutes({ location }) {
  return (
 
        <Switch location={location}>
          <AsyncRoute exact path="/user/dashboard/home" load={loadParentPage} />
          <AsyncRoute
            exact
            path="/user/dashboard/apply_for_agent"
            load={loadApplyForAgentPage}
          />
          <AsyncRoute exact path="/user/dashboard/*" load={loadNotFoundPage} />
        </Switch>
  );
}

UserRoutes.propTypes = {
  location: React.PropTypes.object
};

const mapStateToProps = createStructuredSelector({
  location: makeSelectLocation()
});

export default connect(mapStateToProps)(UserRoutes);
