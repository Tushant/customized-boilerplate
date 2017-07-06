import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import AdminLayout from "../containers/AdminLayout";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { makeSelectLocation } from "containers/App/selectors";
import loadParentPage from "../containers/ParentPage/Loadable";
import loadUsersPage from "../containers/Users/Loadable";
import loadUserDetailPage from "../containers/Users/UserDetail/Loadable";
import loadAgentsPage from "../containers/Agents/Loadable";
import loadCommissionPage from "../containers/Commission/Loadable";
import loadCloudinaryPage from "../containers/Cloudinary/Loadable";
import loadEmailServicePage from "../containers/EmailService/Loadable";
import loadAnalyticsPage from "../containers/Analytics/Loadable";
import loadLogsPage from "../containers/Logs/Loadable";
import loadAgentDetailPage from "../containers/Agents/AgentsDetail/Loadable";
import loadRolesPage from "../containers/Roles/Loadable";
import loadFeaturePage from "../containers/Feature/Loadable";
import loadNotFoundPage from "../containers/NotFoundPage/Loadable";
import LinkExpired from "containers/LinkExpiredPage";

function AdminRoutes({ location }) {
  return (
    <Switch location={location}>
      <Route exact path="/admin/dashboard" component={loadParentPage} />
      <Route exact path="/admin/dashboard/users" component={loadUsersPage} />
      <Route
        exact
        path="/admin/dashboard/user/:id"
        component={loadUserDetailPage}
      />
      <Route exact path="/admin/dashboard/agents" component={loadAgentsPage} />
      <Route
        exact
        path="/admin/dashboard/agent/:id"
        component={loadAgentDetailPage}
      />
      <Route
        exact
        path="/admin/dashboard/commission"
        component={loadCommissionPage}
      />
      <Route
        exact
        path="/admin/dashboard/email/service"
        component={loadEmailServicePage}
      />
      <Route
        exact
        path="/admin/dashboard/cloudinary"
        component={loadCloudinaryPage}
      />
      <Route
        exact
        path="/admin/dashboard/analytics"
        component={loadAnalyticsPage}
      />
      <Route exact path="/admin/dashboard/roles" component={loadRolesPage} />
      <Route exact path="/admin/dashboard/logs" component={loadLogsPage} />
      <Route
        exact
        path="/admin/dashboard/features"
        component={loadFeaturePage}
      />
      <Route component={loadNotFoundPage} />
    </Switch>
  );
}

const mapStateToProps = createStructuredSelector({
  location: makeSelectLocation()
});

export default connect(mapStateToProps)(AdminRoutes);
