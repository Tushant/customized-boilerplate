/**
 * Created by Edge on 5/22/2017.
 */
import React from 'react';

const BookingsPage = () => (
  <div className="container">
    <h1>Bookings</h1>
    <div className="row">
      <div className="col-lg-4">
        <div className="card">
          <ul className="noStyle list-bordered">
            <li className="checkbox">
              <label><input type="checkbox" checked="checked"/>Stay Date</label>
            </li>
            <li className="checkbox">
              <label><input type="checkbox"/>Bookings Date</label>
            </li>
            <li className="checkbox">
              <label><input type="checkbox"/>Last Updated Date</label>
            </li>
          </ul>
          <div className="form-group">
            <label>From</label>
            <input type="text" className="form-control" name="daterange" />
          </div>
          <div className="form-group">
            <label>To</label>
            <input type="text" className="form-control" name="daterange" />
          </div>
        </div>
        <div className="btn-group" role="group">
          <button type="button" className="btn btn-default active">All</button>
          <button type="button" className="btn btn-default">Confirmed</button>
          <button type="button" className="btn btn-default">Amended</button>
          <button type="button" className="btn btn-default">Cancelled</button>
        </div>
      </div>
      <div className="col-lg-4">
        <form>
          <div className="form-group">
            <label>Booking ID</label>
            <input type="text" className="form-control"/>
          </div>
          <div className="form-group">
            <label>Guest Name</label>
            <input type="text" className="form-control"/>
          </div>
          <div className="form-group">
            <label>Acknowledgement ID</label>
            <input type="text" className="form-control"/>
          </div>
        </form>
      </div>
      <div className="col-lg-4">
        <select className="form-control form-group"><option>All Channels</option></select>
        <select className="form-control form-group"><option>All Rate Plans</option></select>
        <select className="form-control form-group"><option>All Room Types</option></select>
        <select className="form-control form-group"><option>All Payment Methods</option></select>
      </div>
    </div>
    <div className="btn-container">
      <button className="btn btn-primary btn-lg">Search</button>
    </div>
    <div className="clearfix">
      <div className="pull-left">
        <label><span className="label label-success"/>Confirmed</label>
        <label><span className="label label-warning"/>Amended</label>
        <label><span className="label label-danger"/>Cancelled</label>
      </div>
      <div className="btn-group pull-right" role="group">
        <button type="button" className="btn btn-default active">All (51)</button>
        <button type="button" className="btn btn-default">Acknowledged (43)</button>
        <button type="button" className="btn btn-default">Unacknowledged (18)</button>
      </div>
    </div>
  </div>
);

export default BookingsPage;
