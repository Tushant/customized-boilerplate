import React from "react";

const SearchDestination = () => {
  return (
    <div className="mainForm">
      <div className="container">
        <form className="inline-form search-form">
          <div className="row search-box">
            <div className="col-md-3 no-pad-field">
            <label>Where</label>
              <input
                type="text"
                className="form-control-form search-field"
                placeholder="Destinations, City, Address"
                name="destination"
              />
            </div>
            <div className="col-md-3">
            <label>When</label>
              <input
                type="text"
                className="form-control-form search-field"
                placeholder="date"
              />
            </div>
            <div className="col-md-3 no-pad-field">
            <label>Guests</label>
              <input
                type="text"
                className="form-control-form search-field"
                placeholder="2 Guests"
                name="guest"
              />
            </div>
            <div className="col-md-3">
              <button className="btn btn-default btn-default1">Search</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchDestination;
