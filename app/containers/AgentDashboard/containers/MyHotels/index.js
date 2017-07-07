import React from "react";

class MyHotels extends React.PureComponent {
  render() {
    return (
      <div className="container">
        <div className="block bg-dark-blue clearfix addHotel">
          <div className="col-sm-6">
            <h2 className="thin">
              List Property<br />Grow your business 24hrs.
            </h2>
            <button className="btn btn-outline bg-purple bold">
              Add Property
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <div className="card">
              <h1>Via Anonymous User</h1>
              <form>
                <fieldset>
                  <legend>Property Info</legend>
                  <div className="form-group">
                    <label>Property Name</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="form-group">
                    <label>Type of Property</label>
                    <select className="form-control">
                      <option>Hotel</option>
                      <option>Motel</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>No. of Rooms</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="form-group">
                    <label>Location</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="form-group">
                    <label>Hotel Phone No.</label>
                    <input type="text" className="form-control" />
                    <p className="note">
                      We will call at the given number to verify.
                    </p>
                  </div>

                  <div className="form-group">
                    <label className="custom-control custom-checkbox">
                      <input className="custom-control-input" type="checkbox" />
                      <span className="custom-control-indicator" />
                      <span className="custom-control-description">
                        Internet Availaibility
                      </span>
                    </label>
                  </div>

                  <div className="form-group">
                    <label className="custom-control custom-checkbox">
                      <input className="custom-control-input" type="checkbox" />
                      <span className="custom-control-indicator" />
                      <span className="custom-control-description">
                        Parking
                      </span>
                    </label>
                  </div>

                  <div className="form-group">
                    <label className="custom-control custom-checkbox">
                      <input className="custom-control-input" type="checkbox" />
                      <span className="custom-control-indicator" />
                      <span className="custom-control-description">
                        I agree terms and conditions. <a href="#">Read Terms</a>
                      </span>
                    </label>
                  </div>
                </fieldset>

                <fieldset>
                  <legend>User Info</legend>
                  <div className="form-group">
                    <label>First Name</label>
                    <input type="text" className="form-control" />
                  </div>

                  <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" className="form-control" />
                  </div>

                  <div className="form-group">
                    <label>Role in Property</label>
                    <input type="text" className="form-control" />
                  </div>

                  <div className="form-group">
                    <label>Mobile No. with country code</label>
                    <input type="text" className="form-control" />
                  </div>

                  <div className="form-group">
                    <label>Email</label>
                    <input type="text" className="form-control" />
                  </div>

                  <div className="form-group">
                    <label>Password</label>
                    <input type="text" className="form-control" />
                  </div>

                  <div className="form-group">
                    <label className="custom-control custom-checkbox">
                      <input className="custom-control-input" type="checkbox" />
                      <span className="custom-control-indicator" />
                      <span className="custom-control-description">
                        Subscribe Email
                      </span>
                    </label>
                  </div>
                  <button className="btn btn-default btn-block btn-lg">
                    Submit Details
                  </button>

                </fieldset>
              </form>
            </div>
          </div>

          <div className="col-sm-6">
            <div className="card">

              <h1>Via Agent</h1>
              <form>
                <fieldset>
                  <legend>Property Info</legend>
                  <div className="form-group">
                    <label>Property Name</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="form-group">
                    <label>Type of Property</label>
                    <select className="form-control">
                      <option>Hotel</option>
                      <option>Motel</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>No. of Rooms</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="form-group">
                    <label>Location</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="form-group">
                    <label>Hotel Phone No.</label>
                    <input type="text" className="form-control" />
                    <p className="note">
                      We will call at the given number to verify.
                    </p>
                  </div>

                  <div className="form-group">
                    <label className="custom-control custom-checkbox">
                      <input className="custom-control-input" type="checkbox" />
                      <span className="custom-control-indicator" />
                      <span className="custom-control-description">
                        Internet Availaibility
                      </span>
                    </label>
                  </div>

                  <div className="form-group">
                    <label className="custom-control custom-checkbox">
                      <input className="custom-control-input" type="checkbox" />
                      <span className="custom-control-indicator" />
                      <span className="custom-control-description">
                        Parking
                      </span>
                    </label>
                  </div>
                </fieldset>
                <button className="btn btn-default btn-block btn-lg">
                  Submit Details
                </button>
              </form>

            </div>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table clickable withSN">
            <thead>
              <tr>
                <th>S.N.</th>
                <th>Hotel Name</th>
                <th>Contact Person</th>
                <th>Phone No.</th>
                <th>Email</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              <tr>
                <td><span>1</span></td>
                <td><b>Hotel Shankar</b></td>
                <td>Sajan Musalman</td>
                <td>9841223344</td>
                <td>sajan@shankar.com</td>
                <td>Active</td>
                <td><button className="btn btn-link">more</button></td>
              </tr>

              <tr>
                <td><span>2</span></td>
                <td><b>Hotel Shankar</b></td>
                <td>Sajan Musalman</td>
                <td>9841223344</td>
                <td>sajan@shankar.com</td>
                <td>Active</td>
                <td><button className="btn btn-link">more</button></td>
              </tr>

              <tr>
                <td><span>3</span></td>
                <td><b>Hotel Shankar</b></td>
                <td>Sajan Musalman</td>
                <td>9841223344</td>
                <td>sajan@shankar.com</td>
                <td>Active</td>
                <td><button className="btn btn-link">more</button></td>
              </tr>

              <tr>
                <td><span>4</span></td>
                <td><b>Hotel Shankar</b></td>
                <td>Sajan Musalman</td>
                <td>9841223344</td>
                <td>sajan@shankar.com</td>
                <td>Active</td>
                <td><button className="btn btn-link">more</button></td>
              </tr>

              <tr>
                <td><span>5</span></td>
                <td><b>Hotel Shankar</b></td>
                <td>Sajan Musalman</td>
                <td>9841223344</td>
                <td>sajan@shankar.com</td>
                <td>Active</td>
                <td><button className="btn btn-link">more</button></td>
              </tr>

              <tr>
                <td><span>6</span></td>
                <td><b>Hotel Shankar</b></td>
                <td>Sajan Musalman</td>
                <td>9841223344</td>
                <td>sajan@shankar.com</td>
                <td>Active</td>
                <td><button className="btn btn-link">more</button></td>
              </tr>

              <tr>
                <td><span>7</span></td>
                <td><b>Hotel Shankar</b></td>
                <td>Sajan Musalman</td>
                <td>9841223344</td>
                <td>sajan@shankar.com</td>
                <td>Active</td>
                <td><button className="btn btn-link">more</button></td>
              </tr>

              <tr>
                <td><span>8</span></td>
                <td><b>Hotel Shankar</b></td>
                <td>Sajan Musalman</td>
                <td>9841223344</td>
                <td>sajan@shankar.com</td>
                <td>Active</td>
                <td><button className="btn btn-link">more</button></td>
              </tr>

              <tr>
                <td><span>9</span></td>
                <td><b>Hotel Shankar</b></td>
                <td>Sajan Musalman</td>
                <td>9841223344</td>
                <td>sajan@shankar.com</td>
                <td>Active</td>
                <td><button className="btn btn-link">more</button></td>
              </tr>

              <tr>
                <td><span>10</span></td>
                <td><b>Hotel Shankar</b></td>
                <td>Sajan Musalman</td>
                <td>9841223344</td>
                <td>sajan@shankar.com</td>
                <td>Active</td>
                <td><button className="btn btn-link">more</button></td>
              </tr>

            </tbody>

          </table>

        </div>

      </div>
    );
  }
}

export default MyHotels;
