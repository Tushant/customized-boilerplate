/**
 * Created by Edge on 5/22/2017.
 */
import React from 'react';

const ContentPage = () => (
  <div>
    <h4>Basic Information</h4>
    <div className="mg-top-sm">
      <div className="text-lg">Everest Boutique 8 Inn</div>
      <label>Property Name (English)</label>
    </div>
    <div className="mg-top-sm">
      <div className="text-lg">Everest Boutique 8 Inn</div>
      <label>Property Name (English)</label>
    </div>
    <table className="table">
      <thead>
      <tr>
        <td>
          <label>Hotel Chain</label>
        </td>
        <td>No Chain</td>
      </tr>
      <tr>
        <td>
          <label>Street Adress (Eng)</label>
        </td>
        <td>15-17 Bangkok, Bangkok, Thailand, 10000</td>
      </tr>
      </thead>
    </table>
    <div className="btn-container">
      <button className="btn btn-primary">Edit</button>
    </div>
  </div>
);

export default ContentPage;
