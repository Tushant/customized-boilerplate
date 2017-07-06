import React from "react";
import { FormattedMessage } from "react-intl";

import LocaleToggle from "containers/LocaleToggle";
import messages from "./messages";

import playstore from "assets/img/gplay.svg";
import appstore from "assets/img/appleStore.svg";
import facebook from "assets/img/fb.svg";
import twitter from "assets/img/tw.svg";
import instagram from "assets/img/in.svg";
import linkedIn from "assets/img/li.svg";

function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <ul className="col-md-2">
            <li><b>Help</b></li>
            <li><a href="#">Contact us</a></li>
            <li><a href="#">FAQs</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of use</a></li>
          </ul>
          <ul className="col-md-2">
            <li><b>Partner with us</b></li>
            <li><a href="#">Properties</a></li>
            <li><a href="#">Affiliates</a></li>
          </ul>
          <ul className="col-md-2">
            <li><b>About us</b></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Media</a></li>
          </ul>
          <ul className="col-md-2">
            <li><b>Destinations</b></li>
            <li><a href="#">Countries</a></li>
            <li><a href="#">Cities</a></li>
          </ul>
          <div className="col-md-4">
            <a href="#" className="pull-left mg-r-10">
              <img alt="Get it on Google Play" src={playstore} />
            </a>
            <a href="#">
              <img alt="Download on app store" alt="" src={appstore} />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container clearfix">
          <ul className="pull-left social">
            <li>
              <a href="#"><img src={facebook} /></a>
            </li>
            <li>
              <a href="#"><img src={twitter} /></a>
            </li>
            <li>
              <a href="#"><img src={instagram} /></a>
            </li>
            <li>
              <a href="#"><img src={linkedIn} /></a>
            </li>
          </ul>
          <div className="pull-right align-right copyright">
            Copyright © 2017 Xceltrip Inc.
            <br /> 1580 Oakland Rd, Ste C212, San Jose, CA, 95131
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
