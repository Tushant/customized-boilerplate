import React from "react";
import { Link } from "react-router-dom";
import beAgentimg from "../../../../../app/assets/img/be_agent_bg.png";

const ParentPage = () =>
  <div className="container">
    <h1>Dashboard</h1>
    <div className="row">
      <div className="col-lg-4">
        <div className="card">
          <h2 className="condensed">Complete Profile</h2>
          <ul>
            <li>
              <a href="#">
                <span className="icon icon-add" />
                <b>Add a Photo</b>
              </a>
              <p className="faded">
                This is the first thing people see, so show them your best side!
              </p>
            </li>
            <li>
              <a href="#">
                <span className="icon icon-add" />
                <b>
                  Add Credit Card Details
                </b>
              </a>
              <p className="faded">
                Book faster when you store your payment details. We'll autofill
                them for next time (your details are always safe!).
              </p>
            </li>
            <li>
              <a href="#">
                <span className="icon icon-add" />
                <b>Add a Display Name</b>
              </a>
              <p className="faded">
                This can be updated as often as you want and is shown with your
                reviews.
              </p>
            </li>
          </ul>
        </div>
      </div>
      <div className="col-lg-4">
        <div className="card">
          <h2 className="condensed">
            Where to go?
          </h2>
          <form>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                name=""
                placeholder="Destination or Address"
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                name=""
                placeholder="Check-In"
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                name=""
                placeholder="Check-Out"
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                name=""
                placeholder="Rooms, Adults &amp; Children"
              />
            </div>
            <button className="btn btn-primary btn-block btn-lg">Search</button>
          </form>
        </div>
      </div>
      <div className="col-lg-4">
        <div className="middleCenter">
          <span>Best Time to be</span>
          <h2 className="condensed">Xceltrip Agent</h2>
          <Link
            to="/user/dashboard/apply_for_agent"
            className="btn btn-default"
          >
            Apply Now
          </Link>
        </div>
        <img src={beAgentimg} />
      </div>
    </div>{" "}
  </div>;

export default ParentPage;
