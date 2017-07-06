import React from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { makeSelectLocation } from "containers/App/selectors";
import loadParentPage from "../containers/ParentPage/Loadable";
import loadListHotelPage from "../containers/ListHotel/Loadable";
import loadNotFoundPage from "containers/NotFoundPage/Loadable";

function HotelRoutes({ location, cloudinary }) {
  return (
    <Switch location={location}>
      <Route exact path="/hotel/dashboard/home" load={loadParentPage} />
      <Route
        exact
        path="/hotel/dashboard/list/hotel"
        load={loadListHotelPage}
      />
      <Route exact path="*" load={loadNotFoundPage} />
    </Switch>
  );
}

const mapStateToProps = createStructuredSelector({
  location: makeSelectLocation()
});

export default connect(mapStateToProps)(HotelRoutes);
