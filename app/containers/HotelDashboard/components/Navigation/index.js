/**
 * Created by Edge on 5/28/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';
import classNames from 'classnames';
import Logo from '../../../../../assets/img/logo.svg';

const Navigation = ({ logout, Link }) => {
  const logoutFn = (e) => {
    e.preventDefault();
    logout();
  };
  return (
    <nav className={classNames(styles.navigation, "navbar", "navbar-default", "navbar-fixed-top")}>
      <div className="container">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" href="#"><img src={Logo} alt="logo"/></a>
        </div>
        <div id="navbar" className="navbar-collapse collapse">
          <ul className="nav navbar-nav">
            <li className="dropdown">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Manage </a>
              <ul className="dropdown-menu">
                <li><a href="Calendar.html">Calendar</a></li>
                <li><a href="Promotions.html">Promotions</a></li>
                <li><a href="surcharge.html">Surcharge</a></li>
                <li><a href="reviews.html">Reviews</a></li>
              </ul>
            </li>
            <li className="dropdown">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Reports</a>
              <ul className="dropdown-menu">
                <li><Link to="/bookings">Bookings</Link></li>
                <li><a href="sys_logs.html">System Logs</a></li>
              </ul>
            </li>
            <li className="dropdown">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Settings </a>
              <ul className="dropdown-menu">
                <li><a href="room.html">Room Setup</a></li>
                <li><a href="ratePlan.html">Rate Plan Setup</a></li>
                <li><a href="Cancelllation.html">Cancelllation Policy Setup</a></li>
                <li><Link to="/content">Content</Link></li>
                <li><a href="rank.html">Rankings</a></li>
                <li><a href="pro_settings.html">Property Settings</a></li>
                <li><a href="tax_settings.html">Tax Settings</a></li>
                <li><a href="contacts.html">Contacts</a></li>
                <li><a href="Competitor.html">Competitor Set</a></li>
              </ul>
            </li>
            <li className="dropdown">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">ePass </a>
              <ul className="dropdown-menu">
                <li><a href="ag_trans.html">Advance Guarentee Transactions</a></li>
                <li><a href="all_trans.html">All Transactions</a></li>
                <li><a href="current_trans.html">Current Transactions</a></li>
                <li><a href="Remittances.html">Remittances</a></li>
              </ul>
            </li>
            <li className="dropdown">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Help </a>
              <ul className="dropdown-menu">
                <li><a href="Tutorial.html">Tutorial</a></li>
                <li><a href="contact_us.html">Contact Us</a></li>
                <li><a href="review_response.html">Review Response Guidelines</a></li>
                <li><a href="conditions.html">Terms &amp; Conditions</a></li>
              </ul>
            </li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li className="dropdown">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Everest Boutique 8 Inn <span className="caret"></span>
              </a>
              <ul className="dropdown-menu">
                <li><a href="#">See the property on xceltrip.com</a></li>
                <li><a href="#">Create new property</a></li>
                <li><a href="#" onClick={logoutFn}>Logout</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

Navigation.propTypes = {
  logout: PropTypes.func.isRequired
};

export default Navigation;

