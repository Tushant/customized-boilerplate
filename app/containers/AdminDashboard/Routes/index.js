import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import AdminLayout from "../containers/AdminLayout";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { makeSelectLocation } from "containers/App/selectors";
import loadCommissionPage from "../containers/Commission/loader";
import loadEmailServicePage from "../containers/EmailService/loader";
import loadCloudinaryPage from "../containers/Cloudinary/loader";
import loadAnalyticsPage from "../containers/Analytics/loader";
import loadLogsPage from "../containers/Logs/loader";
import loadUsersPage from "../containers/Users/Loadable";
import loadUserDetailPage from "../containers/Users/UserDetail/loader";
import loadAgentsPage from "../containers/Agents/loader";
import loadAgentsDetailPage from "../containers/Agents/AgentsDetail/loader";
import loadRolesPage from "../containers/Roles/loader";
import loadFeaturePage from "../containers/Feature/loader";
import loadParentPage from "../containers/ParentPage/Loadable";
import loadNotFoundPage from "../containers/NotFoundPage/loader";
import LinkExpired from "containers/LinkExpiredPage";

function AdminRoutes({ location, cloudinary }) {
  return (
    <Switch location={location}>
      <Route
        exact
        path="/admin/dashboard"
        render={() => <AdminLayout><loadParentPage /></AdminLayout>}
      />
      <Route
        exact
        path="/admin/dashboard/users"
        render={() => <AdminLayout><loadUserPage /></AdminLayout>}
      />
    </Switch>
  );
}

const mapStateToProps = createStructuredSelector({
  location: makeSelectLocation()
});

export default connect(mapStateToProps)(AdminRoutes);
