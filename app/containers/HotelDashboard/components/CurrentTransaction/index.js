/**
 * Created by Edge on 5/22/2017.
 */
import React from 'react';

const CurrentTransactionPage = () => (
  <div className="container">
    <h1>Current Transactions</h1>
    <table className="table">
      <thead>
      <tr>
        <th>Booking ID</th>
        <th>Guest Name</th>
        <th>Check-in Date</th>
        <th>Check-out Date</th>
        <th>No. of Rooms</th>
        <th>No. of Nights</th>
        <th>Booking Value</th>
        <th>Booking Status</th>
        <th>Approved</th>
        <th>Dispute</th>
        <th/>
      </tr>
      <div>
        <ul>
          <li>
            <label>Booking Date <span className="bold">8 Apr 2017</span></label>
          </li>
          <li>
            <label>Currency <span className="bold">THB</span></label>
          </li>
          <li>
            <label>Booking Paid By <span className="bold">THB</span></label>
          </li>
          <li>
            <label>Details <span> </span></label>
          </li>
        </ul>
      </div>
      </thead>
      <tbody>
      <tr>
        <th scope="row">4567843</th>
        <td>Kwok Wah Wong</td>
        <td>9 April 2017</td>
        <td>10 April 2017</td>
        <td>2</td>
        <td>2</td>
        <td>890.60</td>
        <td>Departed</td>
        <td>
          <input type="checkbox" />
        </td>
        <td>
          <input type="checkbox" />
        </td>
        <td>i</td>
      </tr>
      </tbody>
    </table>
    <div className="row">
      <div className="col-lg-3">
        <span className="text-lg">2</span>
        <label>Approved Transactions</label>:
      </div>
      <div className="col-lg-3">
        <span className="text-lg"><span className="currency">THB</span> 2,448.72</span>
        <label>Approved Amount</label>:
      </div>
      <div className="col-lg-6 align-right">
        <button className="btn btn-primary">Select All Approved</button>
        <button className="btn btn-primary">Unselect All Approved</button>
      </div>
    </div>
    <table className="table">
      <thead>
      <tr>
        <th scope="row">Creation Date</th>
        <th>Reference No.</th>
        <th>Currency</th>
        <th>Amount</th>
      </tr>
      <tr>
        <td colSpan="4">No Pending Transactions</td>
      </tr>
      </thead>
    </table>
    <button className="btn btn-primary">Next</button>
  </div>
);

export default CurrentTransactionPage;
