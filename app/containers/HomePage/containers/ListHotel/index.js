import React from "react";
import L from "leaflet";
import logo from "assets/img/marker.png";

const MarkerIcon = L.icon({
  iconUrl: `${logo}`,
  iconRetinaUrl: `${logo}`,
  iconSize: [50, 50],
  iconAnchor: [50, 50],
  popupAnchor: [-3, -20]
});

class ListHotel extends React.Component {
  constructor() {
    super();
    this.state = {
      hotel_info: {
        location: {
          lat: 27,
          lng: 85
        }
      }
    };
  }
  componentDidMount() {
    this.map = L.map(this.element).setView(
      [this.state.hotel_info.location.lat, this.state.hotel_info.location.lng],
      10
    );
    // Google Map
    L.tileLayer("http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
      maxZoom: 20,
      subdomains: ["mt0", "mt1", "mt2", "mt3"]
    }).addTo(this.map);
    this.marker = L.marker(
      [this.state.hotel_info.location.lat, this.state.hotel_info.location.lng],
      {
        icon: MarkerIcon,
        draggable: true
      }
    );
    this.marker.addTo(this.map);
    this.map.on("click", e =>
      this.setState({
        hotel_info: {
          ...this.state.hotel_info,
          location: e.latlng
        }
      })
    );
    this.marker.on("dragend", e =>
      this.setState({
        hotel_info: {
          ...this.state.hotel_info,
          location: e.target.getLatLng()
        }
      })
    );
  }

  render() {
    console.log("this", this.state.hotel_info);
    return (
      <div className="container">
        <div className="card card-lg">
          <h1>Via Anonymous User</h1>
          <form>
            <fieldset>
              <legend>Property Info</legend>
              <div className="form-group">
                <label>Property Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="property_name"
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={this.handleChange}
                />
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
                <input
                  type="text"
                  className="form-control"
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label>Location</label>
                <div
                  ref={element => {
                    this.element = element;
                  }}
                  style={{ width: "400 px", height: "400px" }}
                />
              </div>
              <div className="form-group">
                <label>Hotel Phone No.</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={this.handleChange}
                />
                <p className="note">
                  We will call at the given number to verify.
                </p>
              </div>
              <div className="form-group">
                <label className="custom-control custom-checkbox">
                  <input
                    className="custom-control-input"
                    type="checkbox"
                    onChange={this.handleChange}
                  />
                  <span className="custom-control-indicator" />
                  <span className="custom-control-description">
                    Internet Availaibility
                  </span>
                </label>
              </div>
              <div className="form-group">
                <label className="custom-control custom-checkbox">
                  <input
                    className="custom-control-input"
                    type="checkbox"
                    onChange={this.handleChange}
                  />
                  <span className="custom-control-indicator" />
                  <span className="custom-control-description">
                    Parking
                  </span>
                </label>
              </div>
              <div className="form-group">
                <label className="custom-control custom-checkbox">
                  <input
                    className="custom-control-input"
                    type="checkbox"
                    onChange={this.handleChange}
                  />
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
                <input
                  type="text"
                  className="form-control"
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={this.handleChange}
                />
              </div>

              <div className="form-group">
                <label>Role in Property</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label>Mobile No. with country code</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label className="custom-control custom-checkbox">
                  <input
                    className="custom-control-input"
                    type="checkbox"
                    onChange={this.handleChange}
                  />
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
    );
  }
}

export default ListHotel;
