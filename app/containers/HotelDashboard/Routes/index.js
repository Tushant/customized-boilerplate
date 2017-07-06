import React from "react";
import { Switch, Route } from "react-router-dom";
import AsyncRoute from "routing/AsyncRoute";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { makeSelectLocation } from "containers/App/selectors";
import loadParentPage from "../containers/ParentPage/loader";
import loadListHotelPage from "../containers/ListHotel/loader";
import loadNotFoundPage from "containers/NotFoundPage/loader";

function HotelRoutes({ location, cloudinary }) {
  return (
    <Switch location={location}>
      <AsyncRoute exact path="/hotel/dashboard/home" load={loadParentPage} />
      <AsyncRoute
        exact
        path="/hotel/dashboard/list_hotel"
        load={loadListHotelPage}
      />
      <AsyncRoute exact path="*" load={loadNotFoundPage} />
    </Switch>
  );
}

const mapStateToProps = createStructuredSelector({
  location: makeSelectLocation()
});

export default connect(mapStateToProps)(HotelRoutes);
