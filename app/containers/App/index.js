import React from "react";
import Helmet from "react-helmet/lib/Helmet";
import Switch from "react-router-dom/Switch";
import Route from "react-router-dom/Route";
import HomePage from "containers/HomePage/Loadable";
import TermsAndConditions from "components/TermsAndConditions";
import ListHotel from "containers/HomePage/containers/ListHotel/Loadable";
import NotFoundPage from "containers/NotFoundPage/Loadable";
import HomeLayout from "containers/HomePage/containers/HomeLayout";
import BlankLayout from "containers/HomePage/containers/BlankLayout";
import AdminDashboardLayout from "containers/AdminDashboard/containers/AdminLayout";
import AdminDashboard from "containers/AdminDashboard/Loadable";
import AgentDashboardLayout from "containers/AgentDashboard/containers/AgentLayout";
import AgentDashboard from "containers/AgentDashboard/Loadable";
import UserDashboardLayout from "containers/UserDashboard/containers/UserLayout";
import UserDashboard from "containers/UserDashboard/Loadable";
import HotelDashboardLayout from "containers/HotelDashboard/containers/HotelLayout";
import HotelDashboard from "containers/HotelDashboard/Loadable";

export class App extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    setTimeout(
      console.log.bind(
        console,
        "%cXcelTrip",
        "font: 8em sans-serif; color: red;"
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
          <Route
            path="/list/hotel"
            render={() => <HomeLayout><ListHotel /></HomeLayout>}
          />
          <Route
            path="/admin/dashboard"
            render={() =>
              <AdminDashboardLayout><AdminDashboard /></AdminDashboardLayout>}
          />
          <Route
            path="/agent/dashboard"
            render={() =>
              <AgentDashboardLayout><AgentDashboard /></AgentDashboardLayout>}
          />
          <Route
            path="/user/dashboard"
            render={() =>
              <UserDashboardLayout><UserDashboard /></UserDashboardLayout>}
          />
          <Route
            path="/hotel/dashboard"
            render={() =>
              <HotelDashboardLayout><HotelDashboard /></HotelDashboardLayout>}
          />
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
