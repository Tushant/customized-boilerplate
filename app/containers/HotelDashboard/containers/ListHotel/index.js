import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

class ListHotel extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }

  componentDidMount() {
    console.log("user");
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          List Hotel
        </div>
      </div>
    );
  }
}

export default connect(null, null)(ListHotel);
