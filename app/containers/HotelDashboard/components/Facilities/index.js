/**
 * Created by Edge on 5/22/2017.
 */
import React from 'react';

const FacilitiesPage = () => (
  <div>
    <div className="row colDevider">
      <div className="col-lg-3">
        <h4>Facilities</h4>
        <ul className="noStyle text-success">
          <li>100% non smoking</li>
          <li>24 hour service</li>
          <li className="text-danger">Anytime checkout</li>
          <li className="text-danger">Health service</li>
          <li className="text-danger">24 hour check in</li>
        </ul>
        <div className="text-lg text-right">2/5</div>
      </div>
      <div className="col-lg-3">
        <h4>Language Spoken</h4>
        <ul className="noStyle text-success">
          <li>Chineese</li>
          <li>English</li>
          <li>Spanish</li>
          <li>Nepali</li>
          <li>Hindi</li>
          <li>French</li>
          <li className="text-danger">German</li>
        </ul>
        <div className="text-lg text-right">6/7</div>
      </div>
      <div className="col-lg-3">
        <h4>Payment Cards</h4>
        <ul className="noStyle text-success">
          <li>Visa</li>
          <li>Master Card</li>
          <li className="text-danger">Discover</li>
          <li className="text-danger">American Express</li>
        </ul>
        <div className="text-lg  text-right">2/4</div>
      </div>
      <div className="col-lg-3">
        <h4>Sports and Recreation</h4>
        <ul className="noStyle text-success">
          <li>Indoor Swimming Pool</li>
          <li className="text-danger">BasketBall</li>
        </ul>
        <div className="text-lg text-right">1/2</div>
      </div>
    </div>
  </div>
);

export default FacilitiesPage;
